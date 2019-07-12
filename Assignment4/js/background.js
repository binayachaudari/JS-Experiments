let backgroundImage = new Image(),
  backgroundGround = new Image();

let offset;

backgroundGround.src = './images/ground.png';

let backgroundDraw = () => {
  ctx.beginPath();
  ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - backgroundGround.height);
  ctx.save();

  let ground = ctx.createPattern(backgroundGround, 'repeat-x');
  ctx.fillStyle = ground;
  ctx.translate(-offset, CANVAS_HEIGHT - backgroundGround.height);
  ctx.fillRect(0, 0, CANVAS_WIDTH + GROUND_OFFSET, backgroundGround.height);

  ctx.restore();
  ctx.closePath();
}

let groundUpdate = () => {
  offset += 1.5;
  if (offset > GROUND_OFFSET) {
    offset = 0;
  }
}