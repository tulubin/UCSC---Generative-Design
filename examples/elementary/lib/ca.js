class CellularAutomata {
    constructor(size, ruleset) {
        this.size = size;
        this.generation = 0;
        this.cells = new Array(this.size).fill(0);
        this.cells[size / 2] = 1;

        this.ruleset = ruleset;
    }

    evolve() {
        let nextGen = new Array(this.size).fill(0);

        // Evolve each individual cell
        for (let i = 1; i < this.size - 1; i++) {
            // Find the neighbors
            let left = this.cells[i - 1];
            let middle = this.cells[i];
            let right = this.cells[i + 1];

            nextGen[i] = this.applyRules(left, middle, right);
        }
        this.cells = nextGen;
        this.generation++;
    }

    applyRules(left, middle, right) {
        // Interprets the neighborhood as a binary number
        let bin = "" + left + middle + right;

        // Parses the binary as a decimal number
        let index = parseInt(bin, 2);

        return this.ruleset[index];
    }

    

    draw(cellW) {
        for (let i = 0; i < this.size; i++) {
            if (this.cells[i] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * cellW, this.generation * cellW, cellW, cellW);
        }
        
    }
}