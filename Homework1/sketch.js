function setup() 
{
  createCanvas(200, 200);
  colorMode(HSB);
}

function draw() 
{
  background(250, 150, 45);

  push();
  stroke(255);
  fill(120, 100, 50);
  ellipse(100, 100, 100, 100);
  pop();

  push();
  stroke(255);
  strokeWeight(3);
  fill(0, 100, 100);
  beginShape();
  vertex(150, 85);
  vertex(115, 85);
  vertex(100, 50);
  vertex(85, 85);
  vertex(50, 85);
  vertex(80, 105);
  vertex(70, 140);
  vertex(100, 120);
  vertex(130, 140);
  vertex(120, 105);
  endShape(CLOSE);
  pop();

}