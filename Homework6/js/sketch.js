let slider;

const synth = new Tone.PluckSynth();
const drum = new Tone.MembraneSynth();
const metal = new Tone.MetalSynth(
{
	"frequency"  : 45,
	"envelope"  : 
  {
		"attack"  : 0.001,
		"decay"  : 0.4,
		"release"  : 0.2
	},
	"harmonicity"  : 0.5,
	"modulationIndex"  : 40,
	"resonance"  : 300,
	"octaves"  : 1.5
});
const reverb = new Tone.JCReverb(0.4);

synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);

let notes = 
{
  'a': 'C6',
  's': 'D6',
  'd': 'E6',
  'f': 'F6',
  'g': 'G6',
  'h': 'A6',
  'j': 'B6',
  'k': 'C7', 
  'l': 'D7'
}

function setup()
{
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;
  synth.triggerAttackRelease("C6", "8n")

  slider.on('change', (v) =>  
  {
    reverb.roomSize.value = v;
  }); 

}

function draw() 
{
  background("aqua");
  fill("black");
  textSize(15);
  textAlign(CENTER);
  text("Press A for C6", 50, 75);
  text("Press S for D6", 197, 75);
  text("Press D for E6", 345, 75);
  text("Press H for F6", 50,200);
  text("Press G for G6", 197,200);
  text("Press H for A6", 345, 200);
  text("Press J for B6", 50, 325);
  text("Press K for C7", 197, 325);
  text("Press L for D7", 345, 325);
  text("Use slider for reverb effect", 190, 375);
}

function keyPressed() 
{
  let toPlay = notes[key];
  console.log(toPlay);

  //synth.triggerAttackRelease("C6", "8n", 0.5);
  //metal.triggerAttackRelease("C6", "8n", "+0.5");
  drum.triggerAttackRelease("C6", "8n", "+1");
}
