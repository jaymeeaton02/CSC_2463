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
  background(220);
}

function keyPressed() 
{
  let toPlay = notes[key];
  console.log(toPlay);

  //synth.triggerAttackRelease("C6", "8n", 0.5);
  //metal.triggerAttackRelease("C5", "8n", "+0.5");
  drum.triggerAttackRelease("C4", "8n", "+1");
}