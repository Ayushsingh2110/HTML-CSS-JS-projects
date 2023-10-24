console.log("Welcome to Tic Tac Toe");

let turn = 'X';
let gameOver = false;
let isTie = false;
let click = new Audio("click.wav");
let GameOverSound = new Audio("gameOver.wav");
let win = new Audio("winner_applaus.wav");
//function to change the turn
const changeTurn = (value) => {
    return value === 'X'? turn = 'O': turn = 'X';
}

//funnction to check for a win
const checkWin = () => {
    let winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    
    let boxValue = document.getElementsByClassName('box-value');
  
    winCondition.forEach(e => {
        if((boxValue[e[0]].innerText === boxValue[e[1]].innerText) && 
        (boxValue[e[2]].innerText === boxValue[e[1]].innerText) && 
        (boxValue[e[0]].innerText !== '' || boxValue[e[1]].innerText !== '' || boxValue[e[2]].innerText !== '')){
            document.getElementById('turn').innerText = turn + ' Won the Game';
            gameOver = true;
            win.play();
        }
    })
    
    if(gameOver === false){
        for(let i=0 ; i<boxValue.length; i++){
            if(boxValue[i].innerText === ''){
                isTie = false;
                break;
            }else{
                isTie = true;
            }
        }
    }
    
}

//Game logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxValue = element.querySelector('.box-value');
    element.addEventListener('click', ()=>{
        click.play();
        console.log('clicked');
        if(boxValue.innerText === ''){
            boxValue.innerText = turn;
            checkWin();
            if(gameOver === false){
              changeTurn(boxValue.innerText);
              document.getElementById('turn').innerText = 'Turn of ' + turn  ;
            } 

            if(isTie === true){
                document.getElementById('turn').innerText = 'This is a Tie';
                GameOverSound.play();
            }
        }
    })
});

function reset(){
    let boxValue = document.getElementsByClassName('box-value');
    Array.from(boxValue).map(e =>{
        e.innerText = '';
    })
    gameOver = false;
    turn = 'X';
    document.getElementById('turn').innerText = 'Turn of ' + turn 
}

