let newGrammar;

class NPC {
    constructor() {
    }

    draw() {
        if (!talking) {
            timeX += NPC_SPEED;
            timeY += NPC_SPEED;
            if (distanceBetween(playerX, playerY, npcX, npcY) < 50) {
                textSize(16);
                fill(150);
                text('Press SPACE to talk', npcX + 15, npcY - 15);
            }
        }
        npcX = noise(timeX) * width;
        npcY = noise(timeY) * height;
        fill(51);
        ellipse(npcX, npcY, BODYSIZE, BODYSIZE);
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