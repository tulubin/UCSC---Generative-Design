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
let MAX_LIFETIME = 10;

var Particle = function (position) {
    this.position = position;
    this.scale = random(0.2, 0.5);
    this.speed = random(0, 15);
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.lifetime = MAX_LIFETIME;
}


// use FFT bin level to change speed and diameter
Particle.prototype.update = function (level) {
    this.position.y += this.speed / map(level, 0, 1, 0, 5);
    if (this.lifetime < 0 || this.position.y > height) {
        this.position.y = 0;
        this.lifetime = MAX_LIFETIME;
    }
    
    this.diameter = map(level, 0, 1, 0, 200) * this.scale * MAX_LIFETIME / Math.max(1, this.lifetime);
    this.lifetime -= map(level, 0, 1, 0, MAX_LIFETIME / 60);
}

Particle.prototype.draw = function () {
    fill(this.color);
    ellipse(
        this.position.x, this.position.y,
        2, this.diameter
    );
    ellipse(
        this.position.x, this.position.y,
        this.diameter, 2
    );
    // rotate(PI / 2);
}

Particle.prototype.isDead = function () {
    return this.lifetime < 0;
}