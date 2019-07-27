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

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9, WEBGL);
    setAttributes('antialias', true);

    // Initialize box2d physics and create the world
    world = createWorld();
    camera = createCamera();

    // Create Camera
    camera.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10);
    camera.setPosition(0, 0, 0);

    ga = new GeneticAlgorithm(popSize, 0.1);
    maxIndex = Car.angAmount * 2 + Car.wheAmount * 2;

    leaderboardTable = createDiv("<table><tr><th>Rank</th><th>Car</th><th>Progress</th></tr>");
    leaderboardTable.position(20, 5);
    bestCarTable = createDiv("<table><tr><th>Generation:</th><th>/</th></tr><table><tr><th>BestCar:</th><th>/</th></tr><table><tr><th>Fitness:</th><th>/</th></tr>");
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
            camera.setPosition(firstPos.x + width / 5, firstPos.y, camera.eyeZ);
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

    table = updateTable(finalLeaderboards);
    leaderboardTable.remove();
    leaderboardTable = createDiv(table);
    leaderboardTable.position(20, 5);

    bestCar = ga.evolve(finalLeaderboards);

    bestInfo = updateBestInfo(bestCar);
    bestCarTable.remove();
    bestCarTable = createDiv(bestInfo);
    bestCarTable.position(width - 200, 5);

    race.setCars(ga.cars);
    race.start();
}

function updateTable(leaderboards) {
    let table = "<table><tr><th>Rank</th><th>Name</th><th>Fitness</th></tr>";

    for (let i = 0; i < popSize; i++) {
        table += "<tr><td>" + (i + 1) + "</td><td>" + leaderboards[i].car.name + "</td><td>" + leaderboards[i].progress.toFixed(3) + "</td></tr>"
    }

    table += "</table>";
    return table;
}

function updateBestInfo(bestCar) {
    let bestInfo = "<table><tr><th>Generation:</th><th>" + generation + "</th></tr>";
    bestInfo += "<table><tr><th>BestCar:</th><th>" + bestCar.name + "</th></tr>";
    bestInfo += "<table><tr><th>Fitness:</th><th>" + bestCar.progress.toFixed(3) + "</th></tr>";

    for (let i = 0; i < bestCar.feats.length; i++) {
        bestInfo += "<table><tr><th>" + i + ":</th><th>" + bestCar.feats[i] + "</th></tr>";
    }

    return bestInfo;
}