let speed = 4;
let lastPaintTime = 0;
let snakeArr = [
    {x:15, y:15}
]
let inputDir = {x:0 , y:0}

let food = {x:2,y:24}

let board = document.getElementById('board');
let scoreEle = document.getElementById('score');
let score = 0;
let HighScoreEle = document.getElementById('hiscore');
let hiscore = localStorage.getItem('highScore');
if(hiscore === null){
    hiscoreEval = 0;
    localStorage.setItem('highScore', JSON.stringify(hiscoreEval));
}else{
    HighScoreEle.innerText = "Best Score: " + hiscore;
}

//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for(i = 1; i<snake.length; i++ ){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }

    }

    
    if(snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 25){
        return true;
    }

}


function gameEngine(){
    //increasing speed
    switch(score){
        case 15:
            speed = 4.5;
            break;
        case 30:
            speed = 5;
            break;
        case 40:
            speed = 5.5;
            break;
        case 50:
            speed = 6;
            break;
        case 55:
            speed = 7;
            break;
    }



    //Updating the snake variable
    if(isCollide(snakeArr)){
        //game over sounud here
        //pause music sound
        inputDir = {x:0 , y:0};
        alert("Game over, press any key to play again!");
        snakeArr = [
            {x:15, y:15}
        ]
        //play music sound again
        score = 0;
    }

    //snake eats food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 24;
        food = {x: Math.round(a +(b-a) * Math.random()), y:Math.round(a +(b-a) * Math.random())}
    }
    scoreEle.innerText = "Score: " + score;
    if(score > hiscore){
        localStorage.setItem('highScore', JSON.stringify(score));
        hiscore = score
        HighScoreEle.innerText = "Best Score: " + hiscore;
    }
  


    //moving the snake 
    for(let i = snakeArr.length - 2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Render/display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
       
        board.appendChild(snakeElement);
    })

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1} //start the game
    //button click sound
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
        
    }
})