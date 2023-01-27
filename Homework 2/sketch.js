let x = 0;
let y = 0;
let z = 0;

function setup() 
{
  createCanvas(600, 600);
  background(255, 255, 255);
}

function draw() 
{
  frameRate(1000);
  strokeWeight(1);
  stroke(255, 255, 255);
  noFill();

  fill("red");
  rect(0, 0, 50, 50);
  fill("orange");
  rect(0, 50, 50, 50);
  fill("yellow");
  rect(0, 100, 50, 50);
  fill("green");
  rect(0, 150, 50, 50);
  fill("cyan");
  rect(0, 200, 50, 50);
  fill("blue");
  rect(0, 250, 50, 50);
  fill("magenta");
  rect(0, 300, 50, 50);
  fill("brown");
  rect(0, 350, 50, 50);
  fill("white");
  rect(0, 400, 50, 50);
  fill("black");
  rect(0, 450, 50, 50);
}

function mouseDragged()
{
  strokeWeight(5);
  stroke(x, y, z);
  if(mouseX >= 50)
  {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed()
{
  if(mouseX <= 50 && mouseY <= 50)
  {
    x = 255, y = 0, z = 0;
  }
  else if(mouseX <= 40 && mouseY > 50 && mouseY < 100)
  {
    x = 255, y = 127, z = 0;
  }
  else if(mouseX <= 40 && mouseY > 100 && mouseY < 150)
  {
    x = 255, y = 255, z = 0;
  }
  else if(mouseX <= 40 && mouseY > 150 && mouseY < 200)
  {
    x = 0, y = 255, z = 0;
  }
  else if(mouseX <= 40 && mouseY > 200 && mouseY < 250)
  {
    x = 0, y = 255, z = 255;
  }
  else if(mouseX <= 40 && mouseY > 250 && mouseY < 300)
  {
    x = 0, y = 0, z = 255;
  }
  else if(mouseX <= 40 && mouseY > 300 && mouseY < 350)
  {
    x = 255, y = 0, z = 255;
  }
  else if(mouseX <= 40 && mouseY > 350 && mouseY < 400)
  {
    x = 150, y = 75, z = 0;
  }
  else if(mouseX <= 40 && mouseY > 400 && mouseY < 450)
  {
    x = 255, y = 255, z = 255;
  }
  else if(mouseX <= 40 && mouseY > 450 && mouseY < 500)
  {
    x = 0, y = 0, z = 0;
  }
}