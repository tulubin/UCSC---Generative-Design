function generateMaze(world, init, adj) {
    let stack = [init];
    let visited = {};

    // Make the initial cel the current cell and mark it as visite
    let cNode = init;
    visited[cNode] = null;

    // WHile there are unvisted cells
    while (cNode != null) {
        // Choose randomly one of the unvisted neighbours
        let rNode = getRandomNeighbour(cNode, adj, visited);

        // if the current cell has any neighbours which have not been visisted
        if (rNode != null) {
            // Push the current cell to the stack
            stack.push(cNode);

            // Remove the wall between the current cell and the chosen cell
            removeWall(world, cNode, rNode);

            visited[rNode] = cNode;
            cNode = rNode;

        } else {
            cNode = stack.pop();
        }
    }
}

function removeWall(world, cNode, rNode) {
    let x = cNode.x - rNode.x;
    let y = cNode.y - rNode.y;

    if (x == -1) {
        // Current cell is on the left side of random cell
        world[cNode.x][cNode.y] &= 11;
        world[rNode.x][rNode.y] &= 14;
    } else if (x == 1) {
        // Current cell is on the right side of random cell
        world[cNode.x][cNode.y] &= 14;
        world[rNode.x][rNode.y] &= 11;
    }
    if (y == -1) {
        // Current cell is on the top side of random cell
        world[cNode.x][cNode.y] &= 13;
        world[rNode.x][rNode.y] &= 7;
    } else if (y == 1) {
        // Current cell is at the bottom side of random cell
        world[cNode.x][cNode.y] &= 7;
        world[rNode.x][rNode.y] &= 13;
    }
}

function getRandomNeighbour(cNode, adj, visited) {
    let unvisitedNeighbours = [];
    for (let n of adj(cNode)) {
        if (!(n in visited)) {
            unvisitedNeighbours.push(n);
        }
    }
    return random(unvisitedNeighbours);
}
