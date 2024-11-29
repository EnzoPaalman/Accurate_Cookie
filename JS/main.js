
var score = 0;
var clicks = 0;


// Get the cookie image element
var cookie = document.getElementById("cookie");
cookie.style.position = "absolute";

// Function to set a random position for the cookie image
function setRandomPosition() {
    // Get the dimensions of the window (viewport)
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
  
    // Set the minimum distance from the top-left corner (avoid it)
    var margin = 100; // For example, the cookie won't appear within the first 100px of the top-left corner
  
    // Randomly generate position, avoiding the top-left corner
    var x = Math.random() * (viewportWidth - margin); // Random x position (width) within the screen minus the margin
    var y = Math.random() * (viewportHeight - margin); // Random y position (height) within the screen minus the margin
  
    // Random size for the cookie (between 10px and 100px)
    var w = Math.random() * 90 + 10; // Cookie width and height
  
    // Set the cookie's position and size
    cookie.style.left = x + "px";
    cookie.style.top = y + "px";
    cookie.style.width = w + "px";
    cookie.style.height = w + "px";
  }

// Initial position for the cookie
setRandomPosition();

// Click event listener to update position and score
cookie.addEventListener("click", function() {
  setRandomPosition();
  score += 1;
  document.getElementById("score").innerHTML = "Score: " + score;
});

// Update the score display
document.getElementById("score").innerHTML = "Score: " + score;

// Track click accuracy
window.addEventListener("click", function() {
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

