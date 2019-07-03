// let system;

// function setup() {
//     createCanvas(720, 400);
//     system = new ParticleSystem(createVector(width / 2, 50));
// }

// function draw() {
//     background(51);
//     system.addParticle();
//     system.run();
// }

/*
  Analyze the frequency spectrum with FFT (Fast Fourier Transform)
  Draw a 1024 particles system that represents bins of the FFT frequency spectrum. 
  Example by Jason Sigal
 */
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

var mic, soundFile; // input sources, press T to toggleInput()

var fft;
var smoothing = 0.8; // play with this, between 0 and .99
var binCount = 1024; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
var particles = new Array(binCount);


function setup() {
    c = createCanvas(windowWidth, windowHeight);
    noStroke();

    soundFile = createAudio('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
    mic = new p5.AudioIn();
    mic.start();

    // initialize the FFT, plug in our variables for smoothing and binCount
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(mic);

    // instantiate the particles.
    for (var i = 0; i < particles.length; i++) {
        var x = map(i, 0, binCount, 0, width * 2);
        var y = random(0, height);
        var position = createVector(x, y);
        particles[i] = new Particle(position);
    }
}

function draw() {
    background(0, 0, 0, 100);

    // returns an array with [binCount] amplitude readings from lowest to highest frequencies
    var spectrum = fft.analyze(binCount);

    // update and draw all [binCount] particles!
    // Each particle gets a level that corresponds to
    // the level at one bin of the FFT spectrum. 
    // This level is like amplitude, often called "energy."
    // It will be a number between 0-255.
    for (var i = 0; i < binCount; i++) {
        var thisLevel = map(spectrum[i], 0, 255, 0, 1);

        // update values based on amplitude at this part of the frequency spectrum
        particles[i].update(thisLevel);

        // draw the particle
        particles[i].draw();

        // update x position (in case we change the bin count while live coding)
        particles[i].position.x = map(i, 0, binCount, 0, width * 2);
    }
}

// ================
// Helper Functions
// ================

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function keyPressed() {
    if (key == 'T') {
        toggleInput();
    }
}

// To prevent feedback, mic doesnt send its output.
// So we need to tell fft to listen to the mic, and then switch back.
function toggleInput() {
    if (soundFile.isPlaying()) {
        soundFile.pause();
        mic.start();
        fft.setInput(mic);
    } else {
        soundFile.play();
        mic.stop();
        fft.setInput(soundFile);
    }
}