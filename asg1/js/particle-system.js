// ParticleSystem:
// Code originally from https://p5js.org/examples/simulate-particle-system.html
let ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};