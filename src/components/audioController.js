import * as Tone from "tone";
import { playSong } from "./playSong";

let currentSongId = null;
let listeners = new Set();

function notify() {
    listeners.forEach(fn => fn(currentSongId));
}

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export async function toggleSong(song) {
    const isSame = currentSongId === song.id;

    if (isSame) {
        Tone.Transport.stop();
        Tone.Transport.cancel(0);
        currentSongId = null;
        notify();
        return false;
    }

    await playSong(song);
    currentSongId = song.id;
    notify();
    return true;
}

export function getCurrentSong() {
    return currentSongId;
}