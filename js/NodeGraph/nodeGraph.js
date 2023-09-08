import { updateHeader } from '../header.js'
import { baseNodes, baseLinks } from './graphDefaults.js'  
import { productionTreeData } from '../Research/researchDefaults.js'
import { 
    getNodeColor, 
    getNeighbors, 
    getLinkColor, 
    getNodeStroke, 
    updateEnableButton,
    getTotalEmissions, 
    writeUser, 
    updateDBNodes, 
    getNodeX, 
    getNodeY,
    getEmissionsMarketData,
    buildMarketTable,
    sendMarketOffer,
    getUser,
    getNodeStrokeColor,
    runAtUTCTimeOfDay,
    getYieldIcon,
} from './nodeUtils.js'

var width = window.innerWidth
var height = window.innerHeight
var radius = 10;

const zoom = d3.zoom();
var svg = d3.select('svg')
        .attr("viewBox", `${-width/2} ${-height*0.6} ${width*2} ${height*2}`)
        .call(zoom.transform, d3.zoomIdentity.scale(1))
        .call(zoom.on('zoom', (event) => {
            svg.attr('transform', event.transform);
        }))
        .append("g")
        .attr('transform', `translate(${-width+550}, ${-height+300})scale(${2.2})`);

var linkElements,
nodeElements,
textElements

// Svg groups logically group the elements together
var linkGroup = svg.append('g').attr('class', 'links')
var nodeGroup = svg.append('g').attr('class', 'nodes')
var textGroup = svg.append('g').attr('class', 'texts')

svg.selectAll(".node")
       .attr("transform", function (d) {
             d.x = Math.max(100, Math.min(width/3 - radius, d.x));
             d.y = Math.max(100, Math.min(height/3 - radius, d.y));
             return `translate(${d.x},${d.y})`;
       }); 

// Simulation set-up
var linkForce = d3
    .forceLink()
    .id(function (link) { return link.id })
    .distance(100)
    .strength(function (link) { return link.strength })

var simulation = d3
    .forceSimulation()
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide(100))

// Track which node is currently selected, and track which panel is open (news/emissions market)
var selected
var news = document.getElementById('news');
var trading = document.getElementById('trading');

async function submitMarketOffer(event) {
    event.preventDefault();
    
    var quantity = document.getElementById("trading-quantity").value;
    var price = document.getElementById("trading-price").value;

    if (!quantity || !price) {
        return;
    }

    await sendMarketOffer(userId, quantity, price);

    // Update the table to show the new offer
    var  emissionsMarketData = await getEmissionsMarketData();
    buildMarketTable(userId, currency, emissionsMarketData.info);

    emissionsCap -= quantity;
    updateHeader(currency, research, currentEmissions, emissionsCap);
}

async function openEmissionsMarket() {
    news.style.display = 'none';
    trading.style.display = 'block';

    trading.focus();

    var emissionsMarketData = await getEmissionsMarketData();
    buildMarketTable(userId, currency, emissionsMarketData.info);
}

function closeEmissionsMarket() {
    trading.style.display = 'none';
}

function openNews() {
    news.style.display = 'block';
    trading.style.display = 'none';

    news.focus();
}

function closeNews() {
    news.style.display = 'none';
}

// selectNode is called on clicking a node
function selectNode(selectedNode) {
    selected = selectedNode; 

    // Modify the styles to highlight selected nodes
    nodeElements.transition().duration(75).attr('stroke-width', function (node) { return getNodeStroke(node, selectedNode) })

    // Open node info panel
    openNodeInfo(selectedNode);
    document.getElementById('node-info').focus();
}

function closeNode() {
    var nodeInfo = document.getElementById("node-info");

    nodeInfo.style.display = "none";

    selected = null;
    nodeElements.transition().duration(75).attr('stroke-width', function (node) { return getNodeStroke(node, null) })
}

// Opens the node info panel
function openNodeInfo(selectedNode) {
    var nodeInfo = document.getElementById('node-info');
    nodeInfo.style.display = "block";

    var nodeTitle = document.getElementById('node-title');
    nodeTitle.innerHTML = `${selectedNode.label}`

    var nodeDetails = document.getElementById('node-details');
    nodeDetails.innerHTML = `${selectedNode.description}`

    var nodeYield = document.getElementById('node-yield');
    nodeYield.innerHTML = `Yield: ${getYieldIcon(selectedNode.type)} ${selectedNode.yield}`;

    var nodeEmissions = document.getElementById('node-emissions');
    nodeEmissions.innerHTML = `Emits: <img id="emissions-icon-small" src="/icons/smog-solid.svg"></img> ${selectedNode.emissions}`;

    var nodeUnlock = document.getElementById('node-unlock');
    var nodeEnable = document.getElementById('node-enable');
    var neighbors = getNeighbors(selectedNode)

    var neighborIsUnlocked = false 
    neighbors.forEach((neighbor) => {
        if (!nodes.find((node) => node.id === neighbor).locked) {
        neighborIsUnlocked = true
        }
    })

    // Node can be purchased
    if (selectedNode.locked && neighborIsUnlocked) {
        nodeUnlock.style.display = "flex";
        
        let nodeCost = document.getElementById('node-cost')
        if (nodeCost) {
            nodeUnlock.removeChild(nodeCost)
        }
        
        nodeUnlock.insertAdjacentHTML('beforeend', 
            `
                <div id='node-cost' class='info-cost'> 
                    <span>Cost:</span> <img id="coins-icon-small" src="/icons/coins-solid.svg"></img> <span>${selectedNode.cost}</span> 
                </div>
            `
        )

        nodeEnable.style.display = "none";
        
    // Node has already been purchased  
    } else if (!selectedNode.locked) {
        nodeUnlock.style.display = "none";

        nodeEnable.style.display = "block";
        updateEnableButton(selectedNode);

    // Node cannot be purchased
    } else {
        nodeUnlock.style.display = "none";
        nodeEnable.style.display = "none";
        
    }
}

// Unlocks a node after it is purchased
function unlockNode() {
    if (currency - selected.cost < 0) {
        alert('Sorry, you don\'t have enough currency to buy this!');
        return;
    }

    selected.locked = false
    openNodeInfo(selected)

    currency = currency - selected.cost 
    currentEmissions = getTotalEmissions(nodes, researchTrees)

    // TODO: send new values to DB
    updateHeader(currency, research, currentEmissions, emissionsCap);
    updateDBNodes(userId, nodes, currency, research, currentEmissions, emissionsCap);

    linkElements.transition().duration(150).attr('stroke', function (link) { return getLinkColor(link, nodes) })
    nodeElements.transition().duration(150).attr('fill', function (node) { return getNodeColor(node) })
}

// Enables or disables a node
function toggleEnableNode() {
    selected.enabled = !selected.enabled
 
    nodeElements.classed("animated", true)
    nodeElements.classed("disabled", function (node) { return !node.enabled })
    nodeElements.classed("enabled", function (node) { return node.enabled })
    nodeElements.attr('stroke', function (node) { return getNodeStrokeColor(node) })

    updateEnableButton(selected)

    currentEmissions = getTotalEmissions(nodes, researchTrees)

    updateHeader(currency, research, currentEmissions, emissionsCap)
    updateDBNodes(userId, nodes, currency, research, currentEmissions, emissionsCap)
}

function updateGraph() {
    // nodes
    nodeElements = nodeGroup.selectAll('circle')
        .data(nodes, function (node) { return node.id })

    nodeElements.exit().remove()

    var nodeEnter = nodeElements
        .enter()
        .append('circle')
        .attr('r', radius)
        .attr('fill', function (node) { return getNodeColor(node) })
        .attr('stroke', function (node) { return getNodeStrokeColor(node) })
        .classed("disabled", function (node) { return !node.enabled })
        .classed("enabled", function (node) { return node.enabled })
        // we link the selectNode method here
        // to update the graph on every click
        .on('click', selectNode)

    // links
    linkElements = linkGroup.selectAll('line')
        .data(links, function (link) {
            return link.target.id + link.source.id
        })

    linkElements.exit().remove()

    var linkEnter = linkElements
        .enter().append('line')
        .attr('stroke-width', 2)
        .attr('stroke', function (link) { return getLinkColor(link, nodes, true) })

    linkElements = linkEnter.merge(linkElements)

    nodeElements = nodeEnter.merge(nodeElements)

    // texts
    textElements = textGroup.selectAll('text')
        .data(nodes, function (node) { return node.id })

    textElements.exit().remove()

    var textEnter = textElements
        .enter()
        .append('text')
        .text(function (node) { return node.label })
        .attr('font-size', 15)
        .attr('dx', -12)
        .attr('dy', 30)

    textElements = textEnter.merge(textElements)

    // Fix positions of starting 3 nodes
    nodes.forEach((node) => {
        if (node.id == 'g-1') {
            node.fx = 0.55*width;
            node.fy = 0.3*height;
        } else if (node.id == 's-1') {
            node.fx = 0.5*width;
            node.fy = 0.5*height;
        } else if (node.id == 'r-1') {
            node.fx = 0.62*width;
            node.fy = 0.5*height;
        }
    })
}

function updateSimulation() {
    updateGraph()

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
        .attr('cx', function (node) { return getNodeX(node); })
        .attr('cy', function (node) { return getNodeY(node); })
        textElements
        .attr('x', function (node) { return getNodeX(node); })
        .attr('y', function (node) { return getNodeY(node); })
        linkElements
        .attr('x1', function (link) { return getNodeX(link.source); })
        .attr('y1', function (link) { return getNodeY(link.source); })
        .attr('x2', function (link) { return getNodeX(link.target); })
        .attr('y2', function (link) { return getNodeY(link.target); })
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0).restart()
}

async function updateUserInfo() {
    var user = await getUser(userId);

    user = user.info[0];

    currency = parseFloat(user.currency);
    research = parseFloat(user.research);
    currentEmissions = getTotalEmissions(nodes, researchTrees);
    emissionsCap = parseFloat(user.emissions_cap);

    updateHeader(currency, research, currentEmissions, emissionsCap);
}

// TODO: Read userId from localStorage after login
var userId = 1;

// After the turn moves forward, refresh the user's info from the DB 
// Note: Uses UTC time (convert it from your local time!)
runAtUTCTimeOfDay(7, 1, updateUserInfo);

var nodes;
var researchTrees;
var currency;
var research;
var currentEmissions;
var emissionsCap;

var links = [...baseLinks];


// On page load, query DB for user. If entry doesn't exist, write user with default nodes and initialize session with defaults
// If user does exist, populate nodes and values with values from DB 
var user = await getUser(userId);

// New user
if (user?.status === 0) {
    
    // Setting default values
    nodes = [...baseNodes];
    researchTrees = productionTreeData;
    currency = 1000;
    research = 10;
    currentEmissions = getTotalEmissions(nodes, researchTrees);
    emissionsCap = 200;

    // Write default values to DB
    var userDefaults = {
        id: userId,
        node_graph: nodes,
        research_trees: researchTrees,
        currency: currency,
        research: research,
        curr_emissions: currentEmissions,
        emissions_cap: emissionsCap
    }

    writeUser(userDefaults);

// Existing user
} else {
    user = user.info[0];

    nodes = JSON.parse(user.node_graph);
    researchTrees = JSON.parse(user.research_trees);
    currency = parseFloat(user.currency);
    research = parseFloat(user.research);
    currentEmissions = getTotalEmissions(nodes, researchTrees);
    emissionsCap = parseFloat(user.emissions_cap);
}

// Update header
updateHeader(currency, research, currentEmissions, emissionsCap);

// Adding event listeners
document.getElementById("unlock-button").addEventListener("click", () => unlockNode());
document.getElementById("enable-button").addEventListener("click", () => toggleEnableNode());
document.getElementById("news-button").addEventListener("click", () => openNews());
document.getElementById("trading-button").addEventListener("click", () => openEmissionsMarket());
document.getElementById('trading-quantity').max = emissionsCap;
document.getElementById('trading-form').addEventListener("submit", submitMarketOffer);
document.getElementById('market-close-button').addEventListener("click", () => closeEmissionsMarket());
document.getElementById('news-close-button').addEventListener("click", () => closeNews());
document.getElementById('node-close-button').addEventListener("click", () => closeNode());


// call updateSimulation to trigger the initial render
updateSimulation()