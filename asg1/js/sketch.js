// Main:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let soundFile;
let fft;
let smoothing = 0.5; // play with this, between 0 and .99
let binCount = 128; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
let particles = new Array(binCount);
let spectrum;
let particleSystem;
let paused = 1;

function preload() {
    soundFormats('mp3', 'ogg');
    soundFile = loadSound('assets/audio/BGM.mp3');
}

function setup() {
    // createCanvas(720, 400);
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    // soundFile.setVolume(0.1);
    // soundFile.play();
    // initialize the FFT, plug in our variables for smoothing and binCount
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(soundFile);

    particleSystem = new ParticleSystem();
    // particleSystem = new ParticleSystem(createVector(width / 2, 50))

    // instantiate the particles.
    // for (let i = 0; i < particles.length; i++) {
    //     let x = map(i, 0, binCount, 0, width * 2);
    //     let y = random(0, height);
    //     let position = createVector(x, y);
    //     particles[i] = new Particle(position);
    // }

}

function draw() {
    background('white');

    if (paused) {
        textSize(32);
        text('Click To Play', windowWidth / 2, windowHeight / 2);
    }
    // particleSystem.addParticle();

    // background(0, 0, 0, 100);

    // returns an array with [binCount] amplitude readings from lowest to highest frequencies
    spectrum = fft.analyze(binCount);

    particleSystem.run();
    // update and draw all [binCount] particles!
    // Each particle gets a level that corresponds to
    // the level at one bin of the FFT spectrum. 
    // This level is like amplitude, often called "energy."
    // It will be a number between 0-255.
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function mouseClicked(event) {
    if (paused) {
        soundFile.play();
        paused = !paused;
    } else {
        soundFile.pause();
        paused = !paused;
    }
}