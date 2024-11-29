let score = 0;
let clicks = 0;
let gameTime = 30; // Default time
let shrinkRate = 2; // Default shrink rate
let timerInterval;
let shrinkInterval;

// Get DOM elements
const cookie = document.getElementById("cookie");
const timerElement = document.getElementById("timer");
const cpsElement = document.getElementById("CPS");
const rawCpsElement = document.getElementById("RAWCPS");
const scoreElement = document.getElementById("score");
const accuracyElement = document.getElementById("accuracy");
const startButton = document.getElementById("start-game");

// Function to reset the game state
function resetGame() {
    score = 0;
    clicks = 0;
    time = 0;
    scoreElement.textContent = "Score: 0";
    accuracyElement.textContent = "Accuracy: 0%";
    cpsElement.textContent = "CPS: 0";
    rawCpsElement.textContent = "Raw CPS: 0";
    timerElement.textContent = "Time: 0";
}

// Function to start the game
function startGame() {
    // Retrieve game settings
    gameTime = parseInt(document.getElementById("game-time").value);
    const difficulty = document.getElementById("difficulty").value;

    // Set shrink rate based on difficulty
    switch (difficulty) {
        case "easy":
            shrinkRate = 1; // Shrink slower
            break;
        case "medium":
            shrinkRate = 2;
            break;
        case "hard":
            shrinkRate = 4; // Shrink faster
            break;
    }

    resetGame();

    // Show the cookie and start positioning it
    cookie.style.display = "block";
    setRandomPosition();

    // Start the game timer
    let time = 0;
    timerInterval = setInterval(() => {
        time++;
        timerElement.textContent = `Time: ${time}`;
        cpsElement.textContent = `CPS: ${(score / time).toFixed(2)}`;
        rawCpsElement.textContent = `Raw CPS: ${(clicks / time).toFixed(2)}`;

        // End game when time is up
        if (time >= gameTime) {
            endGame();
        }
    }, 1000);
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    clearInterval(shrinkInterval);
    cookie.style.display = "none";
    alert(`Game Over! Final Score: ${score}`);
}

// Function to set a random position for the cookie
function setRandomPosition() {
    const panel = document.querySelector(".game-panel__area");
    const panelRect = panel.getBoundingClientRect();

    const x = Math.random() * (panelRect.width - 50);
    const y = Math.random() * (panelRect.height - 50);

    cookie.style.left = `${x}px`;
    cookie.style.top = `${y}px`;
    startShrinking();
}

// Function to shrink the cookie
function startShrinking() {
    let currentSize = 50;
    clearInterval(shrinkInterval);
    shrinkInterval = setInterval(() => {
        if (currentSize > 10) {
            currentSize -= shrinkRate;
            cookie.style.width = `${currentSize}px`;
            cookie.style.height = `${currentSize}px`;
        } else {
            clearInterval(shrinkInterval);
            setRandomPosition();
        }
    }, 100);
}

// Cookie click handler
cookie.addEventListener("click", () => {
    score++;
    clicks++;
    scoreElement.textContent = `Score: ${score}`;
    setRandomPosition();
});

// Accuracy tracking
document.querySelector(".game-panel__area").addEventListener("click", () => {
    clicks++;
    accuracyElement.textContent = `Accuracy: ${(100 * score / clicks).toFixed(2)}%`;
});

// Start game on button click
startButton.addEventListener("click", startGame);
