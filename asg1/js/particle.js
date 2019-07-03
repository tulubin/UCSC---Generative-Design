// Particle:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

// let Particle = function (position) {
//     this.acceleration = createVector(0, 0.05);
//     this.force = createVector(random(-1, 1), random(-1, 0));
//     this.position = position.copy();
//     this.lifetime = 255;

//     this.scale = random(1, 20);
//     this.color = [random(0, 255), random(0, 255), random(0, 255)];
// };

// Particle.prototype.run = function () {
//     this.update();
//     this.display();
// };

// // Method to update position
// Particle.prototype.update = function () {
//     this.force.add(this.acceleration);
//     this.position.add(this.force);
//     this.lifetime -= 2;
//     if (this.position.y > height) {
//         this.position.y = 0;
//     }
//     this.diameter = this.scale;
// };

// // Method to display
// Particle.prototype.display = function () {
//     stroke(200, this.lifetime);
//     strokeWeight(2);
//     fill(this.color);
//     ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
// };

// // Is the particle still useful?
// Particle.prototype.isDead = function () {
//     return this.lifetime < 0;
// };


var Particle = function (position) {
    this.position = position;
    this.scale = random(0, 1);
    this.speed = createVector(0, random(0, 10));
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.lifetime = 240000;
}

var theyExpand = 1;

// use FFT bin level to change speed and diameter
Particle.prototype.update = function (someLevel) {
    this.position.y += this.speed.y / (someLevel * 2);
    if (this.lifetime < 0 || this.position.y > height) {
        this.position.y = 0;
        this.lifetime = 240000;
    }
    this.diameter = map(someLevel, 0, 1, 0, 100) * this.scale * theyExpand;
    this.lifetime -= 1;
}

Particle.prototype.draw = function () {
    fill(this.color);
    ellipse(
        this.position.x, this.position.y,
        this.diameter, this.diameter
    );
}

Particle.prototype.isDead = function () {
    return this.lifetime < 0;
}