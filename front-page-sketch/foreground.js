const foreground = (p) => {
    let particles = [];
    let keyword = ["Creative", "Technologist"];
    let font = 'Syne';
    let time = 0;
    let density = 9; // Default density, will be calculated dynamically
    let squareSize = 2; // Default square size, will be calculated dynamically

    p.setup = () => {
        p.createCanvas(p.windowWidth, 400).parent('foregroundSketch');
        p.textFont(font);
        updateScales();
        prepareParticles();
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, 400);
        updateScales();
        prepareParticles();
    };

    function updateScales() {
        p.textSize(calculateTextSize());
        density = calculateDensity();
        squareSize = calculateSquareSize();
    }

    function calculateTextSize() {
        return Math.max(50, p.windowWidth * 0.1); // Scale text size, minimum 50
    }

    function calculateDensity() {
        return p.floor(p.map(p.windowWidth, 1920, 360, 10, 5, true));
    }
    

    function calculateSquareSize() {
        return Math.max(1, p.windowWidth * 0.001); // Smaller squares for smaller screens
    }

    function prepareParticles() {
        particles = [];
        let pg = p.createGraphics(p.width, p.height);
        pg.textFont(font);
        pg.textSize(calculateTextSize());
        pg.textAlign(p.CENTER, p.CENTER);
        pg.background(0);
        pg.fill(255);

        pg.text(keyword[0], p.width / 2, p.height / 2 - 75);
        pg.text(keyword[1], p.width / 2, p.height / 2 + 75);
        pg.loadPixels();

        for (let x = 0; x < p.width; x += density) {
            for (let y = 0; y < p.height; y += density) {
                let index = (x + y * p.width) * 4;
                if (pg.pixels[index] > 0) {
                    particles.push({ x: x, y: y });
                }
            }
        }
    }

    p.draw = () => {
        p.clear(); // Clear canvas to maintain transparency
        time += 0.005;
        for (let i = 0; i < particles.length; i++) {
            let pnt = particles[i];
            let noiseScale = 0.01;
            let noiseValue = p.noise(pnt.x * noiseScale, pnt.y * noiseScale, time);
            let scale = p.map(noiseValue, 0, 1, 1, 9);

            let offsetX = Math.sin(pnt.y * 0.05 + time * 5) * (Math.sin(time ) * 10) + Math.cos(pnt.y * 0.5 + time); // Deform based on y position
            let offsetY = Math.cos(pnt.x * 0.05 + time) * 5 * (Math.cos(time ) *2); // Deform based on x position
        

            let posX = pnt.x + offsetX;
            let posY = pnt.y + offsetY;

            p.fill(0);
            p.noStroke();
            p.rect(posX, posY, squareSize * scale, squareSize * scale); // Use dynamic square size
        }
    };
};

new p5(foreground);
