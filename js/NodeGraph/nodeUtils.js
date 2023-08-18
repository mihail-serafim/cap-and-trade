import { baseNodes, baseLinks } from './graphDefaults.js'  
import { productionTreeData } from '../Research/researchDefaults.js'

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

export function getNodeX(currentNode) {
    var width = window.innerWidth
    var radius = 6;

    return Math.max(radius, Math.min(width - radius, currentNode.x));
}

export function getNodeY(currentNode) {
    var height = window.innerHeight
    var radius = 6;

    return Math.max(190, Math.min(height - radius - 200, currentNode.y));
}

export function getNodeOpacity(node) {
    if (!node.enabled) {
        return 0.6;
    } else {
        return 1;
    }
}

export function getNodeColor(node) {
    if (node.locked) {
        return 'gray';
    }

    if (node.type === 0) {
        return 'orange';
    } else if (node.type === 1) {
        return 'red';
    } else if (node.type === 2) {
        return 'blue';
    }

    return node.level === 1 ? 'red' : 'orange';
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

    // Between two unlocked nodes
    if (!isSourceLocked && !isTargetLocked) {
        return 'rgba(144, 255, 144, 0.73)';

    // Between an unlocked node and a locked node (locked node can be purchased)
    } else if (!isSourceLocked && isTargetLocked || isSourceLocked && !isTargetLocked) {
        return 'rgba(253, 239, 135, 0.9)';

    // Between two locked nodes
    } else {
        return '#E5E5E5'
    }
}

export function updateEnableButton(selectedNode) {
    var enableButton = document.getElementById('enable-button');

    if (selectedNode.enabled) {
        enableButton.innerHTML = 'Disable';
        enableButton.classList.add('enabled');
        enableButton.classList.remove('disabled');

    } else {
        enableButton.innerHTML = 'Enable';
        enableButton.classList.add('disabled');
        enableButton.classList.remove('enabled');
    }
}

export function getTotalEmissions(nodes) {
   return nodes.reduce((totalEmissions, node) => totalEmissions + (node.enabled && !node.locked ? node.emissions : 0) , 0);
}

// Used to convert JSON data into a form which can be sent to the server
export async function writeUser(userData) {
    var res = await fetch('http://localhost/cap_and_trade/write-user', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    res = await res.json()
    console.log(res)
}

/**
 * Send updated node graph and data to the DB
 */
export async function updateDBNodes(id, nodes, currency, research, currentEmissions, emissionsCap ) {
    var res = await fetch('http://localhost/cap_and_trade/update-nodes', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            node_graph: nodes,
            currency: currency,
            research: research,
            curr_emissions: currentEmissions,
            emissions_cap: emissionsCap
        })
    });

    res = await res.json()
    console.log(res)
}

export async function getEmissionsMarketData() {
    try {
        var data = await fetch(`http://localhost/cap_and_trade/get-trading-data`);
        data = await data.json();
        console.log(data);
        
    } catch (e) {
        console.log('error occurred when reading market data');
    }
    
    return data;
}

export function buildMarketTable(userId, data){
    var table = document.getElementById('trading-table')
    
    var row = "";
    var buttonText;
    for (var i = 0; i < data.length; i++){
        if (data[i].userId != userId) {
            buttonText = `Purchase`
        } else {
            buttonText = `<img id="trading-cancel" src="/icons/x-solid.svg" alt="X" data-id="${data[i].id}"></img>`
        }
        row += `<tr>
                        <td class="centered">${data[i].quantity}</td>
                        <td class="centered">${data[i].price}</td>
                        <td class="centered"><button class="market-button" data-id="${data[i].id}">${buttonText}</button></td>
                </tr>` 
    }
    table.innerHTML = row

    var marketButtons = document.querySelectorAll(".market-button");
    marketButtons.forEach((button) => {
        button.addEventListener('click', purchaseMarketOffer);
    })
}

export async function sendMarketOffer(userId, quantity, price) {
    var res = await fetch('http://localhost/cap_and_trade/create-offer', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            quantity: quantity,
            price: price,
        })
    });

    res = await res.json();
    console.log(res);
}

export async function purchaseMarketOffer(event) {
    event.preventDefault();

    console.log(event.target.dataset.id);
    // TODO check if money is enough to purchase
    // if it is, call php script and then update header values by reading from DB.
}

export async function getUser(userId) {
    try {
        // Read user data from DB on page load
        var user = await fetch(`http://localhost/cap_and_trade/get-user?id=${userId}`);
        user = await user.json();
        console.log(user);
        
    } catch (e) {
        console.log('error occurred when reading user data');
    }

    return user;
}
