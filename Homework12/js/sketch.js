let x = 0;
let y = 0;
let z = 0;

//let sound1 = new Tone.Player("sound1/Paint.wav");
//let sound2 = new Tone.Player("sound2/Dip.wav")

let port;
let writer, reader;
let sliderLED;
let red, green;
let joySwitch;
let sensorData = {};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function setup() 
{
 createCanvas(600, 600);

 if ("serial" in navigator) 
 {
   let button = createButton("Connect");
   button.position(580, 10);
   button.mousePressed(connect);

   sliderLED = createSlider(0, 255, 0);
   sliderLED.position(250, 600);
   sliderLED.style("width", "200px");
 }
}

function draw() 
{
  background(255);

  if (reader) 
  {
    serialRead();
  }

  if (writer) 
  {
    writer.write(encoder.encode(red + "," + green + "," + joySwitch + "\n"))
    writer.write(new Uint8Array([ sliderLED.value() ]));
  }

  joySwitch = sensorData.Switch;
  red = sensorData.Xaxis;
  green = sensorData.Yaxis;

  //text("Joystick Switch: " + sensorData.Switch, 150, 150);
  //text("Joystick X-axis: " + sensorData.Xaxis, 150, 175);
  //text("Joystick Y-axis: " + sensorData.Yaxis, 150, 200);

  push();
  noFill();
  circle(map(red, 0, 255, 0, width), map(green, 0, 255, 0, height), 10);
  pop();

  textSize(17);
  textAlign(CENTER);
  text('Press Paint to initialize audio!', 300, 585);
  fill(0);

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


async function serialRead() 
{
 while (true) 
 {
   const { value, done } = await reader.read();
   if (done) 
   {
     reader.releaseLock();
     break;
   }
   sensorData = JSON.parse(value);
 }
}


async function connect() 
{
 port = await navigator.serial.requestPort();
 await port.open({ baudRate: 9600 });
 writer = port.writable.getWriter();
 reader = port.readable
   .pipeThrough(new TextDecoderStream())
   .pipeThrough(new TransformStream(new LineBreakTransformer()))
   .getReader();
}

class LineBreakTransformer 
{
 constructor() 
 {
   this.chunks = "";
 }

 transform(chunk, controller) 
 {
   this.chunks += chunk;
   const lines = this.chunks.split("\n");
   this.chunks = lines.pop();
   lines.forEach((line) => controller.enqueue(line));
 }

 flush(controller) 
 {
   controller.enqueue(this.chunks);
 }
}

function joystickPressed()
{
  strokeWeight(5);
  stroke(x, y, z);
  if(mouseX >= 50)
  {
    //line(mouseX, mouseY, pmouseX, pmouseY);
    //sound1.playbackRate = (mouseY / 200) + 0.001;
    //sound1.start();
  }

  if(joystick.pressed == 1)
  {
    x = 255, y = 0, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 2)
  {
    x = 255, y = 127, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 3)
  {
    x = 255, y = 255, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 4)
  {
    x = 0, y = 255, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 5)
  {
    x = 0, y = 255, z = 255;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 6)
  {
    x = 0, y = 0, z = 255;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 7)
  {
    x = 255, y = 0, z = 255;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 8)
  {
    x = 150, y = 75, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 9)
  {
    x = 255, y = 255, z = 255;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
  else if(joystick.pressed == 10)
  {
    x = 0, y = 0, z = 0;
    //sound2.playbackRate = (mouseY / 200) + 0.001;
    //sound2.start();
  }
}