function bfs(init, end, adj, goalTest) {
    let queue = [init];
    let visited = { init: null };

    // console.log(queue);
    while (queue.length > 0) {
        // Apply DFS strategy to expand node
        let cNode = queue.shift();


        // check if cNode is the goal
        if (goalTest(cNode, end)) {
            return pathToGoal(init, end, visited);
        }

        // Iterate on the list of adjacent nodes

        for (let cNext of adj(cNode)) {
            if (!(cNext in visited)) {
                visited[cNext] = cNode;
                queue.push(cNext);

            } else {
                continue;
            }
        }
    }

    return null;
}

function pathToGoal(init, goal, visited) {
    let path = [];
    let n = goal;

    while (n != init) {
        path.push(n);
        n = visited[n];

    }

    return path;
}

