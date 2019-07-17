
const BODYSIZE = 32;
const PLAYER_SPEED = 2;
const NPC_SPEED = 0.0015;

let playerX = 0;
let playerY = 0;
let npcX = 0;
let npcY = 0;
let timeX = 0;
let timeY = 1;
let talking = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    playerX = width / 2;
    playerY = height / 2;

    npcX = width / 2;
    npcY = height * 0.2;

}

function draw() {
    clear();




    if (!talking) {
        if (keyIsDown(87) && playerY > BODYSIZE) { // W
            playerY -= PLAYER_SPEED;
        } else if (keyIsDown(83) && playerY < height - BODYSIZE) { // S
            playerY += PLAYER_SPEED;
        }
        if (keyIsDown(65) && playerX > BODYSIZE) { // A
            playerX -= PLAYER_SPEED;
        } else if (keyIsDown(68) && playerX < width - BODYSIZE) { // D
            playerX += PLAYER_SPEED;
        }
        timeX += NPC_SPEED;
        timeY += NPC_SPEED;
        if (distanceBetween(playerX, playerY, npcX, npcY) < 50) {
            textSize(16);
            fill(150);
            text('Press E to talk', npcX + 15, npcY - 15);
        }
    }

    npcX = noise(timeX) * width;
    npcY = noise(timeY) * height;
    fill(51);
    ellipse(npcX, npcY, BODYSIZE, BODYSIZE);
    ellipse(playerX, playerY, BODYSIZE, BODYSIZE);


}

function keyPressed() {
    if (keyCode === 69) { // E
        if (distanceBetween(playerX, playerY, npcX, npcY) < 50 && !talking) {
            talking = true;
            console.log("E");
        }
    } else if (keyCode === 78 && talking) { // N
        talking = false;
        console.log("N");
    }
    return false; // prevent default
}

function distanceBetween(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    var dis = Math.sqrt(a * a + b * b);
    return dis;
}