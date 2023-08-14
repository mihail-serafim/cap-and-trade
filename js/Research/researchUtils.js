export function getNodeColor(node) {
    return node.data.locked ? 'grey' : node.data.level;
}

export function getNodeStroke(node, selectedNode) {
    //console.log(node.data.id === selectedNode.data.id ? 4 : 2)
    return node.data.id === selectedNode.data.id ? 4 : 2;
}

export function getLinkColor(linkChild){
    // Next node can be purchased
    if (linkChild.data.locked && !linkChild.parent.data.locked) {
        return 'rgba(253, 239, 135, 0.9)';
    } 

    // Both nodes have been purchased
    else if (!linkChild.data.locked && !linkChild.parent.data.locked) {
        return 'black';
    }

    // Neither node has been purchased
    else {
        return 'grey';
    }
}
