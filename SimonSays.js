// Arrays to store game and user sequences
let gameSeq = []; 
let userSeq = []; 

// Variables used for game mechanics
let rand, b, i = 0, score, level = 1, Highest = 0;
let h3 = document.querySelector("#change"); // Display level and messages
let btns = document.querySelectorAll(".clickBox"); // Color boxes
let body = document.querySelector("body"); // Body element for styling
let start = "false"; // Game start flag
let p = document.createElement("p"); // Display highest score
body.append(p); 

// Difficulty level set by the user
let difficulty = parseInt(prompt("Enter the level of difficulty (700-Easy, 500-Medium, 300-Hard)"));

// Start the game with a key press
document.addEventListener("keydown", function() {
    if (start == "false") {        
        levelUp(); // Initialize the first level
    }
    start = "true"; // Update start flag
});

// Flash effect for game sequence
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, difficulty);
}

// Flash effect for user clicks
function userBtnflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200);
}

// Move to the next level by adding a new sequence step
function levelUp() {
    h3.innerText = `Level ${level}`; 
    rand = Math.floor(Math.random() * 3); // Select random color
    b = btns[rand];
    gameSeq.push(b);   
    btnflash(b);
    userSeq = [];
}

// Trigger game over sequence
function gameOver() {
    body.classList.add("gameEnd");
    setTimeout(function() {
        body.classList.remove("gameEnd");
    }, 200);
}

// Check if user sequence matches game sequence
function check() {
    if (i < level) {
        if (userSeq[i] == gameSeq[i]) {
            console.log("Correct sequence");
            i++;
            if (i == level) {
                level++;
                i = 0;
                levelUp();
            }
        } else {
            console.log("Wrong sequence");
            score = level - 1;
            h3.innerHTML = `Game Over!!! <br> Your current score is ${score}. <br> Press any key to restart.`;
            gameOver();
            restart();
        }
    }
}

// Capture user clicks on color boxes and verify sequence
for (let btn1 of btns) {
    btn1.addEventListener("click", function () {
        userBtnflash(this);
        userSeq.push(this);
        check();
    });
}

// Reset game parameters for restart
function restart() {
    start = "false";
    gameSeq = [];
    userSeq = [];
    level = 1;
    if (Highest < score) {
        Highest = score;
    }
    p.innerText = `Highest score is: ${Highest}`;
}
