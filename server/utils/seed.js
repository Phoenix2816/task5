/* global BigInt */
const seedrandom = require("seedrandom");

function toBigIntSeed(seed) {
    if (
        typeof seed !== "string" &&
        typeof seed !== "number" &&
        typeof seed !== "bigint"
    ) {
        throw new Error("Seed must be a 64-bit integer");
    }

    const value = BigInt(seed);

    const MIN = -(1n << 63n);
    const MAX = (1n << 63n) - 1n;

    if (value < MIN || value > MAX) {
        throw new Error(
            "Seed must be between -9223372036854775808 and 9223372036854775807"
        );
    }

    return value;
}

function createRng(seed, page = 0, index = 0) {
    const bigSeed = toBigIntSeed(seed);

    const finalSeed =
        (bigSeed ^ BigInt(page) << 16n ^ BigInt(index)).toString();

    return seedrandom(finalSeed);
}

module.exports = { createRng, toBigIntSeed };