let tileSize = 10;
let bestLevel = null;

function setup() {
    createCanvas(100, 100);

    levelWidth = width / tileSize;
    levelHeight = height / tileSize;
    // let levelWidth = width / tileSize;
    // let levelHeight = height / tileSize;
    ga = new GeneticAlgorithm(100, levelWidth * levelHeight, symFunction);
    // let bestInd = ga.evolve(1);
    // for (let ind of ga.population) {
    //     console.log(ind);
    // }
    // bestLevel = genToPhen(bestInd.gens, levelWidth, levelHeight);
}

function draw() {
    background(80);

    let bestInd = ga.evolve();
    bestLevel = genToPhen(bestInd.gens, levelWidth, levelHeight);
    // console.log(bestInd);

    for (let i = 0; i < levelWidth; i++) {
        for (let j = 0; j < levelHeight; j++) {
            if (bestLevel[i][j] == 1) {
                fill(0);
            } else if (bestLevel[i][j] == 0) {
                fill(255);
            }
            rect(j * tileSize, i * tileSize, tileSize, tileSize);

        }
    }
}

// Create a level of size (w, h) from a ga individual (1D array)
function genToPhen(individual, w, h) {
    let level = new Array(w);
    for (let i = 0; i < h; i++) {
        level[i] = new Array(h);
    }

    // Reshape a 1D individual onto a 2D level of size(w,h)
    for (let i = 0; i < individual.length; i++) {
        let x = i % w;
        let y = int(i / w);

        level[x][y] = individual[i];
    }
    return level;
}

function symFunction(individual) {
    let level = genToPhen(individual, levelWidth, levelHeight);

    let w = levelWidth;
    let h = levelHeight;

    let simmetry = 0;
    for (let i = 0; i < ceil(w / 2); i++) {
        for (let j = 0; j < ceil(h / 2); j++) {
            simmetry += abs(level[i][j] - level[w - i - 1][j])
            simmetry += abs(level[i][j] - level[i][h - j - 1])
            simmetry += abs(level[i][j] - level[w - i - 1][h - j - 1])
        }
    }

    return (w * h) - simmetry;
}
