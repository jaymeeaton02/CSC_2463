let haunted;
let x = 200;
let y = 200;
let r = 0;

let initTone = true;
let pitch = 600;

let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope
({
  attack: 7.2,
  decay: 5.00,
  sustain: 0.0,
  release: 107.00
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope
({
  attack: 7.2,
  decay: 5.00,
  sustain: 0.0,
  release: 107.00
}).connect(gain);

let noiseFilter = new Tone.Filter(800, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter);

function preload()
{
  haunted = loadImage("assets/hauntedHouse.jpeg");
}

function setup()
{
  createCanvas(1600, 900);
}

function draw() 
{
  if ((frameCount % 60) === 0) 
  {
    pitch = random(300, 1000);
  }

  fill(255);
  textSize(17);
  textAlign(CENTER);

  text('Press Spacebar to initialize audio!', 200, 150);
  text('Press mouse/keypad to continue audio!', 200, 250);
}

function keyPressed()
{
  scale(0.5,0.5);
  image(haunted,0,0, 1600, 842);

  if(keyCode == 32 && initTone == true)
  {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed()   
{
  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
  osc.frequency.setValueAtTime(pitch + 200, "+1");
  ampEnv.triggerAttackRelease('4n', '+1');

  if (mouseY > 200) 
  {
    noiseEnv.triggerAttackRelease(0.5);
  }
}