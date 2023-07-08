import { baseLinks } from "./graphDefaults.js"

export function getNeighbors(node) {
    return baseLinks.reduce(function (neighbors, link) {
        if (link.target.id === node.id) {
            neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
            neighbors.push(link.target.id)
        }
        return neighbors
        },
        [node.id]
    )
}

export function getNodeOpacity(node) {
    if (!node.enabled) {
        return 0.6;
    } else {
        return 1;
    }
}

export function getNodeColor(node, selectedNode) {
    if (node.locked) {
        return 'gray';
    }

    //if (!node.enabled) {
    //    return 'black';
    //}

    if (selectedNode && node.id === selectedNode.id) {
        return node.level === 1 ? 'blue' : 'green'
    }

    return node.level === 1 ? 'red' : 'orange'
}

export function getNodeStroke(node, selectedNode) {
    return node.id === selectedNode.id ? 3 : 1
}

export function getLinkColor(link, nodes, isStartup) { 
    if (isStartup) {
        var isSourceLocked = nodes.find((node) => link.source === node.id).locked;
        var isTargetLocked = nodes.find((node) => link.target === node.id).locked;
    } else {
        var isSourceLocked = nodes.find((node) => link.source.id === node.id).locked;
        var isTargetLocked = nodes.find((node) => link.target.id === node.id).locked;
    }

    if (!isSourceLocked && !isTargetLocked) {
        return 'rgba(144, 255, 144, 0.73)';

    } else if (!isSourceLocked && isTargetLocked || isSourceLocked && !isTargetLocked) {
        return 'rgba(253, 239, 135, 0.9)';

    } else {
        return '#E5E5E5'
    }
}