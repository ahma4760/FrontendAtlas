const zipInput = document.getElementById("zip");
const townInput = document.getElementById("town");

async function fetchTownFromZip(zip) {
    const apiUrl = `https://api.dataforsyningen.dk/postnumre?nr=${zip}`
    try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Update the town text box with fetched value
            townInput.value = data[0].navn;

        } catch (error) {
            console.error('Error:', error.message);
        }
}

zipInput.addEventListener("blur", function() {
    // Execute below when text box focus has been removed

    fetchTownFromZip(zipInput.value)
})