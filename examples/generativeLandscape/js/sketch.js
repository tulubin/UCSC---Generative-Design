// let timeX = 0;
// let timeY = 0;
// let timeZ = 0;
// let time = 0;

function setup() {
    createCanvas(100, 100);
    frameRate(30);
    pixelDensity(1);
}

function draw() {
    clear();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // let noiseR = noise(x / 10, y / 10, timeX) * 100;
            // let noiseG = noise(x / 10, y / 10, timeY) * 255;
            // let noiseB = noise(x / 10, y / 10, timeZ) * 50;

            let worldHeight = noise(x / 10, y / 10) * 1;

            if (worldHeight >= 0 && worldHeight < 0.2) {
                stroke(0, 0, 125); // deep sea
            } else if (worldHeight >= 0.2 && worldHeight < 0.4) {
                stroke(0, 0, 255); // shalow water
            } else if (worldHeight >= 0.4 && worldHeight < 0.5) {
                stroke(255, 255, 204); // sand
            } else if (worldHeight >= 0.5 && worldHeight < 0.7) {
                stroke(0, 255, 0); // grass
            } else if (worldHeight >= 0.7 && worldHeight < 1) {
                stroke(100, 100, 100); // mountain
            }
            // stroke(noiseR, noiseG, noiseB);
            point(x, y);
        }
    }
    // timeX += 0.01;
    // timeY += 0.01;
    // timeZ += 0.01;
    // time += 0.01;
    noLoop();

}
