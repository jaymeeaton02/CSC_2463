let greenQ;
let purpleQ;
let yellowM;
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;
let walkingAnimation4;
let walkingAnimation5;
let walkingAnimation6;
let walkingAnimation7;
let walkingAnimation8;
let walkingAnimation9;

function preload()
{
  greenQ = loadImage("assets/GreenQueen.png");
  purpleQ = loadImage("assets/PurpleQueen.png");
  yellowM = loadImage("assets/YellowMan.png");
}

function setup() 
{
  createCanvas(800, 600);
  walkingAnimation = new WalkingAnimation(greenQ, 80, 80, 0, 0, 9);
  walkingAnimation2 = new WalkingAnimation(yellowM, 80, 80, 0, 250, 9);
  walkingAnimation3 = new WalkingAnimation(purpleQ, 80, 80, 0, 500, 9);
  walkingAnimation4 = new WalkingAnimation(greenQ, 80, 80, 250, 250, 9);
  walkingAnimation5 = new WalkingAnimation(yellowM, 80, 80, 250, 500, 9);
  walkingAnimation6 = new WalkingAnimation(greenQ, 80, 80, 500, 500, 9);
  walkingAnimation7 = new WalkingAnimation(purpleQ, 80, 80, 500, 250, 9);
  walkingAnimation8 = new WalkingAnimation(purpleQ, 80, 80, 250, 0, 9);
  walkingAnimation9 = new WalkingAnimation(yellowM, 80, 80, 500, 0, 9);
}

function draw() 
{
  background(220);

  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
  walkingAnimation4.draw();
  walkingAnimation5.draw();
  walkingAnimation6.draw();
  walkingAnimation7.draw();
  walkingAnimation8.draw();
  walkingAnimation9.draw();
}

function keyPressed()
{
  walkingAnimation.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation2.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation4.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation5.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation6.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation7.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation8.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation9.keyPressed(RIGHT_ARROW, LEFT_ARROW);
}

function keyReleased()
{
  walkingAnimation.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation2.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation4.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation5.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation6.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation7.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation8.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation9.keyReleased(RIGHT_ARROW, LEFT_ARROW);
}

class WalkingAnimation
{
  constructor(spriteSheet, sw, sh, x, y, animationLength)
  {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.x = x;
    this.y = y;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw()
  {
    if(this.moving != 0)
    {
      this.u = this.currentFrame % this.animationLength;
    }
    else
    {
      this.u = 0;
    }

    push();
    translate(this.x, this.y);
    scale (this.xDirection, 1);
    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u*this.sw, this.v*this.sh, this.sw, this.sh);
    pop();

    if(frameCount % 6 == 0)
    {
      this.currentFrame++;
    }

    this.x += this.moving;
  }

  keyPressed(right, left)
  {
    if(keyCode == right)
    {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 0;
    }
    else if(keyCode == left)
    {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 0;
    }
  }

  keyReleased(right, left)
  {
    if(keyCode == right || keyCode == left)
    {
      this.moving = 0;
    }
  }
}