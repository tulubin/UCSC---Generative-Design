let s = 10;
let path = [];
let init = null;
let end = null;

function setup() {
    createCanvas(200, 200);

    init = createVector(0, 0);
    end = createVector(19, 19);

    world = new Array(width / s).fill(15);
    for (let i = 0; i < world.length; i++) {
        world[i] = new Array(height / s).fill(15);
    }
    generateMaze(world, init, adj);
}

function draw() {
    clear();

    for (let i = 0; i < width / s; i++) {
        for (let j = 0; j < height / s; j++) {
            if ((world[i][j] & 8) > 0) {
                // Top wall
                line(i * s, j * s, i * s + s, j * s);
            }
            if ((world[i][j] & 4) > 0) {
                // Right wall
                line(i * s + s, j * s, i * s + s, j * s + s);
            }
            if ((world[i][j] & 2) > 0) {
                // Bottom wall
                line(i * s + s, j * s + s, i * s, j * s + s);
            }
            if ((world[i][j] & 1) > 0) {
                // Left wall
                line(i * s, j * s + s, i * s, j * s);
            }
        }
    }


    // draw init
    fill(255, 0, 0);
    rect(init.x * s, init.y * s, s, s);
    // draw end
    fill(0, 100, 0);
    rect(end.x * s, end.y * s, s, s);
}
// A state here is a vector
function adj(state) {
    let adjStates = [];

    let top = createVector(state.x, state.y - 1)
    if (world[top.x][top.y] != null) {
        adjStates.push(top);
    }
    let right = createVector(state.x + 1, state.y)
    if (world[right.x] != null) {
        adjStates.push(right);
    }
    let bottom = createVector(state.x, state.y + 1)
    if (world[bottom.x][bottom.y] != null) {
        adjStates.push(bottom);
    }
    let left = createVector(state.x - 1, state.y)
    if (world[left.x] != null) {
        adjStates.push(left);
    }
    return adjStates;
}

// function mousePressed() {
//     let x = int(mouseX / s);
//     let y = int(mouseY / s);
//     if (mouseButton === LEFT) {
//         world[x][y] = 1;
//     } else if (mouseButton == RIGHT) {
//         end = createVector(x, y);
//     }
// }

// function mouseDragged() {
//     if (mouseIsPressed && mouseButton === LEFT) {
//         let x = int(mouseX / s);
//         let y = int(mouseY / s);

//         world[x][y] = 1;

//     }

// }