let timeX = 0;
let timeY = 10000;
let k = 0.01;

function setup() {
    createCanvas(500, 500);
    background(200);
}

function draw() {
    clear();
    fill(51);

    let x = noise(timeX) * width;
    let y = noise(timeY) * height;

    ellipse(x, y, 24, 24);

    timeX += k;
    timeY += k;
}

// function setup() {
//     background(0);
// }

// function draw() {
//     fill(255);

//     // line parameters
//     for (let i = 0; i < 100; i++) {
//         let x = random(width);
//         let y = random(height);
//         let r = random(2, 7);
//         ellipse(x, y, r, r);
//     }
// }
