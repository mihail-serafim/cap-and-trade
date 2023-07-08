import { baseNodes, baseLinks } from './graphDefaults.js'  
import { getNodeColor, getNeighbors, getLinkColor, getNodeStroke, getNodeOpacity } from './nodeUtils.js'

var nodes = [...baseNodes]
var links = [...baseLinks]
var unlockedNodes = baseNodes.filter((node) => !node.locked)

var width = window.innerWidth
var height = window.innerHeight

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
    nodeElements.attr('stroke-width', function (node) { return getNodeStroke(node, selectedNode) })

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
        nodeUnlock.style.display = "block";
        nodeEnable.style.display = "none";
        
    // Node has already been purchased  
    } else if (!selectedNode.locked) {
        nodeUnlock.style.display = "none";
        nodeEnable.style.display = "block";

    // Node cannot be purchased
    } else {
        nodeUnlock.style.display = "none";
        nodeEnable.style.display = "none";
        
    }
}

// Unlocks a node after it is purchased
function unlockNode() {
    selected.locked = false
    unlockedNodes.push(selected)
    openNodeInfo(selected)

    linkElements.attr('stroke', function (link) { return getLinkColor(link, nodes) })
    nodeElements.attr('fill', function (node) { return getNodeColor(node) })
}

// Enables or disables a node
function toggleEnableNode() {
    selected.enabled = !selected.enabled 
    nodeElements.classed("disabled", function (node) { return !node.enabled })
}

function updateGraph() {
    // nodes
    nodeElements = nodeGroup.selectAll('circle')
        .data(nodes, function (node) { return node.id })

    nodeElements.exit().remove()

    var nodeEnter = nodeElements
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', function (node) { return getNodeColor(node) })
        .attr('stroke', 'black')
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
        .attr('dx', 15)
        .attr('dy', 4)

    textElements = textEnter.merge(textElements)
}

function updateSimulation() {
    updateGraph()

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
        .attr('cx', function (node) { return node.x })
        .attr('cy', function (node) { return node.y })
        textElements
        .attr('x', function (node) { return node.x })
        .attr('y', function (node) { return node.y })
        linkElements
        .attr('x1', function (link) { return link.source.x })
        .attr('y1', function (link) { return link.source.y })
        .attr('x2', function (link) { return link.target.x })
        .attr('y2', function (link) { return link.target.y })
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0).restart()
}

// Adding event listeners
document.getElementById("unlock-button").addEventListener("click", () => unlockNode())
document.getElementById("enable-button").addEventListener("click", () => toggleEnableNode())
// last but not least, we call updateSimulation
// to trigger the initial render
updateSimulation()