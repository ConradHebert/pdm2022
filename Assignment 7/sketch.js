let pitch = 800;
let screen = 0;

// Set up Tone
let osc = new Tone.AMOscillator(pitch,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0,
  decay: 0.2,
  sustain: 0.8,
  release: 0.5
}).connect(pan);
osc.connect(ampEnv);

let freqLFO = new Tone.LFO(4, 1000, 1500).start();
freqLFO.connect(osc.frequency); 



function setup() {
  createCanvas(500, 500);
  initialImage = loadImage("initialImage.png");
  finalImage = loadImage("finalImage.png");
  pressedOnce = false;
}

function draw() {
  background(255);
  image(initialImage, 0, 0);
}

function mousePressed() {
  if(pressedOnce == false) {
    Tone.start();
    console.log('pressed');
    ampEnv.triggerAttackRelease('4n');
    osc.frequency.linearRampToValueAtTime(pitch-200,'+1');
    ampEnv.triggerAttackRelease('4n','1');
    initialImage = finalImage;
    pressedOnce = true;
  }
}