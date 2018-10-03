const board = document.querySelector('.board');
const cols = document.querySelectorAll('.col');
const restartButton = document.getElementById('restart');
const resultMessage = document.querySelector('.result');
const playerMarker = 'X';
const computerMarker = '0';
let count = 0;
let playerTurn = true;
let winner = null;
let gameOver = false;
const grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

restartButton.addEventListener('click', reseatBoard);


function play() {

  for (let ix=0; ix<cols.length; ix++) {
    cols[ix].addEventListener('click', () => {
      if(!cols[ix].innerHTML && !gameOver && playerTurn){
        cols[ix].innerHTML = playerMarker;
        let i = cols[ix].getAttribute('data-i');
        let j = cols[ix].getAttribute('data-j');
        grid[i][j] = playerMarker;
        count++;
        playerTurn = !playerTurn;
        checkResult();
        if(!gameOver) {
          setTimeout(moveAI, 500);
          count++
          setTimeout(checkResult,501)
        }
      }
    })
  }
}



function moveAI() {
  let emptyCells = []
  for(let ix=0; ix<cols.length; ix++){
    if(cols[ix].innerHTML == '') {
      emptyCells.push(ix)
    }
  }
  let index = Math.floor(Math.random()*emptyCells.length)
  cols[emptyCells[index]].innerHTML = computerMarker;
  let i = cols[emptyCells[index]].getAttribute('data-i');
  let j = cols[emptyCells[index]].getAttribute('data-j');
  grid[i][j] = computerMarker
  playerTurn = !playerTurn
}

function checkResult() {
  if(count==9) {
    gameOver = true;
    winner = 'nobody';
  }
  // check horizontally
  for(let ix=0; ix<3; ix++) {
    if((grid[ix][0] != '') && (grid[ix][0]==grid[ix][1]) && (grid[ix][0]==grid[ix][2])) {
      gameOver = true;

      if (grid[ix][0]=='X') winner = 'you'
      else winner = 'computer';

      // color the winning cells
      for(let j=0; j<3; j++){
        cols[3*ix+j].style.backgroundColor = 'red'
      }
    }
  }
  // check vertically
  for(let jx=0; jx<3; jx++) {
    if((grid[0][jx] != '') && (grid[0][jx]==grid[1][jx]) && (grid[1][jx]==grid[2][jx])) {
      gameOver = true;

      if (grid[0][jx]=='X') winner = 'you'
      else winner = 'computer';

      // color the winning cells
      for(let j=0; j<3; j++){
        cols[3*j+jx].style.backgroundColor = 'red'
      }
    }
  }
  // check diagonals
  if((grid[0][0] != '') && (grid[0][0]==grid[1][1]) &&(grid[0][0]==grid[2][2])){
    gameOver = true;
      
    if (grid[1][1]=='X') winner = 'you'
    else winner = 'computer'

    // color the winning cells
    for(let i=0; i<3; i++) {
      cols[3*i+i].style.backgroundColor = 'red'
    }
  } 
  if((grid[0][2] != '') && (grid[0][2]==grid[1][1]) &&(grid[0][2]==grid[2][0])) {
    gameOver = true;

    if (grid[1][1]=='X') winner = 'you'
    else winner = 'computer'

    // color the winning cells
    for(let i=0; i<3; i++) {
      cols[2*i+2].style.backgroundColor = 'red'
    }
  }

  if(winner) {
    board.style.opacity = '0.2';
    sendMessage(winner);
  }
}

function sendMessage(param) {
  switch(param) {
    case 'you':
      resultMessage.innerHTML = 'You won the game';
      resultMessage.style.color = 'blue';
      break;
    case 'computer': 
      resultMessage.innerHTML = 'You lost!!!';
      resultMessage.style.color = 'red';
      break;
    case 'nobody': 
      resultMessage.innerHTML = 'You are equally strong';
      resultMessage.style.color = 'grey';
      break;
  }
}

function reseatBoard() {
  
  board.style.opacity = '1'
  count = 0;
  resultMessage.innerHTML = '';
  gameOver = false;
  playerTurn = true;
  winner = null;
  
  for (let ix=0; ix<cols.length; ix++){
    cols[ix].innerHTML = '';
    cols[ix].style.backgroundColor = 'aliceblue'
  }
  for (let ix=0; ix<3; ix++) {
    for (let jx=0; jx<3; jx++) {
      grid[ix][jx]='';
    }
  }
}

window.onload = play()
