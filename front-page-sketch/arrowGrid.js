const arrowgrid = (p) => {
  let font;
  let mskcnv;

  p.preload = () => {
    font = p.loadFont('../fonts/Syne-SemiBold.ttf');
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent('backgroundSketch');
    p.textFont(font);
    p.textSize(20);
    p.noStroke();

    mskcnv = p.createGraphics(p.windowWidth, p.windowHeight);
    resetMaskCanvas();
  };

  p.draw = () => {
    p.background(243, 239, 238);
    sArrowGrid(0, 0);

    if (p.mouseX >= 0 && p.mouseY >= 0) {
      updateMask(p.mouseX, p.mouseY);
      p.image(mskcnv, 0, 0);
    }
  };

  function resetMaskCanvas() {
    mskcnv.background(243, 239, 238);
    mskcnv.noStroke();
    mskcnv.blendMode(p.REMOVE);
  }

  function updateMask(x, y) {
    mskcnv.fill(243, 239, 238);
    mskcnv.circle(x, y, 100);
  }

  function sArrowGrid(xOffset, yOffset) {
    p.fill(0);

    const cellSize = 60;
    const halfCellSize = cellSize / 2;

    for (let x = 0; x < p.width; x += cellSize) {
      for (let y = 0; y < p.height; y += cellSize) {
        // Calculate the angle toward the mouse
        const dx = p.mouseX - (x + xOffset + halfCellSize);
        const dy = p.mouseY - (y + yOffset + halfCellSize);
        const angle = p.atan2(dy, dx);

        // Draw the arrow
        p.push();
        p.translate(x + halfCellSize, y + halfCellSize);
        p.rotate(angle);
        p.text("→", -8, 5); // Center the arrow
        p.pop();
      }
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    mskcnv = p.createGraphics(p.windowWidth, p.windowHeight);
    resetMaskCanvas();
  };
};

new p5(arrowgrid);
