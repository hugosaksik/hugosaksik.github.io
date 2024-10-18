let font;
let cnv;
let timeOffset = 0;
let previousTime = 0;

let interpolationTimer = 0;
let incrementTimer = false;
const timeLimit = 500000; // Maximum time for interpolation (in ms)

let mskcnv;
let isDesktop;

function preload() {
  font = loadFont('../fonts/Syne-SemiBold.ttf');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(20);
  noStroke();

  mskcnv = createGraphics(windowWidth, windowHeight);
  resetMaskCanvas();

  isDesktop = !isMobileDevice();
}

function draw() {
  background(243, 239, 238);

  
  sArrowGrid(0, 0);
  if (isDesktop) {
    updateMask(mouseX, mouseY);
    image(mskcnv, 0, 0);
  }
  // displayFramerate();
}

function resetMaskCanvas() {
  // Function to reset the mask canvas
  mskcnv.background(243, 239, 238);
  mskcnv.noStroke();
  mskcnv.blendMode(REMOVE);
}

function updateMask(x, y) {
  // Only update mask for desktop and when the mouse moves
  mskcnv.fill(243, 239, 238);
  mskcnv.circle(x, y, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mskcnv = createGraphics(windowWidth, windowHeight);
  resetMaskCanvas(); // Reset the mask on window resize
}

function displayFramerate() {
  fill(255);
  rect(0, 0, 100, 60);

  const currentFramerate = floor(1000 / deltaTime);
  fill(currentFramerate > 30 ? [0, 255, 0] : [255, 0, 0]);
  text(currentFramerate, 20, 40);
}

function sArrowGrid(xOffset, yOffset) {
  fill(0);

  const currentTime = millis();
  const deltaTime = currentTime - previousTime;  // Time elapsed since last frame
  previousTime = currentTime;

  const cellSize = 60;
  const halfCellSize = cellSize / 2;
  const noiseSpeed = 0.003;
  const gridInfluence = 0.5;
  const invWidth = 1 / width;
  const invHeight = 1 / height;
  const frameNoiseSpeed = frameCount * noiseSpeed; // Avoid recalculating this for each grid cell

  for (let x = 0; x < width; x += cellSize) {
    const noisexBase = frameNoiseSpeed + (x * invWidth) * gridInfluence;

    for (let y = 0; y < height; y += cellSize) {
      const noiseyBase = frameNoiseSpeed + (y * invHeight) * gridInfluence;

      let noiseAngle = noise(noisexBase, noiseyBase); 
      noiseAngle = map(noiseAngle, 0.4, 0.6, -PI, PI);
      let angle = noiseAngle;

      if (interpolationTimer > 0) {
        // Update the timer and clamp within the range
        interpolationTimer += incrementTimer ? deltaTime : -deltaTime;
        interpolationTimer = constrain(interpolationTimer, 0, timeLimit);

        // Switch direction of timer at limits
        if (interpolationTimer >= timeLimit) incrementTimer = false;
        if (interpolationTimer <= 0) incrementTimer = true;

        const interpolate = min(1, map(interpolationTimer, 0, 150000, 0, 1));

        // Follow mouse position and interpolate
        const dx = mouseX - (x + xOffset + halfCellSize);
        const dy = mouseY - (y + yOffset + halfCellSize);
        const followAngle = atan2(dy, dx);
        angle = lerp(noiseAngle, followAngle, interpolate);
      }

      // Draw arrow
      push();
      translate(x + halfCellSize, y + halfCellSize);
      rotate(angle);
      text("→", -8, 5); // Magic number to center the arrow on pivot
      pop();
    }
  }
}

function mouseClicked() {
  if (interpolationTimer <= 1) {
    incrementTimer = true;
    interpolationTimer = 1;
  }
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
