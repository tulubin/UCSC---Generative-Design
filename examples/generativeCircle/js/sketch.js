let time = 0;
function setup() {
    createCanvas(500, 500);
    frameRate(30);
}

function draw() {
    clear();
    fill(51);

    let step = 10;
    let radius = 100;
    let amplitude = 10;

    let lastX = width / 2 + cos(0) * radius + noise(0, time) * amplitude;
    let lastY = width / 2 + sin(0) * radius + noise(0, time) * amplitude;

    strokeWeight(5);

    angleMode(DEGREES);

    for (let angle = 0; angle <= 360; angle += step) {
        let x = width / 2 + cos(angle) * radius + noise(time, angle) * amplitude;
        let y = height / 2 + sin(angle) * radius + noise(time, angle) * amplitude;

        line(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
    }
    // line(lastX, lastY, x, y);
    time += 0.1;
}
