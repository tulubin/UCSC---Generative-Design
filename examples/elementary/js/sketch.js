let cellW = 10;

function setup() {
    createCanvas(500, 500);
    strokeWeight(1);


    this.size = width / cellW;
    let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

    ca = new CellularAutomata(size, ruleset);

}

function draw() {
    ca.draw(cellW);
    ca.evolve();

    if (ca.generation == width / cellW) {
        reset();
    }
}

function reset() {
    createCanvas(width, height);
    // ca.generation = 0;
    let ruleset = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < ruleset.length; i++) {
        ruleset[i] = random() < 0.5 ? 0 : 1;
        // ruleset[i] = Math.floor(Math.random());
    }
    ca = new CellularAutomata(size, ruleset);
    // console.log(ruleset);
    // let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
}