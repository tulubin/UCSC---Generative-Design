class GenerativeGrammar {
    constructor(rules) {
        this.x = width / 2;
        this.y = height / 2;
        this.s = 10;
        this.angle = radians(90);
        this.rules = rules;
        this.stack = [];
    }

    expand(axiom, n) {
        let s = axiom;

        // Generations
        for (let i = 0; i < n; i++) {
            console.log("Generations " + i);

            let ns = "";
            // Iterate on every character of s expanding nonterminals
            for (let j = 0; j < s.length; j++) {

                // If the character has a rule in this rules, it is a nonterminal
                if (s[j] in this.rules) {
                    ns += this.rules[s[j]];
                } else {
                    ns += s[j];
                }

                console.log(ns);
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
            switch (s[i]) {
                case "+":
                    this.angle += radians(theta);
                    break;
                case "-":
                    this.angle -= radians(theta);
                    break;
                case "[":
                    this.stack.push([this.x, this.y]);
                    break;
                case "]":
                    endShape();
                    beginShape();
                    let xy = this.stack.pop();
                    this.x = xy[0];
                    this.y = xy[1];
                    vertex(this.x, this.y);
                    break;
                case "F":
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                case "G":
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