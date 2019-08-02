class Matrix {
    constructor() {

    }

    randomize(min, max) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.elems[i][j] = random(min, max);
            }
        }
    }

    map(func) {
        for(let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.elems[i][j] = func(this.elems[i][j]);
            }
        }
    }

    static fromArray(a) {
        let b = new Matrix(a.length, 1);
        for (let i = 0; i < b.rows; i++) {
            b.elems[i][0] = a[i];
        }
        return b;
    }

    static mult(a, b) {
        if (a.cols != b.rows) {
            console.log("Dimension don't match!");
            return undefined;
        }

        let c = new Matrix(a.rows, b.cols);

        for (let i = 0; i < c.rows; i++) {
            for (let j = 0; j < c.cols; j++) {
                let dot = 0;
                for (let k = 0; k < c.rows; k++) {
                    dot += a.elems[i][k] * b.elems[k][j];
                }
                c.elems[i][j] = dot;
            }

        }
        return c;
    }
}