let ilegalChars = { "": 0, "undefined": 0 };
// let ilegalChars = {  };
// let ilegalCharsB = { "": 0, "#": 0, "undefined": 0 };

class MarkovChain {
    constructor() {

    }

    generatePiece(td) {
        let i = 500;
        let ne = this.sample(td, "#");
        let piece = "";
        while (ne !== "#" && i > 0) {
            piece += ne + " ";
            ne = this.sample(td, ne);
            i--;
        }
        let newPiece = piece.slice(0, -1);
        return newPiece;
    }

    train(midiArr) {
        let td = {};
        // Estimate probability distribution
        for (let i = 0; i < midiArr.length; i++) {
            const ce = midiArr[i];
            if (!(ce in td) && !(ce in ilegalChars)) {
                td[ce] = {};
            }
            if (ce in td) {
                let ne = midiArr[i + 1];

                if (!(ne in td[ce]) && !(ne in ilegalChars)) {
                    td[ce][ne] = 0;
                }
                if (ne in td[ce]) {
                    td[ce][ne] += 1;
                }
            }
        }
        // Normalize td
        for (let ce in td) {
            let ctotal = 0;
            for (let ne in td[ce]) {
                ctotal += td[ce][ne];
            }

            for (let ne in td[ce]) {
                td[ce][ne] /= ctotal;
            }
        }
        return td;
    }

    sample(td, e) {
        let r = random();
        let probSoFar = 0;

        for (let ne in td[e]) {
            probSoFar += td[e][ne];

            if (r <= probSoFar) {
                return ne;
            }
        }
    }
}