let time = 30;
let score = 0;
let beeCount = 5; 
let bees = []; 
let mediumBees = [];
let hardBees = [];
let speed = 5; 
let dir = [-1,1];
let screen = 0;
let clicks = 0;
let difficulty;
let lives = 3;
let honeyPot1NotCollected = 1;
let honeyPot2NotCollected = 1;
let honeyPot3NotCollected = 1;
let serialPDM;
let portName = "COM4";
let sensors;
let joystickMode = 'OFF';
let bearLockOutCD = 0;
let tempTime;
let ding = new Tone.Player('Ding.mp3');
let collision = new Tone.Player('Collision.mp3');
let loss = new Tone.Player('Loss.mp3');
let win = new Tone.Player('Win.mp3');
const distortion = new Tone.Distortion(1).toDestination();

function preload() {
  spriteSheet = loadImage("Bear.png");
  honey = loadImage("Honey.png");
  for(var i = 0; i < beeCount; i++) { 
    bees[i] = new Bee("Bee.png", random(50, 590), random(70, 400), random(dir));
    mediumBees[i] = new Bee("Bee.png", random(50, 590), random(70, 400), random(dir));
    hardBees[i] = new Bee("Bee.png", random(50, 590), random(70, 400), random(dir));
  }
}

function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);
  setInterval(clock, 1000);

  bear = new Character(spriteSheet, 320, 450);

  ding.connect(distortion);
  collision.toDestination();
  loss.toDestination();
  win.toDestination();

  const synth = new Tone.Synth().toDestination();
  const loop = new Tone.Loop(time => {
    synth.triggerAttackRelease("C3", "8n", time);
  }, "4n").start(0);
  const loop2 = new Tone.Loop(time => {
    synth.triggerAttackRelease("D3", "8n", time + .25);
  }, "4n").start(10);
  const loop3 = new Tone.Loop(time => {
    synth.triggerAttackRelease("E3", "8n", time + .3);
  }, "4n").start(20);
  const loop4 = new Tone.Loop(time => {
    synth.triggerAttackRelease("F3", "8n", time + .35);
  }, "4n").start(25); //the game time progressing adds more notes to the background music 

  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
}

function draw() {
  if(screen == 0) { //title screen
    background(250);
    textSize(38);
    text('Honey Grab', 220, 250);
    textSize(22);
    text('-Press any Key to Start-', 205, 290);
    if(keyIsPressed == true) {
      changeScreen(1);
    }
  }
  if(screen == 1) { //difficulty select screen
    background(250);
    textSize(38);
    fill(255);
    rect(267, 60, 90, 50);
    rect(267, 210, 140, 50);
    rect(75, 225, 145, 50);
    rect(267, 360, 90, 50);

    fill(0);
    text('Easy', 270, 100);
    text('Medium', 270, 250);
    text('Hard', 270, 400);
    textSize(22);
    text('Joystick Mode: ', 75, 250);
    text(joystickMode, 120, 270);


    if(mouseIsPressed) {
      if(mouseX > 266 && mouseX < 357 && mouseY > 59 && mouseY < 110) {
        difficulty = 'Easy';
        changeScreen(2);
        Tone.Transport.start()
      }
      if(mouseX > 266 && mouseX < 407 && mouseY > 209 && mouseY < 260) {
        difficulty = 'Medium';
        changeScreen(2);
        Tone.Transport.start()
      }
      if(mouseX > 266 && mouseX < 357 && mouseY > 359 && mouseY < 410) {
        difficulty = 'Hard';
        changeScreen(2);
        Tone.Transport.start()
      }
      if(mouseX > 74 && mouseX < 219 && mouseY > 224 && mouseY < 274) {
          joystickMode = 'ON';
      }
    } 
  }
  if(screen == 2) { //the main game screen
    noCursor();
    background(250);
    textSize(24);
    text('Score:' + score, 10, 30); 
    text('Difficulty: ' + difficulty, 10, 50);
    text('Time:' + time, 515 , 30); 
    text('Lives: ' + lives, 520, 50);
    if(honeyPot1NotCollected == 1) {
      image(honey, 560, 200, 40, 40, 0, 0, 184, 214);
    }
    if(honeyPot2NotCollected == 1) {
      image(honey, 320, 100, 40, 40, 0, 0, 184, 214);
    }
    if(honeyPot3NotCollected == 1) {
      image(honey, 80, 300, 40, 40, 0, 0, 184, 214);
    }
    bear.draw();
    joystickSensitivity();
    if (tempTime - 1 > time) {
      bearLockOutCD = 0;
    }
    for(var i = 0; i < beeCount; i++) {
      bees[i].draw();
      if(difficulty == 'Medium') {
        mediumBees[i].draw();
      }
      if(difficulty == 'Hard') {
        mediumBees[i].draw();
        hardBees[i].draw();
      }
     }
     if(time == 0 || lives == 0) {
       Tone.Transport.stop();
       changeScreen(3);
       loss.start();
     }
     if(score == 3) {
       Tone.Transport.stop();
       changeScreen(4);
       win.start();
     }
  }
  if(screen == 3) { //loss screen
    cursor();
    background(250);
    textSize(38);
    text('You Lost!', 220, 250);
    textSize(22);
    text('-Click Anywhere to Restart-', 170, 290);
    if(mouseIsPressed) {
      changeScreen(0);
    }
  }
  if(screen == 4) { //win screen
    cursor();
    background(250);
    textSize(38);
    text('You Win!', 220, 250);
    textSize(22);
    text('-Click Anywhere to Restart-', 170, 290);
    if(mouseIsPressed) {
      changeScreen(0);
    }
  }

}

function clock() {
  if(time > 0) {
    time--;
  }
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    bear.go(1);
  }
  if(keyCode == LEFT_ARROW) {
    bear.go(-1);
  }
  if(keyCode == UP_ARROW) {
    bear.up(-1);
  }
  if(keyCode == DOWN_ARROW) {
    bear.up(1);
  }
}

function joystickSensitivity() {
  if(joystickMode == 'ON' && bearLockOutCD == 0) {
    if(sensors.a2 > 200) {
      bear.go(1);
    }
    if(sensors.a2 < -400) {
      bear.go(-1);
    }
    if(sensors.a1 > 400) {
      bear.up(1);
    }
    if(sensors.a1 < -400) {
      bear.up(-1);
    }
    if(sensors.a2 < 400 && sensors.a2 > -400) {
      bear.moveX = 0;
    }
    if(sensors.a1 < 400 && sensors.a1 > -400) {
      bear.moveY = 0;
    }
  }
}


function keyReleased() {
  bear.stop();
}

//function that handles screen changes and properly resets the game with each restart
function changeScreen(x) {
  if(x == 0) {
    screen = 0;
  }
  if(x == 1) {
    screen = 1;
  }
  if(x == 2) {
    screen = 2;
    time = 30;
    score = 0;
    bugs = [];
    speed = 5;
    lives = 3;
    honeyPot1NotCollected = 1;
    honeyPot2NotCollected = 1;
    honeyPot3NotCollected = 1;
    bear.x = 320;
    bear.y = 450;
    bearLockOutCD = 0;
    preload();
  }
  if(x == 3) {
    screen = 3;
    joystickMode = 'OFF';
  }
  if(x == 4) {
    screen = 4;
    joystickMode = 'OFF';
  }
}

class Character {
  constructor(spriteSheet, x, y) {
    this.spriteSheet = spriteSheet;
    this.frame = 0;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.moveX = 0;
    this.moveY = 0;
    this.facing = 1;
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
  
    if (this.moveX == 0 && this.moveY == 0) {
      image(this.spriteSheet, 0, 0, 100, 100, 0, 0, 100, 80);
    }
    else if(this.frame == 1) {
      image(this.spriteSheet, 0, 0, 100, 100, 100, 0, 100, 80);
    }
    else if(this.frame == 2) {
      image(this.spriteSheet, 0, 0, 100, 100, 200, 0, 100, 80);
    } else {
      image(this.spriteSheet, 0, 0, 100, 100, 0, 0, 100, 80);
    }   

    if(frameCount % 4 == 0) {
      this.frame = (this.frame + 1) % 4;
    }
    this.x += 2 * this.moveX;
    this.y += 2 * this.moveY;

    //establishing bounds so the bear can't run off the screen
    if(this.x < 0) {
      this.x = 0;
    }
    if(this.x > 640) {
      this.x = 640;
    }
    if(this.y < 0) {
      this.y = 0;
    }
    if(this.y > 480) {
      this.y = 480;
    }

    //collision with the honey pots
    if(this.x-40 < 560 && 560 < this.x+40 && this.y-40 < 200 && 200 < this.y+40 && honeyPot1NotCollected == 1) {
      honeyPot1NotCollected = 0;
      score++;
      ding.start();
      serialPDM.transmit('led1');
    }
    if(this.x-40 < 320 && 320 < this.x+40 && this.y-40 < 100 && 100 < this.y+40 && honeyPot2NotCollected == 1) {
      honeyPot2NotCollected = 0;
      score++;
      ding.start();
      serialPDM.transmit('led1');
    }
    if(this.x-40 < 80 && 80 < this.x+40 && this.y-40 < 300 && 300 < this.y+40 && honeyPot3NotCollected == 1) {
      honeyPot3NotCollected = 0;
      score++;
      ding.start();
      serialPDM.transmit('led1');
    }
    pop();
  }
  go(direction) {
    this.moveX = direction;
    this.facing = direction;
  }
  stop() {
    this.moveX = 0;
    this.moveY = 0;
  }
  up(direction) {
    this.moveY = direction;
  }
}

function Bee(spriteSheet,x,y,moving) {
  this.spritesheet = loadImage(spriteSheet);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving;
  this.draw = function() {
    push();
    translate(this.x,this.y);
    if(this.facing < 0) { 
      scale(-1.0,1.0);
    }
    if(this.moving != 0) {
      if(this.frame == 0)
        image(this.spritesheet, 0, 0, 40, 40, 0, 0, 50, 30);
      if(this.frame == 1)
        image(this.spritesheet, 0, 0, 40, 40, 50, 0, 50, 30);
      if(this.frame == 2)
        image(this.spritesheet, 0, 0, 40, 40, 100, 0, 50, 30);
      if(this.frame == 3)
        image(this.spritesheet, 0, 0, 40, 40, 150, 0, 50, 30);

      if(frameCount % 4 == 0) {
        this.frame = (this.frame + 1) % 4;
        this.x = this.x + speed * this.moving;
        if(this.x < 40 || this.x > width-40) {
          this.moving = -this.moving;
          this.facing = -this.facing;
        }  
      }
    }

    //bee-bear collision
    if(this.x-30 < bear.x  && bear.x < this.x+30 && this.y-30 < bear.y && bear.y < this.y + 30) {
      bear.x = 320;
      bear.y = 450;
      bear.stop();
      tempTime = time;
      bearLockOutCD = 1;
      lives--;
      collision.start();
      serialPDM.transmit('led2'); 
    }
    pop();
  }
}