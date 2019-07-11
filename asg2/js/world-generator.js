let BLOCK_SIZE = 16;
let WORLD_SIZE = 32;

class WorldGenerator {
    constructor() {
        // this.a = a;
    }

    draw() {

        translate(0, windowHeight, 0);
        // stroke(255);
        // noFill();
        // box(100);

        // clear();
        for (let i = 0; i < WORLD_SIZE; i++) {
            for (let j = 0; j < WORLD_SIZE; j++) {

                // let noiseR = noise(x / 10, y / 10, timeX) * 100;
                // let noiseG = noise(x / 10, y / 10, timeY) * 255;
                // let noiseB = noise(x / 10, y / 10, timeZ) * 50;

                let worldHeight = noise(i / 10, j / 10) * 1;
                // console.log(worldHeight);
                // let x = i * BLOCK_SIZE;
                // let y = j * BLOCK_SIZE;
                let altitude = Math.floor(worldHeight * 10);
                // console.log(altitude);
                
                // noStroke();
                noFill();
                if (worldHeight >= 0 && worldHeight < 0.2) {
                    stroke(0, 0, 125); // deep sea
                    // texture(grassTexture);
                    // altitude = 0;
                } else if (worldHeight >= 0.2 && worldHeight < 0.4) {
                    stroke(0, 0, 255); // shalow water
                    // texture(grassTexture);
                    // altitude = 2;
                } else if (worldHeight >= 0.4 && worldHeight < 0.5) {
                    stroke(255, 255, 204); // sand
                    // texture(grassTexture);
                    // altitude = 4;
                } else if (worldHeight >= 0.5 && worldHeight < 0.7) {
                    stroke(0, 255, 0); // grass
                    // texture(grassTexture);
                    // altitude = 6;
                } else if (worldHeight >= 0.7 && worldHeight < 1) {
                    stroke(100, 100, 100); // mountain
                    // texture(dirtTexture);
                    // texture(grassTexture);

                    // altitude = 8;
                }

                // normalMaterial();

                // box(BLOCK_SIZE, BLOCK_SIZE * worldHeight * 10, BLOCK_SIZE);
                // for (let i = 0; i <= altitude; i++) {
                //     // ambientLight();
                // }
                translate(0, -altitude * BLOCK_SIZE, 0);
                box(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                translate(0, altitude * BLOCK_SIZE, 0);
                translate(0, 0, BLOCK_SIZE);
            }
            translate(-BLOCK_SIZE, 0, -(WORLD_SIZE * BLOCK_SIZE));
        }
        // timeX += 0.01;
        // timeY += 0.01;
        // timeZ += 0.01;
        // time += 0.01;
        // noLoop();

    }


}