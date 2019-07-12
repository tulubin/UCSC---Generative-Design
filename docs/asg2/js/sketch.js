// Problems: world draw in update or not; multiple textures; world height 32 for mountain?
// Minebox.js
// cam.angleBetween(dis) < 90
// dis < 100
// width, height, depth

let cam;
let stoneTexture;
let seaTexture;
let waterTexture;
let sandTexture;
let grassTexture;
let dirtTexture;
let MOVE_SPEED = 80;
let WORLD_SEED = 101010;
let input, button, instructions;
let BLOCK_SIZE = 128;
// let WORLD_SIZE = 32;
let WORLD_WIDTH = 128;
let WORLD_HEIGHT = 32;
let WORLD_DEPTH = 128;
let GRADE = 0.02;
let VIEW_DIS = 32 * BLOCK_SIZE;
let SEA_LEVEL = 12;

function preload() {
    stoneTexture = loadImage('assets/stone.png');
    seaTexture = loadImage('assets/sea.png');
    waterTexture = loadImage('assets/water.png');
    sandTexture = loadImage('assets/sand.png');
    grassTexture = loadImage('assets/grass.png');
    dirtTexture = loadImage('assets/dirt.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(30);
    pixelDensity(1);
    setAttributes('antialias', true);

    input = createInput();
    input.position(20, 65);

    button = createButton('resetWorld');
    button.position(input.x + input.width, 65);
    button.mousePressed(resetWorld);

    instructions = createElement('h3', 'WSAD & RF to move, Mouse to look around. <br />Enter number as seed to reset the world(otherwise will be random)');
    instructions.position(20, 0);

    textAlign(CENTER);
    textSize(50);

    cam = createCamera();
    cam.setPosition(-WORLD_WIDTH / 2 * BLOCK_SIZE, -WORLD_HEIGHT * BLOCK_SIZE, WORLD_DEPTH / 2 * BLOCK_SIZE);
    cam.pan(1.8);
    cam.tilt(0.9);

    world = new WorldGenerator();


    // let vCube = createVector(100 - cam.eyeX, 100 - cam.eyeY, 100 - cam.eyeZ);
    // let vCam = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ);
    // let vCam = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ);
    // console.log(cam.centerX, cam.centerY, cam.centerZ);
    // console.log(vCam);

}

function draw() {
    background(255);
    updateCameraLocation()
    world.draw();
    // translate(100, 100, 100);
    // let vCube = createVector(100 - cam.eyeX, 100 - cam.eyeY, 100 - cam.eyeZ);
    // let vCam = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ);
    // console.log(degrees(vCam.angleBetween(vCube)));
    // if (degrees(vCam.angleBetween(vCube)) < 25)
    //     box(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function mouseDragged() {
    cam.pan(map(event.movementX, 0, -500, 0, 1));
    cam.tilt(map(event.movementY, 0, 500, 0, 1));
}

function updateCameraLocation() {
    if (keyIsDown(87)) { // W to move forward
        cam.move(0, 0, -MOVE_SPEED);
    } else if (keyIsDown(83)) { // S to move backward
        cam.move(0, 0, MOVE_SPEED);
    }
    if (keyIsDown(65)) { // A to move left
        cam.move(-MOVE_SPEED, 0, 0);
    } else if (keyIsDown(68)) { // D to move right
        cam.move(MOVE_SPEED, 0, 0);
    }
    if (keyIsDown(82)) { // R to move up
        cam.move(0, -MOVE_SPEED, 0);
    } else if (keyIsDown(70)) { // F to move down
        cam.move(0, MOVE_SPEED, 0);
    }
}


function resetWorld() {
    let newSeed = parseFloat(input.value());
    if (isNaN(newSeed)) {
        world = new WorldGenerator(Math.random() * 99999999999);
    } else {
        world = new WorldGenerator(newSeed);
    }
    // instructions.html('World Reset');
}