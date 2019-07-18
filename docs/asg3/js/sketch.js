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
let npc;
let dia;
let diaCounter = 0;

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9);
    frameRate(60);
    textAlign(CENTER, BOTTOM);

    playerX = width / 2;
    playerY = height - 100;

    npcX = width / 2;
    npcY = height / 2 - 200;

    npc = new NPC();
    dia = new DialogBox();
}

function draw() {
    if (!talking) {
        manuallyDraw();
    }
}

function manuallyDraw() {
    clear();
    // Draw House
    rectMode(CORNER);
    fill(150, 111, 51);
    strokeWeight(32);
    stroke(151);
    rect(0, height / 2, width, height / 2);

    strokeWeight(0);
    stroke(51);
    npc.draw();
    playerControl();
    fill(125, 0, 0);
    ellipse(playerX, playerY, BODYSIZE, BODYSIZE);
}

function keyPressed() {
    if (keyCode === 32) { // SPACEBAR
        if (distanceBetween(playerX, playerY, npcX, npcY) < 50 && !talking) {
            talking = true;
            dia.changeText1("Hello there");
            dia.changeText2("Press Enter...");
            dia.draw();
        }
    } else if (keyCode === 89 && talking && diaCounter === 3) { // Y
        let axiom = "C+C--C-C";
        dia.changeText1("Do you want to see more?");
        dia.draw();
        npc.generateArt(axiom);
    } else if (keyCode === 78 && talking && diaCounter === 3) { // N
        talking = false;
        diaCounter = 0;
    } else if (keyCode === 13 && talking && diaCounter < 3) { // Enter
        switch (diaCounter) {
            case 0:
                dia.changeText1("My name is Lubin.");
                diaCounter++;
                break;
            case 1:
                dia.changeText1("I am an artist.");
                diaCounter++;
                break;
            case 2:
                dia.changeText1("Do you want to see my works?");
                dia.changeText2("Press Y/N...");
                diaCounter++;
                break;
            default:
                break;
        }
        dia.draw();
    }
    return false; // prevent default
}

function distanceBetween(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    var dis = Math.sqrt(a * a + b * b);
    return dis;
}

function playerControl() {
    if (!talking) {
        if ((keyIsDown(87) || keyIsDown(38)) && playerY > height / 2 + BODYSIZE) { // W
            playerY -= PLAYER_SPEED;
        } else if ((keyIsDown(83) || keyIsDown(40)) && playerY < height - BODYSIZE) { // S
            playerY += PLAYER_SPEED;
        }
        if ((keyIsDown(65) || keyIsDown(37)) && playerX > BODYSIZE) { // A
            playerX -= PLAYER_SPEED;
        } else if ((keyIsDown(68) || keyIsDown(39)) && playerX < width - BODYSIZE) { // D
            playerX += PLAYER_SPEED;
        }
    }
}