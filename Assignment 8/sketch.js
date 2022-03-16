let time = 30;
let score = 0;
let bugCount = 30; 
let bugs = []; 
let speed = 5; 
let dir = [-1,1];
let screen = 0;
let clicks = 0;
let volume = 1;

let squish = new Tone.Player('1.mp3'); //squishing noise
let miss = new Tone.Player('2.mp3'); //missing a bug
let loss = new Tone.Player('3.mp3'); //when the game is lost
let win = new Tone.Player('4.mp3'); //when the game is won

function preload(){
  for(var i = 0; i < bugCount; i++) { 
    bugs[i] = new bug("bug.png", random(50, 610), random(70, 480), random(dir));
  }
}

function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  setInterval(clock, 1000);

  squish.toDestination();
  miss.toDestination();
  loss.toDestination();
  win.toDestination();

  const synth = new Tone.Synth().toDestination();
  synth.volume.value = volume; //to be incremented as clicks increase
  const loop = new Tone.Loop(time => {
    synth.triggerAttackRelease("C3", "8n", time);
  }, "4n").start(0);
  const loop2 = new Tone.Loop(time => {
    synth.triggerAttackRelease("D3", "8n", time + .25);
  }, "4n").start(0); //the background music for the game
}

function draw() {
  if(screen == 0){
    background(255);
    textSize(38);
    text('Bug Squish', 220, 250);
    textSize(22);
    text('-Click Anywhere to Start-', 190, 290);
    if(mouseIsPressed) {
      Tone.Transport.start()
      changeScreen(1);
    }
  }
  else if(screen == 1){
    if(score == 30) {
      changeScreen(2);
      win.start();
      Tone.Transport.stop();
    }
    if(time == 0){
      changeScreen(2);
      loss.start();
      Tone.Transport.stop();
    }
    background(255);
    textSize(24);
    text('Score:', 10, 30); 
    text('Time:', 530 , 30); 
    textSize(28);
    if(time > 0){
      text(time, 595 , 30); 
    }
    text(score, 85 , 30);
    for(var i = 0; i < bugCount; i++) {
        bugs[i].draw();
      }
  }
  else if(screen == 2){
    background(255);
    textSize(42);
    text('Game Over!', 200, 220);
    textSize(28);
    text('Score: ' + score, 250 , 250);
    textSize(22);
    textSize(14);
    ellipse(315, 375, 80, 40);
    text('Replay', 293, 380);
    if(mouseIsPressed){
      if(mouseX < 355 && mouseX > 275 && mouseY < 395 && mouseY > 355){
        changeScreen(0);
      }
    }
  }
}
function changeScreen(x){
  if(x == 0){
    screen = 0;
  }
  if(x == 1){
    screen = 1;
    time = 30;
    score = 0;
    bugs = [];
    speed = 5;
    preload();
  }
  if(x == 2){
    screen = 2; 
  }
}

function mouseClicked() {
  if(screen == 1){
    hit = false; //this tracks whether the click squished a bug or not, resetting upon each click
    clicks++;
    for(var i = 0; i < bugCount; i++) {
      bugs[i].squish(mouseX,mouseY);
    }
    speed += .4;
  }
  if((hit == 0) && (clicks > 1)) { //first click is ignored as it is the click that starts the game
    miss.start();
  }
  volume += 5; //this makes the background music louder as the game progresses
}

function clock() {
  if(time > 0){
    time--;
  }
}

function scorePlus() {
  score++;
  hit = true; //scorePlus is only called when a bug is squished. Thus, hit is 1, which stops the miss sound effect from playing
}

function bug(spriteSheet,x,y,moving) {
  this.spritesheet = loadImage(spriteSheet);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving;
  this.squished = false;
  this.draw = function() {
    push();
    translate(this.x,this.y);
    if(this.facing < 0) { 
      scale(-1.0,1.0);
    }
    if(this.squished == true) { 
        image(this.spritesheet,0,0,40,40,0,0,40,40);
    }
    else if(this.moving != 0) {
      if(this.frame == 0)
        image(this.spritesheet, 0, 0,40,40,40,0,40,40);
      if(this.frame == 1)
        image(this.spritesheet, 0, 0,40,40,80,0,40,40);
      if(this.frame == 2)
        image(this.spritesheet, 0, 0,40,40,120,0,40,40);
      if(this.frame == 3)
        image(this.spritesheet, 0, 0,40,40,160,0,40,40);
      if(this.frame == 4)
        image(this.spritesheet, 0, 0,40,40,200,0,40,40);
      if(this.frame == 5)
        image(this.spritesheet, 0, 0,40,40,240,0,40,40);

      if(frameCount % 4 == 0) {
        this.frame = (this.frame + 1) % 4;
        this.x = this.x + speed * this.moving;
        if(this.x < 40 || this.x > width-40) {
          this.moving = -this.moving;
          this.facing = -this.facing;
        }  
      }
    }
    pop();
  }

  this.squish = function(x,y) { 
    if((this.x-20 < x && x < this.x+20 &&
      this.y-20 < y && y < this.y+20) && this.squished == false) {
      squish.start();
      this.squished = true;
      scorePlus();
    }
  }
}