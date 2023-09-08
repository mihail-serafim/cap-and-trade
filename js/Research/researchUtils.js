export function getNodeColor(node) {
    if (node.data.locked) {
        return 'grey';
    }
    
    switch (node.data.type) {
        case 'display':
            switch (node.data.children[0]?.type) {
                case 'display':
                    return 'black';
                case 'production':
                    return 'orange';
                case 'emissions':
                    return '#87CEFA';
                case 'selling':
                    return '#d4af37';
            }
            
        case 'production':
            return 'orange';
        case 'emissions':
            return '#87CEFA';
        case 'selling':
            return '#d4af37';
    }
}

export function getNodeStroke(node, selectedNode) {
    //console.log(node.data.id === selectedNode.data.id ? 4 : 2)
    return node.data.id === selectedNode?.data.id ? 4 : 2;
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

/**
 * Send updated research tree and data to the DB
 */
export async function updateDBResearch(id, researchTree, currency, research, currentEmissions, emissionsCap ) {
    var res = await fetch('http://localhost/cap_and_trade/update-research', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            research_trees: researchTree,
            currency: currency,
            research: research,
            curr_emissions: currentEmissions,
            emissions_cap: emissionsCap
        })
    });

    res = await res.json()
    console.log(res)
}
