function generateLikes(avgLikes, rng) {
    const integerPart = Math.floor(avgLikes);
    const fractionPart = avgLikes - integerPart;

    return integerPart + (rng() < fractionPart ? 1 : 0);
}

module.exports = { generateLikes };