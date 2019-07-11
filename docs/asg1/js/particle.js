// Particle:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let MAX_LIFETIME = 50;
let initX = 0;
let initY = 100;
let initZ = 10000;

var Particle = function (position) {
    this.position = position;
    this.scale = random(0.2, 0.5);
    this.speed = random(1, 50);

    // this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.colorX = map(noise(initX, 0), 0.2, 0.8, 0, 255);
    this.colorY = map(noise(initY, 0), 0.2, 0.8, 0, 255);
    this.colorZ = map(noise(initZ, 0), 0.2, 0.8, 0, 255);
    this.color = [this.colorX, this.colorY, this.colorZ];
    this.lifetime = MAX_LIFETIME;
    this.timeScale = 1;
    initX += 0.1;
    initY += 0.2;
    initZ += 0.3;
}

Particle.prototype.update = function (level) {
    this.position.y += this.speed / map(level, 0, 1, 0, 10);
    if (this.lifetime < 0 || this.position.y > height) {
        this.position.y = 0;
        this.lifetime = MAX_LIFETIME;
    }

    if (this.lifetime >= MAX_LIFETIME * 0.2) {
        this.timeScale = MAX_LIFETIME / this.lifetime;
    } else {
        this.timeScale = Math.max(1, this.lifetime);
    }

    this.diameter = map(level, 0, 1, 0, 200) * this.scale * this.timeScale;
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
}

Particle.prototype.isDead = function () {
    return this.lifetime < 0;
}