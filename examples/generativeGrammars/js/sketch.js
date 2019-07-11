let lsystem;

function setup() {
    createCanvas(500, 500);
    strokeWeight(3);
    // Lsystem attributes
    let axiom = "F+FGGG+F-F";
    let rules = { "A": "AB", "B": "b" };
    // let terms = ["a", "b"];
    // let nterms = ["A", "B"];

    lsystem = new LSystem(rules);

    // lsystem.expand(axiom, 4);
    lsystem.drawString(axiom, 90);
}

function draw() {

}