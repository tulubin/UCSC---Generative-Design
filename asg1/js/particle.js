// Particle:
// Code originally from https://p5js.org/examples/simulate-particle-system.html
let Particle = function (position) {
    this.acceleration = createVector(0, 0.05);
    this.force = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifetime = 255;

    this.scale = random(1, 20);
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
};

Particle.prototype.run = function () {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function () {
    this.force.add(this.acceleration);
    this.position.add(this.force);
    this.lifetime -= 2;
    if (this.position.y > height) {
        this.position.y = 0;
    }
    this.diameter = this.scale;
};

// Method to display
Particle.prototype.display = function () {
    stroke(200, this.lifetime);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
    return this.lifetime < 0;
};