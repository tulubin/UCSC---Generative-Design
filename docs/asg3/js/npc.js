let newGrammar;
class NPC {
    constructor() {
    }


    generateGrammer() {
        // newGrammar attributes
        let axiom = "F";
        let rules = { "F": "FF+[+F-F-F]-[-F+F+F]" };
        // let terms = ["a", "b"];
        // let nterms = ["A", "B"];

        newGrammar = new GenerativeGrammar(rules);
        let s = newGrammar.expand(axiom, 4);
        // newGrammar.expand(axiom, 2);
        newGrammar.drawString(s, 25);
    }
}