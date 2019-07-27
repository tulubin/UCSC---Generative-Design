let world;
let race;
let camera;
let popSize = 10;
let ga;
let leaderboard;
let maxIndex = 0;
let bestCar = null;
let leaderboardTable = null;
let talbe = "";
let bestCarTable = null;
let bestInfo = "";
let generation = 0;
let bestGeneration = 0;

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9, WEBGL);
    setAttributes('antialias', true);

    // Initialize box2d physics and create the world
    world = createWorld();
    camera = createCamera();

    // Create Camera
    camera.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10);
    camera.setPosition(0, 0, 0);

    ga = new GeneticAlgorithm(popSize, 0.02);
    maxIndex = Car.angAmount * 2 + Car.wheAmount * 2;

    leaderboardTable = createDiv("<h5>Leader Board</h5>");
    leaderboardTable.position(20, 5);
    bestCarTable = createDiv("<h5>Generation: 0</h5><h5>BestCar: / Fitness: / </h5>");
    bestCarTable.position(width - 200, 5);

    // Create a terrain
    let pos = createVector(-width / 2, 10);
    terrain = new Terrain(pos.x, pos.y, 100, 100, 1);
    // Create a world to manage the cars
    race = new Race(terrain, ga.cars, raceOverCallback);
    race.start();
}

function draw() {
    if (race.running) {
        background(240);
    }

    race.update();
    race.draw();

    if (race.running) {
        // Update physics. 2nd and 3rd arguments are velocity and position iterations
        let timeStep = 1.0 / 30;
        world.Step(timeStep, 10, 10);

        // Get race leaderboards
        leaderboard = race.getLeaderboards();

        // Follow first car with the camera
        let firstCar = leaderboard[0].car;

        if (firstCar) {
            let firstPos = firstCar.getPosition();
            camera.setPosition(firstPos.x + width / 5, firstPos.y - height / 5, camera.eyeZ);
        }
    }
}

// ========================================
// Callback function for when the race is over
// ========================================
function raceOverCallback(finalLeaderboards) {
    // console.log("race over!");
    // console.log(finalLeaderboards);
    generation++;

    // bestCar = finalLeaderboards[0];
    // console.log(finalLeaderboards);
    // console.log(finalLeaderboards[0].feats);
    // console.log("!" + bestCar.progress.toFixed(3));
    table = updateTable(finalLeaderboards);
    leaderboardTable.remove();
    leaderboardTable = createDiv(table);
    leaderboardTable.position(20, 5);

    bestCar = ga.evolve(finalLeaderboards);
    // console.log(bestCar);
    bestInfo = updateBestInfo(bestCar);
    bestCarTable.remove();
    bestCarTable = createDiv(bestInfo);
    bestCarTable.position(width - 200, 5);

    race.setCars(ga.cars);
    race.start();
}

function updateTable(leaderboards) {
    let table = "<h5>Leader Board of generation " + generation + "</h5>";
    table += "<table><tr><th>Rank</th><th>Name</th><th>Fitness</th></tr>";

    // console.log(leaderboards[0].progress.toFixed(3));
    for (let i = 0; i < popSize; i++) {
        table += "<tr><td>" + (i + 1) + "</td><td>" + leaderboards[i].car.name + "</td><td>" + leaderboards[i].progress.toFixed(3) + "</td></tr>"
    }

    table += "</table>";
    return table;
}

function updateBestInfo(bestCar) {
    let bestInfo = "<h5>Best Car So Far:</h5><h5>" + bestCar.name + " of generation " + bestGeneration + "</h5><h5>with fitness: " + bestCar.progress.toFixed(3) + "</h5>";
    bestInfo += "<table><tr><th>Angle</th><th>Magnitude</th></tr>";

    for (let i = 0; i < Car.angAmount * 2; i += 2) {
        bestInfo += "<tr><th>" + bestCar.feats[i].toFixed(1) + "</th><th>" + bestCar.feats[i + 1].toFixed(1) + "</th></tr>";
    }

    bestInfo += "<table><tr><th>Vertex</th><th>Radius</th></tr>";

    for (let i = Car.angAmount * 2; i < Car.angAmount * 2 + Car.wheAmount * 2; i += 2) {
        bestInfo += "<tr><th>" + bestCar.feats[i].toFixed(1) + "</th><th>" + bestCar.feats[i + 1].toFixed(1) + "</th></tr>";
    }

    return bestInfo;
}