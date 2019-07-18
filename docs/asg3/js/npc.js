let newGrammar;

class NPC {
    constructor() {
    }

    draw() {
        if (!talking) {
            timeX += NPC_SPEED;
            timeY += NPC_SPEED;
            if (distanceBetween(playerX, playerY, npcX, npcY) < 50) {
                fill(150);
                strokeWeight(1);
                stroke(51);
                textSize(16);
                text('Press SPACE to talk', npcX, npcY - 25);
            }
        }
        npcX = noise(timeX) * width;
        npcY = noise(timeY) * height / 2 + height / 2;
        fill(51);
        if (npcX < BODYSIZE) {
            npcX = BODYSIZE;
        }
        if (npcX > width - BODYSIZE) {
            npcX = width - BODYSIZE;
        }
        if (npcY < height / 2 + BODYSIZE) {
            npcY = height / 2 + BODYSIZE
        }
        if (npcY > height - BODYSIZE) {
            npcY = height - BODYSIZE;
        }
        ellipse(npcX, npcY, BODYSIZE, BODYSIZE);
    }

    generateArt(axiom) {
        // newGrammar attributes
        let generations = 5;
        let ruleSet1 = { "F": "F-F++F+F-F-F", "G": "G+F-G" };
        let ruleSet2 = { "F": "F-F++F+F-F-G", "G": "G+G" };
        let probabilities = { "F": 0.8, "G": 0.3 };
        newGrammar = new GenerativeGrammar(ruleSet1, ruleSet2, probabilities);
        let s = newGrammar.expand(axiom, generations);
        // newGrammar.expand(axiom, 2);
        newGrammar.drawString(s, 72);
    }
}