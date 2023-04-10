let port;
let writer;
let reader;
let slider;
let button;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

function setup()
{
  createCanvas(400, 400);

  if('serial' in navigator)
  {
    button = createButton("Connect");
    button.position(7, 7);
    button.mousePressed(connect);

    slider = createSlider(0, 255, 0);
    slider.position(10,50);
    slider.style('width', '100px'); 
  }
}

function draw() 
{
  background("aqua");

  if(reader)
  {
    serialRead();
  }

  if(writer && frameCount % 5 === 0)
  {
    writer.write(encoder.encode(red + "," + green + "," + blue + "\n"))
  }

  if(sensorData.inches > 0 && sensorData.inches <= 1)
  {
    background("red");
  }
  else if(sensorData.inches > 1 && sensorData.inches <= 2)
  {
    background("orange");
  }
  else if(sensorData.inches > 2 && sensorData.inches <= 3)
  {
    background("yellow");
  }
  else if(sensorData.inches > 3 && sensorData.inches <= 4)
  {
    background("green");
  }
  else if(sensorData.inches > 4 && sensorData.inches <= 5)
  {
    background("blue");
  }
  else if(sensorData.inches > 5 && sensorData.inches <= 6)
  {
    background("purple");
  }
  else
  {
    background("aqua");
  }
}

async function serialRead()
{
  while(true)
  {
    const { value, done } = await reader.read();
    if (done) 
    {
      reader.releaseLock();
      break;
    }
    console.log(value);
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