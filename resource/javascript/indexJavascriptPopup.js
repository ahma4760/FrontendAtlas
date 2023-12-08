document.addEventListener("DOMContentLoaded", function() {
    // Get references to the necessary elements
    const showLoginButton = document.querySelector("#login-popup__show-login");
    const popup = document.querySelector(".login-popup__popup");
    const closeBtn = document.querySelector(".login-popup__popup .login-popup__close-btn");
    const overlay = document.querySelector("#login-popup__overlay");
    const loginPopupCenter = document.getElementById("loginOverlay");

    // Function to show the popup and overlay
    function showPopup() {
        loginPopupCenter.setAttribute("style", "z-index:200;")
        popup.classList.add("active");
        overlay.classList.add("active");
    }

    // Function to hide the popup and overlay
    function hidePopup() {
        loginPopupCenter.setAttribute("style", "z-index:-1;")
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }

    // Event listener for the login button
    showLoginButton.addEventListener("click", showPopup);

    // Event listener for the close button inside the popup
    closeBtn.addEventListener("click", hidePopup);

    // Event listener for clicking outside the popup
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            hidePopup();
        }
    })
});
