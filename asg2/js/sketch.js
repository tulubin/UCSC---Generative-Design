let cam;
let dirtTexture;
let grassTexture;
let MOVE_SPEED = 20;

function preload() {
    dirtTexture = loadImage('assets/dirt.png');
    grassTexture = loadImage('assets/grass.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    pixelDensity(1);
    setAttributes('antialias', true);
    normalMaterial();
    cam = createCamera();
    // set initial pan angle
    cam.pan(-0.6);
    cam.tilt(0.9);

    world = new WorldGenerator();
}

function draw() {

    background(0);


    // every 160 frames, switch direction
    // if (frameCount % 160 === 0) {
    //     camX *= -1;
    // }
    updateCameraLocation()
    world.draw();
    // rotateX(frameCount * 0.01);
    // translate(-100, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);
    // translate(35, 0, 0);
    // box(20);

    // camX = 0;
    // camY = 0;
}

function mouseDragged() {
    cam.pan(map(event.movementX, 0, -500, 0, 1));
    cam.tilt(map(event.movementY, 0, 500, 0, 1));

    // if (mouseButton == LEFT) {
    //     mouseNowX += mouseX - pmouseX;
    //     mouseNowY += mouseY - pmouseY;
    // }
    // console.log(event.movementX, event.movementY);
}
// function keyPressed() {
//     if (key === 'w') {
//         cam.move(0, 0, 5);
//     } else if (key === 's') {
//         // cam.move(map(-1, 0, -500, 0, 1));
//     } else if (key === 'a') {

//     } else if (key === 'd') {

//     }
// }

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