function setup() {
  createCanvas(400, 200);
}

function draw() {

  background(0,0,0);
  noStroke();

  fill(255,255,60);
  arc(100, 100, 150, 150, 5*PI/4, 3*PI/4);

  fill(255,51,51);
  rect(225,75,160,95);
  arc(305,80,160,120,PI,0);

  fill(255,255,255);
  circle(270,100,40);
  circle(340,100,40);

  fill(0,0,255);
  circle(270,100,25);
  circle(340,100,25);
}