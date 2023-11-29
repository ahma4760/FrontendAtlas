// Get the current timestamp
function updateTimestamp(elementId) {
    const timestampElement = document.getElementById(elementId);
    const currentTime = new Date();
    timestampElement.textContent = calculateTimeElapsed(currentTime);
}

// Calculate time elapsed since the order was made
function calculateTimeElapsed(orderTime) {
    const now = new Date();
    const timeDifference = now - orderTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}

// Update timestamp every second for the first element
setInterval(() => updateTimestamp('timeElapsed1'), 1000);
// Initial update for the first element
updateTimestamp('timeElapsed1');

// Update timestamp every second for the second element
setInterval(() => updateTimestamp('timeElapsed2'), 1000);
// Initial update for the second element
updateTimestamp('timeElapsed2');
