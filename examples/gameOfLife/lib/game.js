class GameOfLife {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.generation = 0;

        // Create a 2D array with initializations
        this.cells = this.initGrid(w, h);

        // for (let j = 0; j < h; j++) {

        // }

        this.cells = this.initGrid(w, h, 0.5);

    }

    initGrid(w, h, p) {
        let grid = new Array(w).fill(0);
        for (let i = 1; i < w - 1; i++) {
            grid[i] = new Array(h).fill(0);
            for (let j = 1; j < h - 1; j++) {
                grid[i][j] = random() <= p ? 0 : 1;
            }
        }
        return grid;
    }

    evolve() {
        let nextGen = this.initGrid(this.w, this.h, 0);

        for (let i = 1; i < this.w - 1; i++) {
            for (let j = 1; j < this.h - 1; j++) {
                nextGen[i][j] = this.applyRules(i, j);

            }
        }

        this.cells = nextGen;
        this.generation++;
    }

    getAliveNeighbors(x, y) {
        let aliveNeighbor = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                if (this.cells[x + i][y + j] == 1) {
                    aliveNeighbor++;
                }
            }
        }
        return aliveNeighbor;
    }

    applyRules(x, y) {
        let aliveNeighbor = this.getAliveNeighbors(x, y);
        if (this.cells[x][y] == 1) {
            // die due to overpupolation or loneliness.
            if (aliveNeighbor >= 4) {
                // return random() <= 0.8 ? 0 : 1;
                return 0;
            } else if (aliveNeighbor <= 1) {
                // return random() <= 0.6 ? 0 : 1;
                return 0;
            }
        } else if (aliveNeighbor == 3) {
            return 1;
        }
        return this.cells[x][y];
    }



    draw(cellSize) {
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.cells[i][j] == 1) {
                    fill(0);
                } else {
                    fill(255);
                }

                rect(i * cellSize, j * cellSize, cellSize, cellSize);
            }

        }

    }
}