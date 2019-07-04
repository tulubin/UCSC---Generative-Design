// ParticleSystem:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let ParticleSystem = function () {
    for (var i = 0; i < particles.length; i++) {
        var x = map(i, 0, binCount, 0, width * 2);
        var y = 0;
        var position = createVector(x, y);
        particles[i] = new Particle(position);
    }
};

ParticleSystem.prototype.create = function () {
    for (var i = 0; i < binCount; i++) {
        var level = map(spectrum[i], 0, 255, 0, 1);
        particles[i].update(level);
        particles[i].draw();
        particles[i].position.x = map(i, 0, binCount / 2, 0, width);
        
    }
};