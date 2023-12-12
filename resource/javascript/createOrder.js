// This JS file is used to fill out the menu on the front page

const apiUrl = "http://localhost:8080";


/* ==== Get HTML elements ===== */

// "continue order" button
const continueBtn = document.getElementById("continueBtn");

// Insert order using API call
async function insertOrder() {
    try {
            const response = await fetch(apiUrl + "/categories");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
}

continueBtn.addEventListener("click", evt => {
    evt.preventDefault();

    // Get product list from cart
    const cart = document.getElementById("cart");

    // Insert order


});