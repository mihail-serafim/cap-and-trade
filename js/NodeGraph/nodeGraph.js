import { updateHeader } from '../header.js'
import { baseNodes, baseLinks } from './graphDefaults.js'  
import { productionTreeData, emissionsTreeData, costTreeData } from '../Research/researchDefaults.js'
import { getNodeColor, 
         getNeighbors, 
        getLinkColor, getNodeStroke, updateEnableButton, getTotalEmissions, writeUser, updateDBNodes, getNodeX, getNodeY } from './nodeUtils.js'

var width = window.innerWidth
var height = window.innerHeight
var radius = 10;

const zoom = d3.zoom();
var svg = d3.select('svg')
        .attr("viewBox", `${-width/2} ${-height/2} ${width*2} ${height*2}`)
        .call(zoom.transform, d3.zoomIdentity.scale(3))
        .call(zoom.on('zoom', (event) => {
            svg.attr('transform', event.transform);
        }))
        .append("g")
        .attr('transform', `translate(${-width}, ${-height})scale(${2.9})`);

var linkElements,
nodeElements,
textElements

// we use svg groups to logically group the elements together
var linkGroup = svg.append('g').attr('class', 'links')
var nodeGroup = svg.append('g').attr('class', 'nodes')
var textGroup = svg.append('g').attr('class', 'texts')

svg.selectAll(".node")
       .attr("transform", function (d) {
             d.x = Math.max(100, Math.min(width/3 - radius, d.x));
             d.y = Math.max(100, Math.min(height/3 - radius, d.y));
             return `translate(${d.x},${d.y})`;
       }); 

// simulation setup with all forces
var linkForce = d3
    .forceLink()
    .id(function (link) { return link.id })
    .strength(function (link) { return link.strength })

var simulation = d3
    .forceSimulation()
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))

// we use this reference to select/deselect
var selected

// select node is called on clicking a node
function selectNode(selectedNode) {
    selected = selectedNode; 

    // we modify the styles to highlight selected nodes
    nodeElements.transition().duration(75).attr('stroke-width', function (node) { return getNodeStroke(node, selectedNode) })

    // Open node info panel
    openNodeInfo(selectedNode);
}

// Opens the node info panel
function openNodeInfo(selectedNode) {
    var nodeInfo = document.getElementById('node-info');
    nodeInfo.style.display = "block";

    var nodeDetails = document.getElementById('node-details');
    nodeDetails.innerHTML = `${selectedNode.label}`

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
                <div id='node-cost'> 
                    <span>Cost:</span> <img id="header-coins-small" src="/icons/coins-solid.svg"></img> <span>${selectedNode.cost}</span> 
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
    currentEmissions = getTotalEmissions(nodes)

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

    updateEnableButton(selected)

    currentEmissions = getTotalEmissions(nodes)

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
        .attr('stroke', 'black')
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
}

function updateSimulation() {
    updateGraph()

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
        .attr('cx', function (node) { return getNodeX(node, nodes); })
        .attr('cy', function (node) { return getNodeY(node, nodes); })
        textElements
        .attr('x', function (node) { return getNodeX(node, nodes); })
        .attr('y', function (node) { return getNodeY(node, nodes); })
        linkElements
        .attr('x1', function (link) { return getNodeX(link.source, nodes); })
        .attr('y1', function (link) { return getNodeY(link.source, nodes); })
        .attr('x2', function (link) { return getNodeX(link.target, nodes); })
        .attr('y2', function (link) { return getNodeY(link.target, nodes); })
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0).restart()
}


// On page load, query DB for user. If entry doesn't exist, write user with default nodes and initialize session with defaults
// If user does exist, populate nodes and values with values from db 
var userId = 2;

var nodes;
var currency;
var research;
var currentEmissions;
var emissionsCap;

var links = [...baseLinks]

try {
    // Read user data from DB on page load
    var user = await fetch(`http://localhost/cap_and_trade/get-user?id=${userId}`);
    user = await user.json();
    console.log(user);
    
} catch (e) {
    console.log('error occurred when reading user data');
}

// New user
if (user.status === 0) {
    
    // Setting default values
    nodes = [...baseNodes]
    currency = 1000
    research = 10
    currentEmissions = getTotalEmissions(nodes)
    emissionsCap = 200

    // Write default values to DB
    var userDefaults = {
        id: userId,
        node_graph: nodes,
        research_trees: productionTreeData,
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

    currency = parseFloat(user.currency);
    research = parseFloat(user.research);
    currentEmissions = getTotalEmissions(nodes)
    emissionsCap = parseFloat(user.emissions_cap);
}

// Update header
updateHeader(currency, research, currentEmissions, emissionsCap);


// Adding event listeners
document.getElementById("unlock-button").addEventListener("click", () => unlockNode())
document.getElementById("enable-button").addEventListener("click", () => toggleEnableNode())

// call updateSimulation to trigger the initial render
updateSimulation()