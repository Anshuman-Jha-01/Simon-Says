let gameSeq = []; //in levelUp
let userSeq = []; //in levelUp
let rand;  //in levelUp
let b;  //in levelUp
let i=0; //in check
let score; //in check
let h3 = document.querySelector("#change");
let btns = document.querySelectorAll(".clickBox");
let body = document.querySelector("body");
let level = 1;
let start = "false"
let Highest = 0; //in Highest score
let p = document.createElement("p"); //in Highest score
body.append(p);  //in Highest score

let difficulty = parseInt(prompt("Enter the level of difficulty (700-Easy, 500-Medium, 300-Hard)"));

document.addEventListener("keydown",function()
{
    if (start == "false")
    {        
        levelUp();
    }
    start = "true";
});

function btnflash(btn)
{
    btn.classList.add("flash");
    setTimeout(function()
    {
        btn.classList.remove("flash");
    },difficulty);
}

function userBtnflash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function()
    {
        btn.classList.remove("userflash");
    },200);
}

function levelUp() 
{
    h3.innerText = `Level ${level}`; 
    rand = Math.floor(Math.random()*3);
    b = btns[rand];
    gameSeq.push(b);   
    btnflash(b);
    userSeq = [];
}

function gameOver()
{
    body.classList.add("gameEnd");
    setTimeout(function()
    {
        body.classList.remove("gameEnd");
    },200);
}

function check()
{
    if (i<level)
    {
        if (userSeq[i] == gameSeq[i])
            {
                console.log("Correct sequence");
                i++;
                if(i == level)
                {
                    level++;
                    i=0;
                    levelUp();
                }
            }
            else
            {
                console.log("Wrong sequence");
                score = level-1;
                h3.innerHTML = `Game Over!!! <br> Your current score is ${score}. <br> Press any key to restart.`
                gameOver();
                restart();
            }
    }

}

for (btn1 of btns)
{
    btn1.addEventListener("click",function ()
{
    userBtnflash(this);
    userSeq.push(this);
    check();
});
}


function restart() 
{
    start = "false"
    gameSeq = [];
    userSeq = [];
    level = 1;
    if (Highest<score)
        {
            Highest = score;
        }
    p.innerText = `Highest score is: ${Highest}`;
}



