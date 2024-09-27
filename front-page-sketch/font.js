let font;
let selectedSketch = 1;
let cnv;
//sTextFalling
let xPos = 0;
let yPos = 0;
//arrow grid;
let ag;

let noiseScale = 0.01; // Adjust this to change the noisiness
let timeOffset = 0;

function preload() {
  font = loadFont('../fonts/Syne-SemiBold.ttf');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  textFont(font);
  textSize(45);
  noStroke();

  // Create the arrow grid graphics buffer
  ag = createGraphics(560, 140);
  ag.textFont(font);
  ag.textSize(25);
  ag.textAlign(CENTER, CENTER);
}

function draw() {
  // background(220);  

  // Draw placeholders
  fill(200, 200, 200);
  // rect(100, windowHeight - 250, 800, 140);
  fill(100, 200, 200);
  rect(windowWidth - 550, 50, 450, 600);

  sTextFalling();
  sArrowGrid(100, windowHeight - 250);
  displayFramerate();
}

function windowResized() {
  // Resize the canvas to fit the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}

function sTextFalling() {
  colorMode(HSB);


  let speed = 100;
  let scale = 5;
  let shape = (xPos > 450 ? 30 : 5);
  fill(25, abs(sin(frameCount / speed * 2)) * 100, 200);
  let xIncrement = (Math.pow(abs(sin(frameCount / speed)), shape) * scale);
  let yIncrement = (Math.pow(abs(cos(frameCount / speed)), shape) * scale);

  console.log(xPos);
  if (xIncrement > 0) {
    xPos += xIncrement;
  }
  if (yIncrement > 0) {

    yPos += yIncrement;
  }
  text("Creative technologist", xPos, yPos);
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

  ag.clear(); // Clear the graphics buffer
  ag.fill(0);
  let cellSize = 20;
  for (let x = 0; x < ag.width; x += cellSize) {
    for (let y = 0; y < ag.height; y += cellSize) {
      let dx = mouseX - (x + xOffset) - cellSize / 2;
      let dy = mouseY - (y + yOffset) - cellSize / 2;
      let angle = atan2(dy, dx);
      ag.push();
      ag.translate(x + cellSize / 2, y + cellSize / 2);
      ag.rotate(angle);
      ag.text("→", 0, 0);
      ag.pop();
    }
  }
  timeOffset += 0.005;


  // Draw the graphics buffer onto the main canvas
  colorMode(RGB);
  fill(243, 239, 238);
  rect(100, windowHeight - 250, 560, 140)
  image(ag, xOffset, yOffset);
  // image(ag, 100, windowHeight - 250);
}