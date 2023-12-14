// This JS file is used to fill out the menu on the front page

//const apiUrl = "http://localhost:3333";

/* ==== Class definitions ===== */

class OrderDTO {
    constructor(id, productIds, userId, isActive, isAccepted, time) {
        this.id = id;
        this.productIds = productIds;
        this.userId = userId;
        this.isActive = isActive;
        this.isAccepted = isAccepted;
        this.time = time;
    }
}

/* ==== Get HTML elements ===== */

// "confirm" button (credit card form)
const confirmBtn = document.getElementById("confirmBtn");

// Insert order using API call
async function insertOrder(data) {
    const options = {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try {
            const response = await fetch(apiUrl + "/order", options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error:', error.message);
        }
}

confirmBtn.addEventListener("click", evt => {
    evt.preventDefault();

    console.log("hej");

    // Get product list from cart
    const cart = document.getElementById("cart");
    const cartChildren = cart.childNodes;
    const productIds = []
    for(let i = 0; i < cartChildren.length; i++) {
        if(cartChildren[i].nodeType == 1) {
            //productIds.push(cartChildren[i].getAttribute("data-id"));
            productIds.push(cartChildren[i].dataset.id);
        }
    }
   // cart.childNodes.forEach(node => {
   //     // Each node is an <li> with data-id attribute
   //     productIds.push(node.getAttribute("data-id"));
   // });

    // Insert order
    const newOrder = new OrderDTO(
        0,
        productIds,
        1,
        true,
        true,
        new Date().toJSON()
    );

    insertOrder(newOrder).then(response => {
        console.log(response);
    });

});