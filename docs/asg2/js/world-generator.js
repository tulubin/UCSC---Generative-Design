let BLOCK_SIZE = 32;
let WORLD_SIZE = 32;
let WORLD_WIDTH = 32;
let WORLD_HEIGHT = 32;
let WORLD_DEPTH = 32;
let GRADE = 0.025;
class WorldGenerator {
    constructor(seed) {
        noiseSeed(seed);
    }

    draw() {

        translate(0, windowHeight, 0);
        // clear();
        for (let i = 0; i < WORLD_SIZE; i++) {
            for (let j = 0; j < WORLD_SIZE; j++) {

                let altitude = noise(i * GRADE, j * GRADE) * 1;
                // let altitude = Math.floor(altitude * 10) + 1;

                // noStroke();
                stroke(100, 100, 100);
                noFill();

                if (altitude >= 0 && altitude < 0.3) { // deep sea
                    texture(seaTexture);
                }
                else if (altitude >= 0.3 && altitude < 0.4) { // shalow water
                    texture(waterTexture);
                }
                else if (altitude >= 0.4 && altitude < 0.5) { // sand
                    texture(sandTexture);
                }
                else if (altitude >= 0.5 && altitude < 0.7) { // grass
                    texture(grassTexture);
                }
                else if (altitude >= 0.7 && altitude <= 1) { // mountain
                    texture(dirtTexture);
                }

                let blockAltitude = Math.floor(map(altitude, 0, 1, 0, WORLD_HEIGHT));
                translate(0, -blockAltitude * BLOCK_SIZE, 0);
                box(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                translate(0, blockAltitude * BLOCK_SIZE, 0);
                // ambientLight();
                translate(0, 0, BLOCK_SIZE);
            }
            translate(-BLOCK_SIZE, 0, -(WORLD_SIZE * BLOCK_SIZE));
        }
    }
}