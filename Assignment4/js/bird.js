class Bird {
  constructor(bird) {
    this.x = bird.xPos;
    this.y = bird.yPos;
    this.gravity = GRAVITY;
    this.dx = 0;
    this.dy = 0;
    this.index = 0;
    this.velocity = bird.velocity;
    setInterval(() => {
      this.index++;
      if (this.index >= 8) {
        this.index = 0;
      }
    }, 150)
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(birdAnimation, 0, this.index * singleSpriteHeight, spriteWidth, singleSpriteHeight, this.x, this.y, spriteWidth, singleSpriteHeight);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }
}

let spriteWidth,
  spriteHeight,
  numOfRows,
  singleSpriteHeight;

birdAnimation = new Image();
birdAnimation.src = './images/flappy-sprite.png';

birdAnimation.addEventListener('load', (e) => {
  spriteWidth = birdAnimation.width;
  spriteHeight = birdAnimation.height;
  numOfRows = 8;

  singleSpriteHeight = spriteHeight / numOfRows;
});


