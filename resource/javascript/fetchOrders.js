// API URL

const apiUrl = "http://localhost:8080";

// HTML elements
const receivedOrders = document.getElementById("receivedOrders");
const acceptedOrders = document.getElementById("acceptedOrders");


// Fetch active orders from REST API
async function fetchProducts() {
    try {
            const response = await fetch(apiUrl + "/order_active");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
}

// This will fill the two lists with active orders
function fillOrders(orders) {
    orders.forEach(order => {
        // Create HTML element for order

        let orderInfo = document.createElement("div");
        orderInfo.setAttribute("class", "order-info");

        let orderNumber = document.createElement("div");
        orderNumber.setAttribute("class", "order-number");

        let table = document.createElement("table");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        let customerInfo = document.createElement("div");

        let orderedPizzas = document.createElement("div");
        orderedPizzas.setAttribute("class", "ordered-pizzas");

        orderInfo.appendChild(orderNumber);
        orderNumber.appendChild(table);
        table.appendChild(td1);
        table.appendChild(td2);
        td1.innerHTML = order.id;
        td2.innerHTML = order.user.username;
        orderInfo.appendChild(orderedPizzas);
        order.products.forEach(product => {
            let li = document.createElement("li");
            orderedPizzas.appendChild(li);
            li.innerHTML = product.title;
        });

        // Place element in the right list
        if(order.accepted) {
            acceptedOrders.appendChild(orderInfo);
        } else {
            receivedOrders.appendChild(orderInfo);
        }
    });
}

window.addEventListener("load", function() {
    const orders = [];
    fetchProducts().then(arr => {
        arr.forEach(element => {
            orders.push(element);
        });
    }).then(function() {
        fillOrders(orders);
    })

});