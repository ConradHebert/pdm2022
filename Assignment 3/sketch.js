let character;

function preload() {
  spriteSheet = loadImage("SpelunkyGuy.png");
  spriteSheet2 = loadImage("Green.png");
  spriteSheet3 = loadImage("GoldenMonk.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  character = new Character(spriteSheet, random(100,500), random(100,500));
  character2 = new Character(spriteSheet2, random(100,500), random(100,500));
  character3 = new Character(spriteSheet3, random(100,500), random(100,500));
  

}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    character.go(1);
    character2.go(1);
    character3.go(1);
  }
  if(keyCode == LEFT_ARROW) {
    character.go(-1);
    character2.go(-1);
    character3.go(-1);
  }
}

function keyReleased() {
  character.stop();
  character2.stop();
  character3.stop();
}

function draw() {
  background(255, 255, 255);
  character.draw();
  character2.draw();
  character3.draw();
}

class Character {
  constructor(spriteSheet, x, y) {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
  
    if (this.move == 0) {
      image(this.spriteSheet, 0, 0, 200, 200, 0, 0, 80, 80);
    }
    else {
      image(this.spriteSheet, 0, 0, 200, 200, 80 * (this.sx + 1), 0, 80, 80);
    }

    if (frameCount % 5 == 0) {
      this.sx = (this.sx + 1) % 8;
    }
  
    this.x += 2 * this.move;
    pop();
  }
  
  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.spriteID = 3;
  }

  stop() {
    this.move = 0;
  }
}