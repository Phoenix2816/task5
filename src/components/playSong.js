import * as Tone from "tone";

let parts = [];

export async function playSong(song) {
    await Tone.start();

    parts.forEach(p => p.dispose?.());
    parts = [];

    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.position = 0;

    Tone.Transport.bpm.value = song.tempo;

    const master = new Tone.Gain(0.8).toDestination();
    Tone.Destination.volume.value = -6;

    const lead = new Tone.PolySynth(Tone.Synth, {
        volume: -10,
        oscillator: { type: "triangle" },
        envelope: {
            attack: 0.02,
            decay: 0.2,
            sustain: 0.4,
            release: 0.6
        }
    }).connect(master);

    const bass = new Tone.MonoSynth({
        volume: -6,
        oscillator: { type: "sine" },
        envelope: {
            attack: 0.01,
            decay: 0.3,
            sustain: 0.6,
            release: 0.4
        }
    }).connect(master);

    const kick = new Tone.MembraneSynth({
        volume: -3,
        pitchDecay: 0.05,
        octaves: 5,
        envelope: {
            attack: 0.001,
            decay: 0.4,
            sustain: 0,
            release: 0.2
        }
    }).connect(master);

    const snare = new Tone.NoiseSynth({
        volume: -10,
        noise: { type: "white" },
        envelope: {
            attack: 0.001,
            decay: 0.18,
            sustain: 0
        }
    }).connect(master);

    const hat = new Tone.MetalSynth({
        volume: -20,
        envelope: {
            attack: 0.001,
            decay: 0.05,
            release: 0.01
        },
        harmonicity: 5,
        resonance: 800,
        modulationIndex: 10
    }).connect(master);

    const melody = new Tone.Sequence((time, note) => {
        if (note) lead.triggerAttackRelease(note, "8n", time);
    }, song.melody, "16n");

    const bassLine = new Tone.Sequence((time, note) => {
        if (note) bass.triggerAttackRelease(note, "8n", time);
    }, song.bass, "16n");

    const drums = new Tone.Sequence((time, step) => {
        const i = step;

        if (song.drums.kick[i]) {
            kick.triggerAttackRelease("C1", "8n", time, 0.95);
        }

        if (song.drums.snare[i]) {
            snare.triggerAttackRelease("16n", time, 0.85);
        }

        if (song.drums.hat[i]) {
            hat.triggerAttackRelease("32n", time, 0.35);
        }
    }, [...Array(16).keys()], "16n");

    melody.start(0);
    bassLine.start(0);
    drums.start(0);

    parts.push(melody, bassLine, drums);

    Tone.Transport.start();
}