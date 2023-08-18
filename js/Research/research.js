import { updateHeader } from "../header.js";
import { productionTreeData } from "./researchDefaults.js";
import { getNodeColor, getNodeStroke, getLinkColor, updateDBResearch } from "./researchUtils.js";
import { getTotalEmissions, getUser } from "../NodeGraph/nodeUtils.js";

var selected;
var allNodeElements = [], allLinkElements = [];
var treeNodes = [];


// select node is called on clicking a node
function selectNode(selectedNode) {
    if (selectedNode.data.type === 'display') {
        return;
    }

    selected = selectedNode;

    d3.selectAll('rect').style('stroke-width', function (node) { return getNodeStroke(node, selectedNode) })

    // Open node info panel
    openResearchInfo(selectedNode);
}

function unlockNode() {
    if (research - selected.data.cost < 0) {
        alert('Sorry, you don\'t have enough research points to buy this!');
        return;
    }

    selected.data.locked = false;
    openResearchInfo(selected)

    research = research - selected.data.cost

    // TODO write recursive function to parse tree and change it into original tree format so it can be uploaded to mysql
    var tree = {
        "children": treeNodes[0].children,
        ...treeNodes[0].data,
    }

    console.log(tree)
    console.log(treeNodes[0])
    updateDBResearch(userId, tree, currency, research, currentEmissions, emissionsCap); 
    updateHeader(currency, research, currentEmissions, emissionsCap);

    d3.selectAll('rect').transition().duration(500).style("fill", node => getNodeColor(node))
    d3.selectAll('.link').transition().duration(500).style("stroke", linkChild => getLinkColor(linkChild))
}

// Opens the node info panel
function openResearchInfo(selectedNode) {
    var researchInfo = document.getElementById('research-info');
    researchInfo.style.display = "block";

    var researchDetails = document.getElementById('research-details');
    researchDetails.innerHTML = `${selectedNode.data.name}`

    var researchUnlock = document.getElementById('research-unlock');

    // Node can be purchased if parent of selected node is unlocked and node itself is locked
    if (!selectedNode.parent.data.locked && selectedNode.data.locked) {
        researchUnlock.style.display = "block";
        
    // Node has already been purchased  
    } else if (!selectedNode.data.locked) {
        researchUnlock.style.display = "none";

    // Node cannot be purchased
    } else {
        researchUnlock.style.display = "none";        
    }
}

function displayTree(treeData, svgId) {
    // set the dimensions of the diagram
    var width = window.innerWidth
    var height = window.innerHeight

    var nodeElements, linkElements;
    
    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, d => d.children);
    

    // maps the node data to the tree layout
    nodes = treemap(nodes);
    
    treeNodes.push(nodes);

    const zoom = d3.zoom();

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#' + svgId)
            .attr("width", width)
            .attr("height", height)
            .call(zoom.transform, d3.zoomIdentity.scale(1))
            .call(zoom.on('zoom', (event) => {
                svg.attr('transform', event.transform);
            }))

    const g = svg.append("g")
            .attr('transform', `translate(${225}, ${-45})scale(${0.6})`);;

    // adds the links between the nodes
    linkElements = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .style("stroke", linkChild => getLinkColor(linkChild))
        .attr("d", d => {
            return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
            });

    const nodeWidth = 60

    // adds each node as a group
    nodeElements = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => `translate(${d.y - nodeWidth/2}, ${d.x - nodeWidth/2})`);

    // adds the text to the node
    nodeElements.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? 10 * -1 : 10 + nodeWidth)
        .attr("y", d => - 15)
        .style("text-anchor", d => d.children ? "end" : "start")
        .style("font-size", "26px")
        .style("font-weight", 500)
        .text(d => d.data.name);

    // adds the rect to the node
    nodeElements.append("rect")
        .attr("width", node => (node.data.type === 'display' ? nodeWidth/2 : nodeWidth))
        .attr("height", node => (node.data.type === 'display' ? nodeWidth/2 : nodeWidth))
        .style("stroke", 'black')
        .style("stroke-width", 2)
        .style("fill", node => getNodeColor(node))
        .attr("y", node => (node.data.type === 'display' ? nodeWidth/4 : 0))
        .on('click', selectNode)
    
    nodeElements.append("svg:image")
        .attr("x", nodeWidth/4 - 10)
        .attr("y", nodeWidth + 10) 
        .attr('width', 20)
        .attr('height', 24)
        .classed('research-icon', true)
        .attr("xlink:href", node => (node.data.type === 'display' ? "" : "icons/flask-solid.svg"));

    nodeElements.append("text")
        .attr("x", nodeWidth/4 + 15)
        .attr("y", nodeWidth + 30)
        .style("font-size", "26px")
        .style("font-weight", 500)
        .text(node => node.data.cost);

    allNodeElements.push(nodeElements)
    allLinkElements.push(linkElements)
}


// On page load
var userId = 6;

var nodes;
var researchTree = productionTreeData;
var currency;
var research;
var currentEmissions;
var emissionsCap;

var user = await getUser(userId);

if (user.status !== 0) {
    user = user.info[0];

    nodes = JSON.parse(user.node_graph);
    researchTree = JSON.parse(user.research_trees);
    
    console.log('current user found')
    console.log(researchTree)

    currency = parseFloat(user.currency);
    research = parseFloat(user.research);
    currentEmissions = getTotalEmissions(nodes);
    emissionsCap = parseFloat(user.emissions_cap);
} 

// Update header
updateHeader(currency, research, currentEmissions, emissionsCap);

// Adding event listeners
document.getElementById("unlock-button").addEventListener("click", () => unlockNode());


// Rendering trees
displayTree(researchTree, "production-research");

