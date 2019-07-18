class GenerativeGrammar {
    constructor(ruleSet1, ruleSet2, probabilities) {
        this.x = width / 2;
        this.y = height / 2;
        this.s = 10;
        this.angle = radians(90);
        this.ruleSet1 = ruleSet1;
        this.ruleSet2 = ruleSet2;
        this.stack = [];
        this.probabilities = probabilities;
    }

    expand(axiom, n) {
        let s = axiom;

        // Generations
        for (let i = 0; i < n; i++) {

            let ns = "";
            // Iterate on every character of s expanding nonterminals
            for (let j = 0; j < s.length; j++) {

                // If the character has a rule in this ruleSet1, it is a nonterminal
                if (s[j] in this.ruleSet1) {
                    if (random() < this.probabilities[s[j]]) {
                        ns += this.ruleSet1[s[j]];
                    } else {
                        ns += this.ruleSet2[s[j]];
                    }
                } else {
                    ns += s[j];
                }


            }
            s = ns;
        }
        return s;
    }

    drawString(s, theta) {
        noFill();
        beginShape();
        vertex(this.x, this.y);
        for (let i = 0; i < s.length; i++) {
            let r = random(128, 255);
            let g = random(0, 192);
            let b = random(0, 50);
            let a = random(50, 100);
            stroke(r, g, b, a);

            switch (s[i]) {
                case "+": // rotation
                    this.angle += radians(theta);
                    break;
                case "-": // rotation
                    this.angle -= radians(theta);
                    break;
                case "[": // Save current branch
                    this.stack.push([this.x, this.y]);
                    break;
                case "]": // Return saved branch
                    endShape();
                    beginShape();
                    let xy = this.stack.pop();
                    this.x = xy[0];
                    this.y = xy[1];
                    vertex(this.x, this.y);
                    break;
                case "F": // Draw line
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                case "G": // Skip line
                    endShape();
                    beginShape();
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                default:
                    console.log("Command doesn't exist");
                    break;
            }
        }
        endShape();
    }
}