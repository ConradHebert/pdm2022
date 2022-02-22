let player1, player2, player3, player4;
let distort;
let distLevel = 0.0;
let sliderX = 120, sliderY = 510;

function preload(){

  distort = new Tone.Distortion(distLevel).toDestination();
  player1 = new Tone.Player("1.mp3").connect(distort);
  player2 = new Tone.Player("2.mp3").connect(distort);
  player3 = new Tone.Player("3.mp3").connect(distort);
  player4 = new Tone.Player("4.mp3").connect(distort);
}

function setup() {
  createCanvas(750, 750);

  button1 = createButton('Play');
  button2 = createButton('Play');
  button3 = createButton('Play');
  button4 = createButton('Play');

  button1.position(125, 250);
  button2.position(275, 250);
  button3.position(425, 250);
  button4.position(575, 250);

  button1.mousePressed(play1);
  button2.mousePressed(play2);
  button3.mousePressed(play3);
  button4.mousePressed(play4);

  button1 = createButton('Stop');
  button2 = createButton('Stop');
  button3 = createButton('Stop');
  button4 = createButton('Stop');

  button1.position(125, 280);
  button2.position(275, 280);
  button3.position(425, 280);
  button4.position(575, 280);

  button1.mousePressed(stop1);
  button2.mousePressed(stop2);
  button3.mousePressed(stop3);
  button4.mousePressed(stop4);
}


function draw() {

  background(255);

  fill(255);
  rect(100, 200, 100, 200);
  rect(250, 200, 100, 200);
  rect(400, 200, 100, 200);
  rect(550, 200, 100, 200);
  fill(0);
  
  textSize(48);
  text('Audio Sampler', 225, 100);
  textSize(32);

  textSize(18);
  text('Distortion Slider', 300, 460);

  textSize(12);
  text('Shot', 120, 220);
  text('Through', 270, 220);
  text('The Heart', 420, 220);
  text('And Youre', 570, 220);

  rect(100, 480, 5, 60);
  rect(640, 480, 5, 60);
  line(100, 510, 640, 510);

  ellipse(sliderX, sliderY, 30, 30);

  if(mouseIsPressed){

    if(mouseY < sliderY + 60 && mouseY > sliderY - 60
    && mouseX < 625 && mouseX > 120){
      sliderX = mouseX;
    }
    if(mouseY < sliderY + 60 && mouseY > sliderY - 60
      && mouseX > 625){
        sliderX =  625;
    }
    if(mouseY < sliderY + 60 && mouseY > sliderY - 60
      && mouseX < 120){
        sliderX =  120;
    }

    distortion();
  }
}

function distortion(){

    if(sliderX >= 115 && sliderX <= 166){
      distLevel = 0.0;
      distort.distortion = distLevel;
    }
    if(sliderX > 166  && sliderX <= 217){
      distLevel = 0.1;
      distort.distortion = distLevel;
    }
    if(sliderX > 217 && sliderX <= 268){
      distLevel = 0.2;
      distort.distortion = distLevel;
    }
    if(sliderX > 268 && sliderX <= 319){
      distLevel = 0.3;
      distort.distortion = distLevel;
    }
    if(sliderX > 319 && sliderX <= 370){
      distLevel = 0.4;
      distort.distortion = distLevel;
    }
    if(sliderX > 370 && sliderX <= 421){
      distLevel = 0.5;
      distort.distortion = distLevel;
    }
    if(sliderX > 421 && sliderX <= 472){
      distLevel = 0.6;
      distort.distortion = distLevel;
    }
    if(sliderX > 472 && sliderX <= 523){
      distLevel = 0.7;
      distort.distortion = distLevel;
    }
    if(sliderX > 523 && sliderX <= 574){
      distLevel = 0.8;
      distort.distortion = distLevel;
    }
    if(sliderX > 574 && sliderX <= 625){
      distLevel = 0.9;
      distort.distortion = distLevel;
    } 
}

function play1(){
  player1.start();
}

function stop1(){
  player1.stop();
}

function play2(){
  player2.start();
}

function stop2(){
  player2.stop();
}

function play3(){
  player3.start();
}

function stop3(){
  player3.stop();
}

function play4(){
  player4.start();
}

function stop4(){
  player4.stop();
}
