let init = 0;

function setup() {
    createCanvas(500, 500);
    frameRate(30);
}

function draw() {
    clear();
    fill(51);

    let step = 1;
    let amplitude = 100;

    let lastX = 0;
    let lastY = width / 2 + noise(init) * amplitude;

    for (let x = step; x <= width; x += step) {
        let y = width / 2 + noise(init + x / 350) * amplitude;
        line(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
    }
    init += 0.01;
}
