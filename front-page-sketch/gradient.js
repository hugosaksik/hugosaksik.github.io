
var x1MapIn = 1000.0;
var x1MapAx = 336.0;
var y1MapIn = 476.0;
var y1MapAx = 142.0;
var x2MapIn = 252.0;
var x2MapAx = 136.0;
var y2MapIn = 761.0;
var y2MapAx = 318.0;
var gui;

var x1MapInMax = 1000;
var x1MapAxMax = 1000;
var y1MapInMax = 1000;
var y1MapAxMax = 1000;
var x2MapInMax = 1000;
var x2MapAxMax = 1000;
var y2MapInMax = 1000;
var y2MapAxMax = 1000;
//
var showDebugCircle = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noStroke();
  
  gui = createGui('-');
  gui.addGlobals('x1MapIn', 'x1MapAx', 'y1MapIn', 'y1MapAx', 'x2MapIn', 'x2MapAx', 'y2MapIn', 'y2MapAx', 'showDebugCircle');
}

function draw() {
  // background(12, 2, 95);

  x1 = map(sin(frameCount * 0.05), -1, 1, 0, windowWidth/2);
  y1 = map(cos(frameCount * 0.04), -1, 1, 0, windowHeight);
  x2 = map(sin(frameCount * 0.05), -1, 1, map(sin(frameCount * 0.05), -1, 1, windowWidth / 2, windowWidth), map(cos(frameCount * 0.04), -1, 1, windowWidth/2, windowWidth));
  y2 = map(cos(frameCount * 0.04), -1, 1, map(sin(frameCount * 0.05), -1, 1, 0, windowHeight), map(cos(frameCount * 0.04), -1, 1, windowHeight, windowHeight));
  gradientLine(x1, y1, x2, y2);


  if (showDebugCircle) {

    debugValue(x1, y1, x2, y2);
  }
}

function gradientLine(x1, y1, x2, y2) {

  let previousPointX = x1;
  let previousPointY = y1;

  for (i = y1; i < y2; i += (y2 - y1) / 30) {
    let h = map(x2, 0, 400, map(sin(frameCount * 0.001), -1, 1, 0, 180), map(sin(frameCount * 0.001), -1, 1, 0, 360));
    let s = map(i, y1, y2, map(sin(frameCount * 0.001), -1, 1, 0, 50), map(sin(frameCount * 0.001), -1, 1, 50, 100));
    // let s = 50;
    let b = 95;
    // fill(h, s, b);
    stroke(h, s, b);
    strokeWeight(20);
    line(previousPointX, previousPointY, map(i, y1, y2, x1, x2), i);
    previousPointX = map(i, y1, y2, x1, x2);
    previousPointY = i;
    // circle(map(i, y1, y2, x1, x2), i, 20);
  }

}

function windowResized() {
  // Resize the canvas to fit the new window dimensions
  resizeCanvas(windowWidth, windowHeight);

  // Optionally, reset your sketch by calling setup
  // setup(); // This restarts your sketch
}

function debugValue(x1, y1, x2, y2) {

  strokeWeight(1);
  stroke(0, 0, 0);
  fill(50, 100, 50);
  circle(x1, y1, 20);
  fill(100, 100, 100);
  circle(x2, y2, 20);
}