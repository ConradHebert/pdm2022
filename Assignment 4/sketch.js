
var time = 30;
var score = 0;
var bugCount = 30; 
var bugs = []; 
var speed = 5; 
var dir = [-1,1];
var screen = 0;

function preload(){
  for(var i = 0; i < bugCount; i++) { 
    bugs[i] = new bug("bug.png", random(50, 610), random(70, 480), random(dir));
  }
}

function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  setInterval(clock, 1000);
}

function draw() {
  if(screen == 0){
    background(255);
    textSize(38);
    text('Bug Squish', 220, 250);
    textSize(22);
    text('-Click Anywhere to Start-', 190, 290);
    if(mouseIsPressed){
      changeScreen(1);
    }
  }
  else if(screen == 1){
    if(score == 30){
      changeScreen(2);
    }
    if(time == 0){
      changeScreen(2);
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
    for(var i = 0; i < bugCount; i++) {
      bugs[i].squish(mouseX,mouseY);
    }
    speed += .4;
  }
}

function clock() {
  if(time > 0){
    time--;
  }
}

function scorePlus(){
  score++;
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
      this.squished = true;
      scorePlus();
    }
  }
}