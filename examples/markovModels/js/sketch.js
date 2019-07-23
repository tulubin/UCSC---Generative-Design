let ilegalChars = { " ": 0 };
let name = "";

function setup() {
    createCanvas(500, 500);
    textSize(24);
    let pd = train();
    name = generateName(pd);
    console.log(pd);
    // console.log(c);
}

function draw() {
    background(225);
    text(name, width / 2, height / 2);
}

function generateName(pd) {
    let nState = sample(pd, "#");
    let name = "";
    while (nState !== "#") {
        name += nState;
        nState = sample(pd, nState);
    }
    return name;
}

function train() {
    let pd = {};
    // Load all states
    for (let name of names) {
        name = "#" + name + "#";

        for (let c of name) {

            c = c.toLowerCase();
            if (!(c in ilegalChars) && !(c in pd)) {
                // create a new state for this character
                pd[c] = {};
            }
        }
    }

    // Estimate probablity distribution
    for (let name of names) {
        name = "#" + name.toLowerCase() + "#";
        for (let i = 0; i < name.length - 1; i++) {
            let cState = name[i];
            if (cState in pd) {
                let nState = name[i + 1];
                if (!(nState in pd[cState])) {
                    pd[cState][nState] = 0;
                }

                pd[cState][nState] += 1;
            }
        }
    }
    // Normalize pd
    for (const cState in pd) {
        let currTotal = 0;
        for (const nState in pd[cState]) {
            currTotal += pd[cState][nState];
        }
        for (const nState in pd[cState]) {
            pd[cState][nState] /= currTotal;
        }

    }
    return pd;
}

function sample(pd, iniState) {
    let r = random();
    let probSofar = 0;

    for (let nState in pd[iniState]) {
        probSofar += pd[iniState][nState];
        if (r < probSofar) {
            return nState;
        }
    }
}