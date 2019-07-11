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
let MOVE_SPEED = 20;
let WORLD_SEED = 101010;
let input, button, instructions;

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

    cam.pan(1.4);
    cam.tilt(0.9);

    world = new WorldGenerator();
}

function draw() {
    background(125);
    updateCameraLocation()
    world.draw();
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
    if(isNaN(newSeed)) {
        world = new WorldGenerator(Math.random()*99999999999);
    } else {
        world = new WorldGenerator(newSeed);
    }
    // instructions.html('World Reset');
}