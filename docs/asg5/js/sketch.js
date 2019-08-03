
let isClicked = false;
let midiPlayer;
let markov;


// const createTestCafe = require('testcafe');
// let testcafe = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    button = createButton('Play');
    button.position(width - 80, 20);
    button.mousePressed(onButtonClicked);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);

    markov = new MarkovChain();
}

function draw() {
    midiPlayer.draw();
}

function onButtonClicked() {
    isClicked = !isClicked;

    if (isClicked) {
        // console.log("start");
        button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
        button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function onMIDIsLoaded(pianoRolls) {
    // console.log(midiPlayer.pianoRoll2Text(pianoRolls[0]));
    let midiText = "";
    for (const pianoRoll of pianoRolls) {
        // midiPlayer.setPianoRoll(pianoRoll, tsCallback);
        // Encode the piano roll (2D array) as string
        let temp = midiPlayer.pianoRoll2Text(pianoRoll);
        midiText += "# " + temp + " ";
    }
    midiText += "#";
    // let pianoRoll = random(pianoRolls);
    let midiArr = midiText.split(" ");
    let trainingData = markov.train(midiArr);
    let piece = markov.generatePiece(trainingData);
    // console.log(trainingData);
    console.log(piece);
    
    
    let midi = midiPlayer.text2Midi(piece);
    
    let midiData = midiPlayer.parseMidi(midi);
    let pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration, midiData.notes);
    
    midiPlayer.setPianoRoll(pianoRoll, tsCallback);
}

function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}
