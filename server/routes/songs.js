const express = require("express");
const { createRng } = require("../utils/seed");
const { generateSong } = require("../generators/songGenerator");
const { generateLikes } = require("../generators/likesGenerator");
const { generateCover } = require("../generators/coverGenerator");

const seedrandom = require("seedrandom");
const router = express.Router();
const PAGE_SIZE = 20;

router.get("/", (req, res) => {
    const {
        page = 1,
        seed = 12345,
        region = "en-US",
        likes = 3.7
    } = req.query;

    const songs = [];
    const pageNumber = Number(page);
    const startIndex = (pageNumber - 1) * PAGE_SIZE + 1;
    const endIndex = startIndex + PAGE_SIZE - 1;

    for (let index = startIndex; index <= endIndex; index++) {
        const contentRng = createRng(seed, pageNumber, index);
        const song = generateSong(index, contentRng, region, seed, pageNumber);

        song.cover = generateCover(
            song.title,
            song.artist,
            contentRng
        );

        const likesRng = seedrandom(`${seed}_${index}_likes`);
        song.likes = generateLikes(Number(likes), likesRng);
        song.musicSeed = `${seed}_${index}`;
        songs.push(song);
    }

    res.json({
        page: pageNumber,
        pageSize: PAGE_SIZE,
        songs
    });
});

module.exports = router;