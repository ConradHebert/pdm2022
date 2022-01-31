let mouseColor, red, orange, yellow, green, cyan, blue, magenta, brown, white, black;

function setup() {
  createCanvas(800, 400);
  background(240);
  mouseColor = 0;
  red = new color(0, "red");
  orange = new color(25, "orange");
  yellow = new color(50, "yellow");
  green = new color(75, "green");
  cyan = new color(100, "cyan");
  blue = new color(125, "blue");
  magenta = new color(150, "magenta");
  brown = new color(175, "brown");
  white = new color(200, "white");
  black = new color(225, "black");
}

function draw() {
    if(mouseIsPressed) {
      if(mouseX > 26) {
        drawing();
      }
    }
    red.appear();
    red.onMousePressed();
    orange.appear();
    yellow.appear();
    green.appear();
    cyan.appear();
    blue.appear();
    magenta.appear();
    brown.appear();
    white.appear();
    black.appear();
}

class color {
  constructor(y, color) {
    this.x = 0;
    this.y = y;
    this.w = 25;
    this.h = 25;
    this.color = color;
  }
  appear() {
    push();
    stroke(255);
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  onMousePressed() {
    noStroke();
    if(mouseIsPressed) {
      if(mouseX <= 25) {
        if(mouseY > 0 && mouseY <= 25) {
          mouseColor = "red";
        } else if (mouseY > 25 && mouseY <= 50) {
          mouseColor = "orange";
        } else if (mouseY > 50 && mouseY <= 75) {
          mouseColor = "yellow";
        } else if (mouseY > 75 && mouseY <= 100) {
          mouseColor = "green";
        } else if (mouseY > 100 && mouseY <= 125) {
            mouseColor = "cyan";
        } else if (mouseY > 125 && mouseY <= 150) {
          mouseColor = "blue";
        } else if (mouseY > 150 && mouseY <= 175) {
            mouseColor = "magenta";
        } else if (mouseY > 175 && mouseY <= 200) {
            mouseColor = "brown";
        } else if (mouseY > 200 && mouseY <= 225) {
            mouseColor = "white";
        } else if (mouseY > 225 && mouseY <= 250) {
            mouseColor = "black";
    }
   }
  }
 }
}

function drawing() {
  push();
  stroke(mouseColor);
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}