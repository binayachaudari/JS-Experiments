const CANVAS_WIDTH = 768,
  CANVAS_HEIGHT = window.innerHeight, //1024
  BIRD_HEIGHT = 194.625,
  BIRD_WIDTH = 50,
  BIRD_PASS_GAP = 130,
  PIPE_OFFSET = 80,
  GRAVITY = 0.2,
  PIPE_SPEED = 1.5,
  GROUND_OFFSET = 37,
  SCORE_OFFSET = 100;

document.body.style.margin = "0px";
document.body.style.padding = "0px";

const canvas = document.createElement("canvas");

let ctx = canvas.getContext("2d");

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.margin = "0 auto";
canvas.style.display = "block";
document.body.appendChild(canvas);

/**
 * [generates Random Number]
 * @param  {Number} min minimum Number
 * @param  {Number} max Maximum Number
 * @return {Number}     Random Number
 */
let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};


let birdData = {
  xPos: CANVAS_WIDTH / 2 - BIRD_WIDTH / 2 - 100,
  yPos: CANVAS_HEIGHT / 2 - BIRD_HEIGHT / 2,
};

let pipeData = {
  xPos: CANVAS_WIDTH + 50,
  yPos: 0
};

let birdInstance = new Bird(birdData);

let drawAll = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  backgroundDraw();
  listOfPipes.forEach((eachPipe, index) => {
    eachPipe.draw();
  })
  birdInstance.draw();
  scoreCanvas();
}

let updateAll = () => {
  groundUpdate();
  groundCollisionDetection();
  listOfPipes.forEach((eachPipe, index) => {
    eachPipe.update();
    pipeCollisionDetection(eachPipe);
    deletePipe(eachPipe);
    updateScore(eachPipe);
  });
  birdInstance.update();
}

// let deltaTime = 0,
//   lastTime = (new Date()).getTime();

var gameInit;
let gameLoop = () => {
  gameInit = window.requestAnimationFrame(gameLoop);
  // let currentTime = (new Date()).getTime();
  // deltaTime = (currentTime - lastTime) / 1000;
  drawAll();
  updateAll();
  // lastTime = currentTime;
}


let listOfPipes;
let generatePipeInterval;

let generatePipes = () => {
  generatePipeInterval = setInterval(() => {
    let pipe = new Pipe(pipeData);
    listOfPipes.push(pipe);
  }, 2500);
}


let wingSound = new Audio('./sounds/wing.wav');
let collisionSound = new Audio('./sounds/hit.wav');
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 32) {
    birdInstance.velocity = -5;
    wingSound.play();
  }
})

let pipeCollisionDetection = (pipeObject) => {
  if (birdInstance.y < 20 || (birdInstance.x < pipeObject.x + pipeObject.width &&
    birdInstance.x + spriteWidth > pipeObject.x &&
    birdInstance.y < pipeObject.y + pipeObject.pipeHeight &&
    birdInstance.y + singleSpriteHeight > pipeObject.y)
    ||
    (birdInstance.x < pipeObject.x + pipeObject.width &&
      birdInstance.x + spriteWidth > pipeObject.x &&
      birdInstance.y < pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP + pipeObject.pipeHeight &&
      birdInstance.y + singleSpriteHeight > pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP)) {
    collisionSound.play();

    gameStop();
  }

  // if (birdInstance.x < pipeObject.x + pipeObject.width &&
  //   birdInstance.x + spriteWidth > pipeObject.x &&
  //   birdInstance.y < pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP + pipeObject.pipeHeight &&
  //   birdInstance.y + singleSpriteHeight > pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP) {
  //   gameStop();
  // }
}


let groundCollisionDetection = () => {
  if (birdInstance.x < 0 + CANVAS_WIDTH &&
    birdInstance.x + spriteWidth > 0 &&
    birdInstance.y < CANVAS_HEIGHT &&
    birdInstance.y + singleSpriteHeight > CANVAS_HEIGHT - backgroundGround.height) {
    collisionSound.play();
    gameStop();
  }
}


let deletePipe = (pipeObject) => {
  if (pipeObject.x < -100) {
    listOfPipes.splice(listOfPipes.indexOf(pipeObject), 1);
  }
}

let score, highScore, scoreCalculationList;
let updateScore = (pipeObject) => {
  if (pipeObject.x + pipeObject.width <= birdInstance.x) {
    if (scoreCalculationList.indexOf(pipeObject) === -1) {
      scoreCalculationList.push(pipeObject);
    }
  }
  score = scoreCalculationList.length;
  if (score > localStorage.getItem('flappyHighScore')) {
    localStorage.setItem('flappyHighScore', score);
  }
}

let gameStop = () => {
  clearInterval(generatePipeInterval);
  window.cancelAnimationFrame(gameInit);
  gameOverCanvas();
}

let isGamePlaying,
  isGameOver;

let reset = () => {
  //Background.js Variables
  offset = 0;

  //Pipe.js Variables

  //Bird.js variables

  //Script.js Variables
  listOfPipes = [];
  scoreCalculationList = [];
  score = 0;
  isGamePlaying = false;
  isGameOver = false;
}

/**
 * CANVAS SETUP FOR SCORE
 */
let scoreCanvas = () => {
  ctx.font = '50px Flappy Bird';
  ctx.fillStyle = 'white';
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeText(`${score}`, CANVAS_WIDTH / 2, 180);
  ctx.fillText(`${score}`, CANVAS_WIDTH / 2, 180);
}


let startGameCanvas = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  backgroundImage.addEventListener('load', (e) => {
    ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = '60px Flappy Bird';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.textAlign = 'center'

    ctx.save();
    ctx.strokeText(`Flappy Bird`, CANVAS_WIDTH / 2, SCORE_OFFSET);
    ctx.fillText(`Flappy Bird`, CANVAS_WIDTH / 2, SCORE_OFFSET);
    ctx.restore();

    ctx.save();
    ctx.font = '24px Flappy Bird';
    ctx.fillStyle = 'black';
    ctx.fillText(`Use your spacebar to get started.`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.fillText(`Fly the bird as far as you can without hitting a pipe.`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    ctx.restore();
  })

  window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && !isGamePlaying) {
      startGame();
      isGamePlaying = true;
    }
  })
}

let scoreBoardImage = new Image(),
  restartButtonImage = new Image(),
  scoreSound = new Audio('./sounds/swoosh.wav');

scoreBoardImage.src = './images/score.png';
restartButtonImage.src = './images/restart.png';


let gameOverCanvas = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.font = '30px Flappy Bird';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.textAlign = 'center';


  ctx.save();
  ctx.drawImage(scoreBoardImage, CANVAS_WIDTH / 2 - scoreBoardImage.width / 2, CANVAS_HEIGHT / 2 - scoreBoardImage.height / 2 - 100);
  ctx.strokeText(`${score}`, CANVAS_WIDTH / 2, 265);
  ctx.fillText(`${score}`, CANVAS_WIDTH / 2, 265);
  ctx.strokeText(`${localStorage.getItem('flappyHighScore')}`, CANVAS_WIDTH / 2, 350);
  ctx.fillText(`${localStorage.getItem('flappyHighScore')}`, CANVAS_WIDTH / 2, 350);
  ctx.restore();

  ctx.save();
  ctx.strokeText(`Press R to Restart Game`, CANVAS_WIDTH / 2, 450);
  ctx.fillText(`Press R to Restart Game`, CANVAS_WIDTH / 2, 450);
  ctx.restore();

}



/**
 * CANVAS SETUP FOR HIGHSCORE
 */
// let highScoreCanvas = () => {
//   ctx.font = '24px Flappy Bird';
//   ctx.fillStyle = 'white';
//   ctx.strokeStyle = 'black';
//   ctx.lineWidth = 5;
//   ctx.strokeText(`High Score : ${localStorage.getItem('flappyHighScore') || 0}`, CANVAS_WIDTH / 2, SCORE_OFFSET);
//   ctx.fillText(`High Score : ${localStorage.getItem('flappyHighScore') || 0}`, CANVAS_WIDTH / 2, SCORE_OFFSET);
// }


let startGame = () => {
  reset();
  generatePipes();
  gameLoop();
}


startGameCanvas();




