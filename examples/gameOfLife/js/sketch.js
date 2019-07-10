let cellSize = 10;

function setup() {
    createCanvas(800, 500);
    strokeWeight(1);

    let gameWidth = width / cellSize;
    let gameHeight = height / cellSize;

    ca = new GameOfLife(gameWidth, gameHeight);

}

function draw() {
    ca.draw(cellSize);
    ca.evolve();

}