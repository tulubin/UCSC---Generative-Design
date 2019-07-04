// Sketch:
// Code originally from https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js

let soundFile;
let fft;
let smoothing = 0.5; // play with this, between 0 and .99
let binCount = 64; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
let particles = new Array(binCount);
let spectrum;
let particleSystem;
let paused = 1;
let FRAMERATE = 60;

function preload() {
    soundFormats('mp3', 'ogg');
    soundFile = loadSound('assets/audio/BGM.mp3');
}

function setup() {
    // createCanvas(720, 400);
    createCanvas(windowWidth, windowHeight);
    frameRate(FRAMERATE);
    noStroke();
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(soundFile);

    particleSystem = new ParticleSystem();
}

function draw() {
    background('white');

    if (paused) {
        textSize(32);
        text('Click To Play', windowWidth / 2, windowHeight / 2);
    }
    spectrum = fft.analyze(binCount);

    particleSystem.create();
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