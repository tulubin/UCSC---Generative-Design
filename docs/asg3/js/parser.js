let initX = 1;
let initY = 2;
let initZ = 3;

class GenerativeGrammar {
    constructor(ruleSet1, ruleSet2, probabilities) {
        this.x = width / 2;
        this.y = height / 4;
        this.length = 25;
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
        // beginShape();
        // vertex(this.x, this.y);
        for (let i = 0; i < s.length; i++) {
            // let r = random(128, 255);
            // let g = random(0, 192);
            // let b = random(0, 50);
            // let a = random(50, 100);

            let colorX = map(noise(initX, 0), 0.2, 0.8, 0, 255);
            let colorY = map(noise(initY, 0), 0.2, 0.8, 0, 255);
            let colorZ = map(noise(initZ, 0), 0.2, 0.8, 0, 255);
            initX += 0.001;
            initY += 0.002;
            initZ += 0.003;
            stroke(colorX, colorY, colorZ);

            if (this.x > 0 && this.x < width && this.y > 0 && this.y < height / 2 - 50) {
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
                        // endShape();
                        // beginShape();
                        let xy = this.stack.pop();
                        this.x = xy[0];
                        this.y = xy[1];
                        // vertex(this.x, this.y);
                        break;
                    case "L": // Draw line
                        this.x += cos(this.angle) * this.length;
                        this.y -= sin(this.angle) * this.length;
                        // vertex(this.x, this.y);
                        break;
                    case "C": // Drwa Circle
                        let radius = random(5, 20);
                        // let radius2 = random(5, 15);
                        ellipse(this.x, this.y, radius, radius);
                        this.x += cos(this.angle) * this.length;
                        this.y -= sin(this.angle) * this.length;
                        // vertex(this.x, this.y);
                        break;
                    // case "Q": // Drwa Quad
                    //     let size1 = random(2, 7);
                    //     let size2 = random(2, 7);
                    //     let size3 = random(2, 7);
                    //     let size4 = random(2, 7);
                    //     quad(this.x - size1, this.y - size1, this.x - size2, this.y + size2, this.x + size3, this.y + size3, this.x + size4, this.y - size4)
                    //     this.x += cos(this.angle) * this.length;
                    //     this.y -= sin(this.angle) * this.length;
                    //     // vertex(this.x, this.y);
                    //     break;
                    // case "T": // Drwa Triangle
                    //     let size5 = random(2, 7);
                    //     let size6 = random(2, 7);
                    //     let size7 = random(2, 7);
                    //     triangle(this.x - size5, this.y - size5, this.x + size6, this.y - size6, this.x, this.y + size7)
                    //     this.x += cos(this.angle) * this.length;
                    //     this.y -= sin(this.angle) * this.length;
                    //     // vertex(this.x, this.y);
                    //     break;
                    default:
                        console.log(s[i] + " Command doesn't exist");
                        break;
                }
            } else {
                // endShape();
                // beginShape();
                this.x = width / 2;
                this.y = height / 4;
            }

        }
        // let r = random(100, 200);
        // let g = random(100, 200);
        // let b = random(100, 200);
        // stroke(r, g, b, 100);
        // endShape();
    }
}