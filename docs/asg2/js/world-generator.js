let BLOCK_SIZE = 32;
let WORLD_SIZE = 32;
let WORLD_WIDTH = 32;
let WORLD_HEIGHT = 32;
let WORLD_DEPTH = 32;

class WorldGenerator {
    constructor(seed) {
        noiseSeed(seed);
    }

    draw() {

        translate(0, windowHeight, 0);
        // clear();
        for (let i = 0; i < WORLD_SIZE; i++) {
            for (let j = 0; j < WORLD_SIZE; j++) {

                let worldHeight = noise(i / 10, j / 10) * 1;
                // let altitude = Math.floor(worldHeight * 10) + 1;

                // noStroke();
                stroke(100, 100, 100);
                noFill();

                this.biome(worldHeight);
                translate(0, -altitude * BLOCK_SIZE, 0);
                box(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                translate(0, altitude * BLOCK_SIZE, 0);
                // ambientLight();
                translate(0, 0, BLOCK_SIZE);
            }
            translate(-BLOCK_SIZE, 0, -(WORLD_SIZE * BLOCK_SIZE));
        }
    }

    biome() {
        if (altitude >= 0 && altitude < 3) { // deep sea
            texture(seaTexture);
        }
        else if (altitude >= 3 && altitude < 4) { // shalow water
            texture(waterTexture);
        }
        else if (altitude >= 4 && altitude < 5) { // sand
            texture(sandTexture);
        }
        else if (altitude >= 5 && altitude < 7) { // grass
            texture(grassTexture);
        }
        else if (altitude >= 7 && altitude < 10) { // mountain
            texture(dirtTexture);
        }
    }
}