// Initialize game and user sequences as empty arrays
let gameSeq = [];
let userSeq = [];

// List of button IDs to use for random selection
let btns = ["red", "yellow", "purple", "green"];

// Game status flags and level
let started = false;
let level = 0;

// Select the level indicator element
let h2 = document.querySelector("h2");

// Function to start or restart the game on a keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelUp(); // Begin the game by leveling up
    }
});

// Function to handle button flashes during the game's turn
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

// Function to handle button flashes when the user clicks
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Function to progress to the next level
function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++; // Increase the level
    h2.innerText = `Level ${level}`; // Update level display

    // Generate a random button for the sequence
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor); // Add the button to the game sequence
    gameFlash(randBtn); // Flash the selected button
}

// Function to check the user's input against the game sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If user's input matches the game's sequence
        if (userSeq.length === gameSeq.length) {
            // If the user has completed the sequence, level up
            setTimeout(levelUp, 1000);
        }
    } else {
        // If the user's input is incorrect
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any Key to Start.`;
        document.querySelector("body").style.backgroundColor = "red"; // Flash background red
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        reset(); // Reset the game
    }
}

// Function to handle user's button press
function btnPress() {
    let btn = this; // The button that was clicked
    userFlash(btn); // Flash the button on click
    let userColor = btn.getAttribute("id"); // Get the button's ID (color)
    userSeq.push(userColor); // Add the color to the user's sequence
    checkAns(userSeq.length - 1); // Check the user's input
}

// Attach click event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game after a game over
function reset() {
    started = false; // Reset the game start flag
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user sequence
    level = 0; // Reset the level
}
