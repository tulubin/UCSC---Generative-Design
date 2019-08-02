class MLP {
    constructor(inputSize, hiddenSize, outputSize) {
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;

        this.ixh = new Matrix(this.hiddenSize, this.inputSize);
        this.ixh.randomize(-1, 1);
        this.hxo = new Matrix();
        this.hxo.randomize(-1, 1);
    }

    feedforward(X) {
        X.unshift(1);
        X = Matrix.fromArray(X);
        let H = Matrix.mult(this.ixh, X);
        H.map(this.sigmoid);
        let O = Matrix.mult(this.hxo, H);
        O.map(this.sigmoid);

        return O.elems;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

}
