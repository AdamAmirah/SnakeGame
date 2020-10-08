let lastRenderTime = 5
const SNAKE_SPEED =5
const gameBoard = document.getElementById('game-board')

let width
let height
let snakeX
let snakeY
let fruitX
let fruitY
let preFruitX
let preFruitY
let status
let fruit
let score
let nTail
let tailX, tailY
let gameOver

function setUp (){
   width =21;
   height=21;
   snakeX=11;
   snakeY=11;
   genFruit()
   preFruitX =-1
   preFruitY=-1
   status = {type:"STOP"};
   fruit=0;
   score=0;
   document.getElementById('score').textContent=score
   nTail=0;
   tailX=[0] , tailY=[0];
   gameOver=0;

}

function genFruit() {

  fruitX=Math.floor((Math.random() * width) )+ 1
  fruitY=Math.floor((Math.random() * height)) + 1
  let f=1;
  if(fruitY==4){
    for(let i=5 ; i<10;i++){
      if(i==fruitX){
        console.log('defsgggg' , fruitX ,fruitY);
        f=0;
        genFruit()
      }
    }
    if(f)return

  }
  else if(fruitY==18){
    for(let i=12 ; i<17;i++){
      if(i==fruitX){
        console.log('defsgggg' , fruitX ,fruitY);
        f=0;
        genFruit()
      }
    }
    if(f)return
  }


}

function drawObs(gameBoard){
  //console.log("sdlkjdsldjs");
  let obsX =5 , obsY=4
    for(let i =0 ; i<5; i++){
    //  console.log(i , obsX);
      const obsElement = document.createElement('div')
      obsElement.style.gridRowStart = obsY
      obsElement.style.gridColumnStart = obsX
      obsElement.classList.add('snakeObs')
      gameBoard.appendChild(obsElement)
      obsX++;
    }

    obsX =12 , obsY=18
    for(let i =0 ; i<5; i++){
    //  console.log(i , obsX);
      const obsElement = document.createElement('div')
      obsElement.style.gridRowStart = obsY
      obsElement.style.gridColumnStart = obsX
      obsElement.classList.add('snakeObs')
      gameBoard.appendChild(obsElement)
      obsX++;
    }
}


function input(){

  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        status ['type'] ="UP";
        break
      case 'ArrowDown':
        status ['type'] ="DOWN";
        break
      case 'ArrowLeft':
        status ['type'] ="LEFT";
        break
      case 'ArrowRight':
        status ['type'] ="RIGHT";
        break
    }
  })
}

function drawSnake(gameBoard){
//  console.log('drawSnake');
      gameBoard.innerHTML= ''
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = snakeY
      snakeElement.style.gridColumnStart = snakeX
      snakeElement.classList.add('snakeHead')

      gameBoard.appendChild(snakeElement)
      switch (status ['type']){
          case "LEFT":
      document.querySelector(".snakeHead").style.borderTopLeftRadius = "50px";
      document.querySelector(".snakeHead").style.borderBottomLeftRadius = "50px";
            break;
          case "RIGHT":
      document.querySelector(".snakeHead").style.borderTopRightRadius = "50px";
      document.querySelector(".snakeHead").style.borderBottomRightRadius = "50px";
              break;
          case "DOWN":
          document.querySelector(".snakeHead").style.borderBottomLeftRadius = "50px";
          document.querySelector(".snakeHead").style.borderBottomRightRadius = "50px";
              break;
          default: break;
        }
}

function drawFruit(gameBoard){
  //console.log('drawFruit');

      const fruitElement = document.createElement('div')
      fruitElement.style.gridRowStart = fruitY
      fruitElement.style.gridColumnStart = fruitX
      fruitElement.classList.add('food')
      gameBoard.appendChild(fruitElement)

}

function drawTail(gameBoard){
  //console.log('drawTail');

  for(let k=0; k<nTail; k++)
    {

      if(k==nTail-1){
        const snakeTail = document.createElement('div')
         snakeTail.style.gridRowStart = tailY[k];
         snakeTail.style.gridColumnStart = tailX[k]
         snakeTail.classList.add('snakeTail')
         gameBoard.appendChild(snakeTail)
      }
      else {
        const snakeTail = document.createElement('div')
        snakeTail.style.gridRowStart = tailY[k];
        snakeTail.style.gridColumnStart = tailX[k]
        snakeTail.classList.add('snake')
        gameBoard.appendChild(snakeTail)

      }
    }




}

function snakeLocation(){
  //console.log('snakeLocation');

  switch (status ['type']){
      case "LEFT":
        snakeX--;
        break;
      case "RIGHT":
        snakeX++;
        break;
      case "UP":
        snakeY--;
        break;
      case "DOWN":
        snakeY++;
        break;
      default: break;
  }
}


function update(){
//  console.log('update');

      let prevX=tailX[0];
      let prevY=tailY[0];
      let prev2X,prev2Y;
      tailX[0]=snakeX;
      tailY[0]=snakeY;
      for(let i=1 ; i<nTail;i++){
          prev2X=tailX[i];
          prev2Y=tailY[i];
          tailX[i]=prevX;
          tailY[i]=prevY;
          prevY=prev2Y;
          prevX=prev2X;
      }
      snakeLocation()
    //  console.log('X COR' , snakeX , snakeY);
      if (snakeX > width){
        gameOver=1
      //  console.log(1, snakeX , width);

      }
	    else if (snakeX < 0){
        gameOver=1
      //  console.log(2, snakeX);
      }
      if (snakeY > height) {
        gameOver=1
      //  console.log(3, snakeY);

      }
	    else if (snakeY<0)  {
        gameOver=1
        //console.log(4, snakeY);

      }

      for(let i=1 ; i<nTail;i++)
          if(tailX[i]==snakeX && tailY[i]==snakeY ){
              gameOver=1;
            //  console.log('x', tailX[i] , snakeX);
            //  console.log('y', tailY[i] , snakeY);
            }

      if(snakeY==4)
        for(let i=5 ; i<10;i++)
          if(i==snakeX)gameOver=1;

      if(snakeY==18)
         for(let i=12 ; i<17;i++)
           if(i==snakeX)gameOver=1;



      if(snakeX==fruitX && snakeY==fruitY){
        fruit=1;
        score+=10;
        document.getElementById('score').textContent=score
        preFruitX=fruitX;
        preFruitY=fruitY;
        genFruit()

        nTail++;
      }
}
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
function checkGameOver() {
//  console.log('gameOver');

      if (gameOver) {
      //  console.log('over');
       winningMessageTextElement.innerText = 'You Lost'
       winningMessageElement.classList.add('show')
         setUp();
       restartButton.addEventListener('click', function() {
                winningMessageElement.classList.remove('show')
       })

      return
    }

}


setUp();
function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED)return
    lastRenderTime= currentTime

    checkGameOver()
    drawSnake(gameBoard)
    if(preFruitY != fruitY || preFruitX != fruitX)drawFruit(gameBoard);
  //  console.log(fruitX , fruitX);
    drawTail(gameBoard)
    drawObs(gameBoard)
    input()
    update()
}

window.requestAnimationFrame(main)
