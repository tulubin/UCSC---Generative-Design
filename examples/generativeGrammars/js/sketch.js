let lsystem;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    // Lsystem attributes
    let axiom = "F";
    let rules = { "F": "FF+[+F-F-F]-[-F+F+F]" };
    // let terms = ["a", "b"];
    // let nterms = ["A", "B"];

    lsystem = new LSystem(rules);
    let s = lsystem.expand(axiom, 4);
    // lsystem.expand(axiom, 2);
    lsystem.drawString(s, 25);
}

function draw() {

}