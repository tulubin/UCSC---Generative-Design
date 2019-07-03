// ParticleSystem:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let ParticleSystem = function (particles) {
    for (var i = 0; i < particles.length; i++) {
        var x = map(i, 0, binCount, 0, width * 2);
        var y = random(0, height);
        var position = createVector(x, y);
        particles[i] = new Particle(position);
        // this.particles.push(new Particle(this.origin));
    }
    // this.origin = position.copy();
    // this.particles = [];
};

// ParticleSystem.prototype.addParticle = function () {

// };

ParticleSystem.prototype.run = function (particles) {
    for (var i = 0; i < binCount; i++) {
        var thisLevel = map(spectrum[i], 0, 255, 0, 1);

        // update values based on amplitude at this part of the frequency spectrum
        particles[i].update(thisLevel);

        // draw the particle
        particles[i].draw();

        // update x position (in case we change the bin count while live coding)
        particles[i].position.x = map(i, 0, binCount, 0, width * 2);
    }

    // for (let i = this.particles.length - 1; i >= 0; i--) {
    //     let p = this.particles[i];
    //     p.run();
    //     if (p.isDead()) {
    //         this.particles.splice(i, 1);
    //     }
    // }
};