class WorldGenerator {
    constructor(seed) {
        noiseSeed(seed);
    }

    draw() {

        // translate(cam.centerX, cam.centerY, cam.centerZ);
        // clear();
        for (let i = 0; i < WORLD_WIDTH; i++) {
            for (let j = 0; j < WORLD_DEPTH; j++) {

                let altitude = noise(i * GRADE, j * GRADE) * 1;
                // let altitude = Math.floor(altitude * 10) + 1;
                let x = i * BLOCK_SIZE;
                let y = Math.floor(map(altitude, 0, 1, 0, WORLD_HEIGHT)) * BLOCK_SIZE;
                let z = j * BLOCK_SIZE;
                // console.log(this.disOfCube(i, y, j));
                let dis = this.disOfCube(-x, -y, z);

                let vCube = createVector(x - cam.eyeX, y - cam.eyeY, z - cam.eyeZ);
                let vCam = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ);

                // if (degrees(vCam.angleBetween(vCube)) < 25 && dis < VIEW_DIS) {
                // console.log(degrees(vCam.angleBetween(vCube)));
                if (dis < VIEW_DIS) {
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

                    translate(0, -y, 0);
                    box(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    translate(0, y, 0);
                    // ambientLight();
                }
                translate(0, 0, BLOCK_SIZE);
            }
            translate(-BLOCK_SIZE, 0, -(WORLD_DEPTH * BLOCK_SIZE));
        }
    }

    disOfCube(x, y, z) {
        let dx = x - cam.eyeX;
        let dy = y - cam.eyeY;
        let dz = z - cam.eyeZ;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
        // console.log(dy);
        // return Math.sqrt(dy * dy);
    }

    // fieldOfView(va, vb) {
    //     // Store some information about them for below
    //     let dot = va.dot(vb);
    //     let la = va.length();
    //     let lb = vb.length();

    //     // Now to find the angle
    //     return (Math.acos(dot / (la * lb)) * (180 / Math.PI));
    // }
}