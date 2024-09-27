let font;
let cnv;
let mskcnv;

let noiseScale = 0.01; // Adjust this to change the noisiness
let timeOffset = 0;

function preload() {
  font = loadFont('../fonts/Syne-SemiBold.ttf');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(20);
  noStroke();

  mskcnv = createGraphics(windowWidth, windowHeight);
  mskcnv.background(243, 239, 238);
  mskcnv.noStroke();
  mskcnv.blendMode(REMOVE);
}

function draw() {
  background(243, 239, 238);

  mskcnv.fill(243, 239, 238);
  mskcnv.circle(mouseX, mouseY, 100);
  sArrowGrid(0, 0);
  image(mskcnv, 0, 0);



  // displayFramerate();
}

function windowResized() {
  // Resize the canvas to fit the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}

function displayFramerate() {

  fill(255);
  rect(0, 0, 100, 60);

  let currentFramerate = floor(1000 / deltaTime);
  if (currentFramerate > 30) {

    fill(100, 200, 200);
  } else {
    fill(0, 200, 200);
  }
  text(currentFramerate, 20, 40);
}

function sArrowGrid(xOffset, yOffset) {

  // clear(); // Clear the graphics buffer
  fill(0);
  let cellSize = 60;
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      let dx = mouseX - (x + xOffset) - cellSize / 2;
      let dy = mouseY - (y + yOffset) - cellSize / 2;
      let angle = atan2(dy, dx);
      push();
      translate(x + cellSize / 2, y + cellSize / 2);
      rotate(angle);
      text("→", 0, 0);
      pop();
    }
  }
  timeOffset += 0.005;
}