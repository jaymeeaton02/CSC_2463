let sounds = new Tone.Players({
  "Applause": "sounds/Applause.wav",
  "Boo": "sounds/Boo.wav",
  "Laugh": "sounds/Laugh.wav",
  "Whistle": "sounds/Whistle.wav",
  "Yawn": "sounds/Yawn.wav"
})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["Applause", "Boo", "Laugh", "Whistle", "Yawn"];
let buttons = [];

function setup() 
{
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => 
  {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => 
  {
    delay.feedback.value = fSlider.value();
  })
}

function draw() 
{
  background("cyan");
  //fill("white");
  textSize(20);
  textAlign(CENTER);
  text("Press Buttons for Sound", 200, 300)
}

function buttonSound(whichSound)
{
    sounds.player(whichSound).start()
}