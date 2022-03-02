const synth = new Tone.PolySynth().toDestination();

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);
  synth.volume.value = 10;
  duration = 0.5;
}

function draw() {
  background(255);
  textSize(25);

  text("Volume", 128, 65);
  text('(' + synth.volume.value + ')', 145, 95);
  button1 = createButton ("-10");
  button1.position(100, 100);
  button2 = createButton ("+10");
  button2.position(200, 100);
  button1.mousePressed(subVolume);
  button2.mousePressed(addVolume);

  text("Duration", 125, 260);
  text('(' + duration + ')', 145, 290);
  button3 = createButton ("-0.5");
  button3.position(100, 300);
  button4 = createButton ("+0.5");
  button4.position(200, 300);
  button3.mousePressed(durationDown);
  button4.mousePressed(durationUp);

}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, duration);
}

function subVolume() {
  synth.volume.value = (synth.volume.value - 10);
  if (synth.volume.value < 0)
  synth.volume.value = 0;
}

function addVolume() {
  synth.volume.value = (synth.volume.value + 10);
  if (synth.volume.value > 20)
    synth.volume.value = 20;
}

function durationDown() {
  duration = (duration - 0.5);
  if(duration == 0)
    duration = duration + 0.5;
    //if duration hits 0 or lower things get funky, 
    //this is a way to prevent the value ever being 
    //lower than 0.5
}

function durationUp() {
  duration = (duration + 0.5);
}