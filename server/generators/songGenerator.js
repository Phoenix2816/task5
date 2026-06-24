/* global BigInt */
const { fakerEN_US, fakerDE } = require("@faker-js/faker");
const Sentencer = require("sentencer");
const seedrandom = require("seedrandom");

function getFaker(region) {
    return region === "de-DE" ? fakerDE : fakerEN_US;
}

const locales = {
    "en-US": require("../locales/en-US.json"),
    "de-DE": require("../locales/de-DE.json"),
    "uk-UA": require("../locales/uk-UA.json"),
    "fr-FR": require("../locales/fr-FR.json"),
    "es-ES": require("../locales/es-ES.json")
};

function rand(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
}

function makeMotif(rng, scale, length = 4) {
    const motif = [];
    let note = Math.floor(rng() * scale.length);

    for (let i = 0; i < length; i++) {
        const move = rng();

        if (move < 0.6) {
            note += 1;
        } else if (move < 0.85) {
            note -= 1;
        } else {
            note += 2;
        }

        note = (note + scale.length) % scale.length;
        motif.push(note);
    }

    return motif;
}
function makeMelody(rng) {
    const scale = ["C", "D", "Eb", "F", "G", "Ab", "Bb"];
    const oct = [3, 4, 5];

    const motif = makeMotif(rng, scale, 4);
    const melody = [];

    const sections = ["A", "A_var", "B", "A"];

    for (const section of sections) {
        for (let i = 0; i < 4; i++) {
            let noteIndex = motif[i];

            if (section === "A_var") {
                noteIndex += rng() > 0.5 ? 1 : -1;
            }

            if (section === "B") {
                noteIndex += 2;
            }

            noteIndex = (noteIndex + scale.length) % scale.length;

            const note =
                scale[noteIndex] +
                oct[Math.floor(rng() * oct.length)];

            melody.push(note);
        }
    }

    return melody;
}

function makeBass(rng) {
    const roots = ["C2", "Eb2", "F2", "G2"];
    const bass = new Array(16).fill(null);

    let root = rand(rng, roots);

    const pattern = rng() > 0.5
        ? [0, 3, 8, 11, 14]
        : [0, 2, 4, 8, 10, 12];

    for (let i = 0; i < 16; i++) {
        if (i % (rng() > 0.5 ? 8 : 4) === 0) {
            root = rand(rng, roots);
        }

        if (pattern.includes(i)) {
            bass[i] = root;
        }
    }

    return bass;
}

function makeDrums(rng, genre = "default") {
    const kick = Array(16).fill(false);
    const snare = Array(16).fill(false);
    const hat = Array(16).fill(false);
    const velocity = Array(16).fill(0.7);

    const isTrap = genre === "trap" || genre === "hiphop";

    const groove = rng() > 0.5 ? "grooveA" : "grooveB";

    const kickPatterns = {
        grooveA: [0, 7, 8, 14],
        grooveB: [0, 8, 10]
    };

    const snarePatterns = {
        grooveA: [4, 12],
        grooveB: [4, 11]
    };

    kickPatterns[groove].forEach(i => kick[i] = true);
    snarePatterns[groove].forEach(i => snare[i] = true);

    for (let i = 0; i < 16; i++) {
        if (isTrap) {
            hat[i] = rng() > 0.25;
        } else {
            hat[i] = i % 2 === 0 || rng() > 0.7;
        }
    }

    for (let i = 0; i < 16; i++) {
        let v = 0.6 + rng() * 0.35;

        if (kick[i]) v = 1;
        if (snare[i]) v = 0.95;
        if (hat[i]) v *= (i % 4 === 0 ? 1.1 : 0.85);

        velocity[i] = Math.min(1, v);
    }

    return { kick, snare, hat, velocity };
}
function safe(arr, fallback = []) {
    return Array.isArray(arr) ? arr : fallback;
}

function configureSentencer(rng, localeData, genre) {
    Sentencer.configure({
        actions: {
            adjective: function () {
                return rand(rng, localeData.adjectives);
            },

            noun: function () {
                return rand(rng, localeData.nouns);
            },

            reaction: function () {
                return rand(rng, localeData.reviews);
            },

            genre: function () {
                return genre.toLowerCase();
            }
        }
    });
}

function generateReview(rng, genre, localeData) {
    const actions = {
        adjective: () => rand(rng, localeData.adjectives),
        noun: () => rand(rng, localeData.nouns),
        reaction: () => rand(rng, localeData.reviews),
        genre: () => genre.toLowerCase()
    };

    const patterns = [
        "A {{ adjective }} {{ noun }} that {{ reaction }}.",
        "Built on a {{ adjective }} foundation of {{ noun }}, the track {{ reaction }}.",
        "The song explores a {{ adjective }} atmosphere where {{ noun }} dominates.",
        "A {{ adjective }} interpretation of {{ noun }} within {{ genre }} music.",
        "With a {{ adjective }} sense of {{ noun }}, it {{ reaction }}.",
        "An unexpectedly {{ adjective }} piece of {{ noun }}-driven composition."
    ];

    const pattern = rand(rng, patterns);

    const SentencerLocal = require("sentencer");

    SentencerLocal.configure({ actions });

    return SentencerLocal.make(pattern);
}
function generateReaction(rng, localeData) {
    const pattern = rand(
        rng,
        localeData.reactionPatterns || ["{{verb}} {{object}}"]
    );

    return pattern
        .replace(/{{verb}}/g,
            rand(rng, localeData.verbs || ["creates"]))
        .replace(/{{object}}/g,
            rand(rng, localeData.objects || ["an impact"]))
        .replace(/{{quality}}/g,
            rand(rng, localeData.qualities || ["great depth"]));
}

function generateSong(index, rng, region, seed, page) {
    const faker = getFaker(region);
    const hashSeed =
        Number(
            BigInt(seed) % 2147483647n
        );

    faker.seed(hashSeed + index);

    const songRng = seedrandom(`${seed}_${page}_${index}`);

    const localeData = locales[region] || locales["en-US"];

    const adjectives = safe(localeData.adjectives, ["Cool"]);
    const nouns = safe(localeData.nouns, ["Sound"]);
    const genres = safe(localeData.genres, ["Pop"]);

    const randomItem = (arr) =>
        arr[Math.floor(songRng() * arr.length)];

    const genre = randomItem(genres);

    const title =
        `${randomItem(adjectives)} ${randomItem(nouns)}`;

        
    const artist =
        songRng() > 0.5
            ? faker.person.fullName()
            : `The ${faker.word.adjective()} ${faker.word.noun()}`;

    const album =
        songRng() > 0.3
            ? `${randomItem(adjectives)} ${randomItem(nouns)}`
            : localeData.single || "Single";

    const review = generateReview(
        songRng,
        genre,
        localeData
    );
    return {
        id: index,
        title,
        artist,
        album,
        genre,
        review,
        tempo: 70 + Math.floor(songRng() * 70),
        melody: makeMelody(songRng),
        bass: makeBass(songRng),
        drums: makeDrums(songRng, genre)
    };
}

module.exports = { generateSong };
