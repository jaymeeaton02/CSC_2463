//https://youtu.be/ScdflFivL5M

let spriteSheet;
let walkingAnimation;

let spriteSheetFilenames = ["Bug.png", "Butterfly.png", "Catepillar.png", "Ladybug.png"];
let spriteSheets = [];
let animations = [];

let sound1 = new Tone.Player("sound1/Squish.wav");
let sound2 = new Tone.Player("sound2/Wrong.wav");
let synth = new Tone.PolySynth().toDestination();
let dSynth = new Tone.PolySynth().toDestination();
const reverb = new Tone.JCReverb(0.4);

let port;
let writer;
let reader;
let button;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();
let led; 

const GameState = 
{
  Start: "Start",
  Playing1: "Playing1",
  Transition: "Transition",
  Playing2: "Playing2",
  GameOver: "GameOver"
};

let game = {score1: 0, score2: 0, maxScore1: 0, maxScore2: 0, maxTime1: 30, maxTime2: 30, elapsedTime1: 0, elapsedTime2: 0, totalSprites: 3, state: GameState.Start, targetSprite: 1};

function preload() 
{
  for(let i=0; i < spriteSheetFilenames.length; i++) 
  {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() 
{
  createCanvas(1450, 840);
  imageMode(CENTER);
  angleMode(DEGREES);

  if('serial' in navigator)
  {
    button = createButton("Connect");
    button.position(7, 7);
    button.mousePressed(connect); 
  }

  sound1.toDestination();
  sound2.toDestination();

  const notes1 = ["C4", "E5", "G4"];
  const notes2 = ["F3", "C4", "A3"];
  const notes3 = ["G4", "D4", "B3"];
  const durations1 = [0.0, 0.0, 0.0];
  const durations2 = [0.2, 0.2, 0.2];
  const durations3 = [0.4, 0.4, 0.4];
  const durations4 = [0.6, 0.6, 0.6];
  const durations5 = [0.8, 0.8, 0.8];
  const durations6 = [1.0, 1.0, 1.0];
  const durations7 = [1.2, 1.2, 1.2];
  const durations8 = [1.3, 1.3, 1.3];
  const durations9 = [1.4, 1.4, 1.4];


  const synth1 = new Tone.Synth().toDestination();
  const music1 = new Tone.Sequence((time, noteIndex) => 
  {
    synth1.triggerAttackRelease(notes1[noteIndex], durations1[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth2 = new Tone.MembraneSynth().toDestination();
  const music2 = new Tone.Sequence((time, noteIndex) => 
  {
    synth2.triggerAttackRelease(notes2[noteIndex], durations2[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth3 = new Tone.Synth().toDestination();
  const music3 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes1[noteIndex], durations3[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth4 = new Tone.MetalSynth().toDestination();
  const music4 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes3[noteIndex], durations4[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth5 = new Tone.Synth().toDestination();
  const music5 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes1[noteIndex], durations5[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth6 = new Tone.MembraneSynth().toDestination();
  const music6 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes2[noteIndex], durations6[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth7 = new Tone.Synth().toDestination();
  const music7 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes1[noteIndex], durations7[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth8 = new Tone.MetalSynth().toDestination();
  const music8 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes3[noteIndex], durations8[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );

  const synth9 = new Tone.Synth().toDestination();
  const music9 = new Tone.Sequence((time, noteIndex) => 
  {
    synth3.triggerAttackRelease(notes1[noteIndex], durations9[noteIndex], time);
  },
  [0, 1, 2],
  "4n"
  );
  

  music1.loop = true;
  music2.loop = true;
  music3.loop = true;
  music4.loop = true;
  music5.loop = true;
  music6.loop = true;
  music7.loop = true;
  music8.loop = true;
  music9.loop = true;
  music1.start(0.0);
  music2.start(0.0);
  music3.start(0.0);
  music4.start(0.0);
  music5.start(0.0);
  music6.start(0.0);
  music7.start(0.0);
  music8.start(0.0);
  music9.start(0.0);


  let pattern = new Tone.Pattern(function (time, note) 
  {
    synth.triggerAttackRelease(note, 0.25, time);
  }, 
  ['C4', ['D4', 'B3'], 'E4', 'G4']);
  
  const melody = new Tone.Sequence((time, note) => 
  {
    synth.triggerAttackRelease(note, 0.1, time);
  }, 
  ['E4', 'D5', 'C6', null, 'D5', 'E2', 'E3', 'E5', null]).start("0:0");

  let chords = 
  [
    {"time": "0:0", "note": ["C6", 'E3', "G4"]},
    {"time": "0:3", "note": ["F4", 'A4', "C4"]},
    {"time": "0:5", "note": ["G4", 'A5', "D4"]},
    {"time": "0:8", "note": ["G2", 'B3', "F2"]},
  ]
  
  let chord = new Tone.Part((time, notes)=>
  {
    dSynth.triggerAttackRelease(notes.note, '2n', time)
  }, 
  chords);
  
  const synthA = new Tone.FMSynth().toDestination();
  const synthB = new Tone.AMSynth().toDestination();

  const loopA = new Tone.Loop(time => 
  {
	  synthA.triggerAttackRelease("C2", "8n", time);
  },
  "4n").start(0);

  const loopB = new Tone.Loop(time => 
  {
    synthB.triggerAttackRelease("C4", "8n", time);
  },
  "4n").start("8n");

  chord.loop = 8;
  chord.start(0.0);
  pattern.start(0.0);

  const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.7,
    decay: 0.6,
    sustain: 0.5,
    release: 0.4
  })

  ampEnv.triggerAttackRelease(loopA);

  resetAll();
}

function resetMid()
{
  game.elapsedTime2 = 0;
  game.score2 = 0;
  game.totalSprites = random(300, 300);

  animations = [];
  for(let i = 0; i < game.totalSprites; i++) 
  {
    animations[i] = new WalkingAnimation(random(spriteSheets), 64, 64, random(0,1400), random(60,800), 6, random(1,5), 6, random([0,1]));
  }
}

function resetAll() 
{
  game.elapsedTime1 = 0;
  game.elapsedTime2 = 0;
  game.score1 = 0;
  game.score2 = 0;
  game.totalSprites = random(300, 300);

  animations = [];
  for(let i = 0; i < game.totalSprites; i++) 
  {
    animations[i] = new WalkingAnimation(random(spriteSheets), 64, 64, random(0,1400), random(60,800), 6, random(1,5), 6, random([0,1]));
  }
}

function draw() 
{
  switch(game.state) 
  {
    case GameState.Playing1:
      Tone.Transport.start();
      background(220);
      if(sensorData.inches > 0 && sensorData.inches <= 1)
      {
        background(0);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 2)
      {
        background(50);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 3)
      {
        background(100);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 4)
      {
        background(150);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 5)
      {
        background(220);
      }
  
      for(let i = 0; i < animations.length; i++) 
      {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score1, 600, 40);
      let currentTime1 = game.maxTime1 - game.elapsedTime1;
      text(ceil(currentTime1), 825, 40);
      game.elapsedTime1 += deltaTime / 1000;

      if (currentTime1 < 0)
      {
        game.state = GameState.Transition;
        Tone.Transport.stop();
      }
      break;

      case GameState.Playing2:
      Tone.Transport.start();

      background(220);
      if(sensorData.inches > 0 && sensorData.inches <= 1)
      {
        background(0);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 2)
      {
        background(50);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 3)
      {
        background(100);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 4)
      {
        background(150);
      }
      else if(sensorData.inches > 0 && sensorData.inches <= 5)
      {
        background(220);
      }
  
      for(let i = 0; i < animations.length; i++) 
      {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score2, 600, 40);
      let currentTime2 = game.maxTime2 - game.elapsedTime2;
      text(ceil(currentTime2), 825, 40);
      game.elapsedTime2 += deltaTime / 1000;

      if (currentTime2 < 0)
      {
        game.state = GameState.GameOver;
        Tone.Transport.stop();
      }
      break;

    case GameState.GameOver:
      game.maxScore1 = max(game.score1, game.maxScore1);
      game.maxScore2 = max(game.score2, game.maxScore2);
      background(0);
      fill("Cyan");
      textSize(35);
      textAlign(CENTER);
      text("Game Over!", 725, 375);
      textSize(25);
      text("Player 1 Score: " + game.score1, 725, 425);
      text("Player 2 Score: " + game.score2, 725, 475);
      text("Press Any Key to Restart!", 725, 525);
      break;

    case GameState.Start:
      background(0);
      fill("Cyan");
      textSize(35);
      textAlign(CENTER);
      text("Butterfly Squish Game", 725, 325);
      text("Player 1", 725, 375);
      textSize(27);
      text("Squash bugs by clicking on them!", 720, 450);
      text("Goal of the game is to squash more butterflies than your opponent!", 700, 485);
      text("Press Any Key to Start Game!", 725, 600);
      break;

    case GameState.Transition:
      background(0);
      fill("Cyan");
      textSize(35);
      textAlign(CENTER);
      text("Butterfly Squish Game", 725, 325);
      text("Player 2", 715, 375);
      textSize(27);
      text("Squash bugs by clicking on them.", 720, 450);
      text("Goal of the game is to squash more butterflies than your opponent!", 700, 485);
      text("Press Any Key to Start Game!", 725, 600);
      break;
  } 

  if ((frameCount % 60) === 0) 
  {
    pitch = random(300, 1000);
  }

  if(reader)
  {
    serialRead();
  }
}

function keyPressed() 
{
  switch(game.state) 
  {
    case GameState.Start:
      game.state = GameState.Playing1;
      break;
    case GameState.Transition:
      resetMid();
      game.state = GameState.Playing2;
      break;
    case GameState.GameOver:
      resetAll();
      game.state = GameState.Playing1;
      break;
  }
}

function mousePressed() 
{
  switch(game.state) 
  {
    case GameState.Playing1:
      for (let i = 0; i < animations.length; i++) 
      {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) 
        {
          if (animations[i].moving != 0) 
          {
            animations[i].stop();
            if(animations[i].spritesheet === spriteSheets[game.targetSprite])
            {
              game.score1 += 1;
              sound1.start();
              led = 1;
              serialWrite(led);
            }
            else
            {
              if(game.score1 <= 0)
              {
                game.score1 == 0;
              }
              else
              {
                game.score1 -= 1;
                led = 2;
                serialWrite(led);
              }
              sound2.start();
            }
          }
          else 
          {
            if (animations[i].xDirection === 1)
            {
              animations[i].moveRight();
            }
            else
            {
              animations[i].moveLeft();
            }          
          }
        }
      }
      break;

  case GameState.Playing2:
      for (let i = 0; i < animations.length; i++) 
      {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) 
        {
          if (animations[i].moving != 0) 
          {
            animations[i].stop();
            if(animations[i].spritesheet === spriteSheets[game.targetSprite])
            {
              game.score2 += 1;
              sound1.start();
              led = 1;
              serialWrite(led);
            }
            else
            {
              if(game.score2 <= 0)
              {
                game.score2 == 0;
              }
              else
              {
                game.score2 -= 1;
                led = 2;
                serialWrite(led);
              }
              sound2.start();
            }
          }
          else 
          {
            if (animations[i].xDirection === 1)
            {
              animations[i].moveRight();
            }
            else
            {
              animations[i].moveLeft();
            }          
          }
        }
      }
      break;
  }
}

class WalkingAnimation 
{
  constructor(spritesheet, sw, sh, x, y, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) 
  {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.x = x;
    this.y = y;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  draw() 
  {
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.x,this.y);
    if(this.vertical)
    {
      rotate(90);
    }
    scale(this.xDirection,1);

    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u*this.sw+this.offsetX, this.v*this.sh+this.offsetY, this.sw, this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) 
    {
      this.currentFrame++;
    }
  
    if (this.vertical) 
    {
      this.y += this.moving*this.speed;
      this.move(this.y,this.sw / 4,height - this.sw / 4);
    }
    else 
    {
      this.x += this.moving*this.speed;
      this.move(this.x,this.sw / 4,width - this.sw / 4);
    }
  }

  move(position,lowerBounds,upperBounds) 
  {
    if (position > upperBounds) 
    {
      this.moveLeft();
    } 
    else if (position < lowerBounds) 
    {
      this.moveRight();
    }
  }

  moveRight() 
  {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() 
  {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  keyPressed(right, left) 
  {
    if (keyCode === right) 
    { 
      this.currentFrame = 1;
    } 
    else if (keyCode === left) 
    {
      this.currentFrame = 1;
    }
  }

  keyReleased(right,left) 
  {
    if (keyCode === right || keyCode === left) 
    {
      this.moving = 0;
    }
  }

  contains(x,y) 
  {
    let insideX = x >= this.x - 26 && x <= this.x + 25;
    let insideY = y >= this.y - 35 && y <= this.y + 35;
    return insideX && insideY;
  }

  stop() 
  {
    this.moving = 0;
    this.u = 6; 
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

function serialWrite(jsonObject)
{
  if(writer)
  {
    writer.write(encoder.encode(JSON.stringify(jsonObject) + "\n"));
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