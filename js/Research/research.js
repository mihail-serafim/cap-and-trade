import { productionTreeData } from "./researchDefaults.js";

function displayTree(treeData, svgId) {
    // set the dimensions of the diagram
    var width = window.innerWidth
    var height = window.innerHeight
    
    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, d => d.children);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    const zoom = d3.zoom();

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#' + svgId)
            .attr("width", width)
            .attr("height", height/2)
            .call(zoom.transform, d3.zoomIdentity.scale(1))
            .call(zoom.on('zoom', (event) => {
                svg.attr('transform', event.transform);
            }))

    const g = svg.append("g")
            .attr('transform', `translate(${225}, ${-45})scale(${0.6})`);;

    // adds the links between the nodes
    const link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .style("stroke", d => d.data.level)
        .attr("d", d => {
            return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
            });

    const nodeWidth = 60

    // adds each node as a group
    const node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => `translate(${d.y - nodeWidth/2}, ${d.x - nodeWidth/2})`);

    // adds the rect to the node
    node.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeWidth)
        .style("stroke", d => d.data.type)
        .style("fill", d => d.data.level);

    // adds the text to the node
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? (d.data.value) * -1 : d.data.value + nodeWidth)
        .attr("y", d => d.children && d.depth !== 0 ? -(d.data.value + 5) : d)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}

displayTree(productionTreeData, "production-research");
displayTree(productionTreeData, "emissions-research");
displayTree(productionTreeData, "cost-research");