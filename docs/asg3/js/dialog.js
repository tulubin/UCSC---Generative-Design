class DialogBox {
    constructor() {
    }

    draw() {
        manuallyDraw();
        // Dialog Box
        rectMode(CORNER);
        fill(225);
        strokeWeight(4);
        stroke(51);
        rect(0, 0, width, height / 2);

        // Text
        fill(0, 100, 255);
        strokeWeight(3);
        stroke(51);
        textSize(32);
        text(this.text1, 0, 0, width, height / 2);

        // Response
        fill(0, 255, 0);
        strokeWeight(2);
        stroke(51);
        textSize(16);
        text(this.text2, width * 0.8, height / 2 - 25, 200, 20);

    }

    changeText1(t) {
        this.text1 = t;
    }
    changeText2(t) {
        this.text2 = t;
    }
}