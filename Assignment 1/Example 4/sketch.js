function setup() {
  createCanvas(300, 300);
}

function draw() {

  background(0,0,153);
  strokeWeight(4);
  stroke(255,255,255);

  fill(0,150,0);
  circle(150,150,150);

  fill(255,0,0);
  beginShape();
  vertex(115,160);
  vertex(75,125);
  vertex(125,125);
  vertex(150,70);
  vertex(175,125);
  vertex(225,125);
  vertex(185,160);
  vertex(195,215);
  vertex(150,180);
  vertex(105,215);
  vertex(115,160);
  endShape();

}