class Pipe {
  constructor(pipe) {
    this.x = pipe.xPos;
    this.y = pipe.yPos;
    this.width = pipeImage.width;
    this.pipeHeight = generateRandomNumber(PIPE_OFFSET,
      CANVAS_HEIGHT - backgroundGround.height - BIRD_PASS_GAP - PIPE_OFFSET);
  }

  draw() {
    ctx.beginPath();

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.pipeHeight / 2);
    ctx.rotate(Math.PI);
    ctx.translate(-this.x - this.width / 2, -this.y - this.pipeHeight / 2)
    ctx.drawImage(pipeImage, this.x, this.y);
    ctx.restore();

    ctx.save();
    ctx.translate(this.x, 0)
    let pipeBodyDown = ctx.createPattern(pipeImageBodyDown, 'repeat-y');
    ctx.fillStyle = pipeBodyDown;
    ctx.fillRect(0, 0, this.width, this.pipeHeight - pipeImage.height);
    ctx.restore();

    ctx.save();
    ctx.translate(this.x, this.pipeHeight + BIRD_PASS_GAP);
    let pipeBodyUp = ctx.createPattern(pipeImageBodyUp, 'repeat-y');
    ctx.fillStyle = pipeBodyUp;
    ctx.fillRect(0, 0, this.width, CANVAS_HEIGHT - this.pipeHeight - BIRD_PASS_GAP - backgroundGround.height);
    ctx.restore();

    ctx.drawImage(pipeImage, this.x, this.y + this.pipeHeight + BIRD_PASS_GAP);
    ctx.closePath();
  }

  update() {
    this.x -= PIPE_SPEED;
  }
}

let pipeImage = new Image();
pipeImage.src = './images/pipe-head.png';

let pipeImageBodyUp = new Image();
pipeImageBodyUp.src = './images/pipe-body-up.png';

let pipeImageBodyDown = new Image();
pipeImageBodyDown.src = './images/pipe-body-down.png';