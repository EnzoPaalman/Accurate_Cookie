var score = 0;
var clicks = 0;

// Get the cookie image element
var cookie = document.getElementById("cookie");
cookie.style.position = "absolute";

var shrinkInterval; // Interval to shrink the cookie
var shrinkRate = 2; // Pixels to shrink every 100ms (20px per second)
var currentSize = 50; // Start size
var minSize = 10; // Minimum size before disappearing

// Function to set a random position for the cookie image
function setRandomPosition() {
    // Get the dimensions of the window (viewport)
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // Set the minimum distance from the top-left corner (avoid it)
    var margin = 100; // For example, the cookie won't appear within the first 100px of the top-left corner

    // Randomly generate position, avoiding the top-left corner
    var x = Math.random() * (viewportWidth - margin);
    var y = Math.random() * (viewportHeight - margin);

    // Reset the size of the cookie to 50x50px
    currentSize = 50;
    cookie.style.width = currentSize + "px";
    cookie.style.height = currentSize + "px";

    // Set the cookie's position
    cookie.style.left = x + "px";
    cookie.style.top = y + "px";

    // Restart shrinking
    startShrinking();
}

// Function to shrink the cookie size over time
function startShrinking() {
    clearInterval(shrinkInterval); // Clear any existing shrinking interval
    shrinkInterval = setInterval(() => {
        if (currentSize > minSize) {
            currentSize -= shrinkRate; // Reduce size by 2px every 100ms
            cookie.style.width = currentSize + "px";
            cookie.style.height = currentSize + "px";
        } else {
            // When the cookie reaches the minimum size, reset its position
            clearInterval(shrinkInterval); // Stop shrinking
            setRandomPosition(); // Reposition the cookie
        }
    }, 100); // Shrink every 100ms
}

// Initial position for the cookie
setRandomPosition();

// Click event listener to update position and score
cookie.addEventListener("click", function () {
    setRandomPosition(); // Move the cookie to a new position
    score += 1; // Increase the score
    document.getElementById("score").innerHTML = "Score: " + score;
});

// Update the score display
document.getElementById("score").innerHTML = "Score: " + score;

// Track click accuracy
window.addEventListener("click", function () {
    clicks += 1;
    document.getElementById("accuracy").innerHTML = "Accuracy: " + Math.floor(100 * score / clicks) + "%";
});

// Timer and CPS logic
var myTimer = setInterval(myTimerFunction, 1000);
var time = 0;

function myTimerFunction() {
    time++;
    document.getElementById("timer").innerHTML = "Time: " + time;
    document.getElementById("CPS").innerHTML = "CPS: " + Math.round(score / time * 1000) / 1000;
    document.getElementById("RAWCPS").innerHTML = "Raw CPS: " + Math.round(clicks / time * 1000) / 1000;
}
