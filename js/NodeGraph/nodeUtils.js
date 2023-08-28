import { baseNodes, baseLinks } from './graphDefaults.js'  
import { productionTreeData } from '../Research/researchDefaults.js'
import { updateHeader } from '../header.js'

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

    return 'orange';
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

export function buildMarketTable(userId, currency, data){
    var table = document.getElementById('trading-table')
    
    var row = "";
    var buttonText;
    for (var i = 0; i < data.length ?? 0; i++) {
        if (data[i].userId != userId) {
            buttonText = `Purchase`
        } else {
                buttonText = `<img id="trading-cancel" src="/icons/x-solid.svg" alt="X" data-id="${data[i].id}" data-quantity="${data[i].quantity}" data-price="${data[i].price}" data-userid="${data[i].userId}"></img>`
        }
        row += `<tr>
                        <td class="centered">${data[i].quantity}</td>
                        <td class="centered">${data[i].price}</td>
                        <td class="centered"><button class="market-button" data-id="${data[i].id}" data-quantity="${data[i].quantity}" data-price="${data[i].price}" data-userid="${data[i].userId}">${buttonText}</button></td>
                </tr>` 
    }
    table.innerHTML = row

    var marketButtons = document.querySelectorAll(".market-button");
    marketButtons.forEach((button) => {
        button.addEventListener('click', (e) => purchaseMarketOffer(e, userId, currency));
    })
}

export async function sendMarketOffer(userId, quantity, price) {
    var emissionsMarketData = await getEmissionsMarketData();

    var existingOffers = 0
    emissionsMarketData.info.forEach((offer) => {
         if (offer.userId == userId) {
            existingOffers += 1;
         }
    })
    if (existingOffers >= 5) {
        alert('Sorry, you can only have 5 market offers at the same time. Please remove one to make another listing.');
        return;
    }

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

export async function purchaseMarketOffer(event, userId, currency) {
    var tradeId = event.target.dataset.id;
    var quantity = parseFloat(event.target.dataset.quantity);
    var price = parseFloat(event.target.dataset.price);
    var offerUserId = event.target.dataset.userid;

    if (userId != offerUserId && currency - price < 0) {
        alert('Sorry, you need more currency to purchase this offer.');
        return;
    }
    
    try {
        var res = await fetch('http://localhost/cap_and_trade/buy-offer', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            price: price,
            quantity: quantity,
            trade_id: tradeId,
            seller_user_id: offerUserId,
            buyer_user_id: userId,
        })
    });

    res = await res.json()
    console.log(res)

    } catch (error) {
        console.error('Error purchasing offer')
        console.error(error)
    } 

    // Update the table to show the new offer
    var  emissionsMarketData = await getEmissionsMarketData();
    buildMarketTable(userId, currency, emissionsMarketData.info);

    // Update header values by reading from db
    var user = await getUser(userId);
    if(user.status === 1) user = user.info[0];
    else console.error('Error reading user data');

    updateHeader(user.currency, user.research, user.curr_emissions, user.emissions_cap);
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
