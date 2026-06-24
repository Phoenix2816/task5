function hashColor(rng) {
    const h = Math.floor(rng() * 360);
    return `hsl(${h}, 70%, 55%)`;
}

function hashColorSoft(rng) {
    const h = Math.floor(rng() * 360);
    return `hsl(${h}, 55%, 65%)`;
}

function escapeXML(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function svgWrap(content) {
    return `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
            viewBox="0 0 500 500">
            ${content}
        </svg>
    `;
}

function label(title, artist) {
    return `
        <rect x="20" y="380" width="460" height="95" rx="14"
            fill="rgba(0,0,0,0.45)" />

        <text x="40" y="425" fill="white"
            font-size="28" font-family="Arial" font-weight="bold">
            ${escapeXML(title)}
        </text>

        <text x="40" y="455" fill="rgba(255,255,255,0.85)"
            font-size="18" font-family="Arial">
            ${escapeXML(artist)}
        </text>
    `;
}

/* ---------------- BACKGROUNDS ---------------- */

function gradientBackground(rng) {
    return `
        <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${hashColor(rng)}"/>
                <stop offset="100%" stop-color="${hashColor(rng)}"/>
            </linearGradient>
        </defs>
        <rect width="500" height="500" fill="url(#bg)"/>
    `;
}

function spaceBackground(rng) {
    let stars = "";
    for (let i = 0; i < 120; i++) {
        stars += `<circle cx="${rng()*500}" cy="${rng()*500}" r="${rng()*2}" fill="white"/>`;
    }

    return `
        <rect width="500" height="500" fill="#05010a"/>
        ${stars}
    `;
}

function neonGridBackground(rng) {
    let lines = "";
    for (let i = 0; i < 12; i++) {
        lines += `
            <line x1="${i*40}" y1="0" x2="${i*40}" y2="500"
                stroke="${hashColor(rng)}" opacity="0.4"/>
            <line x1="0" y1="${i*40}" x2="500" y2="${i*40}"
                stroke="${hashColor(rng)}" opacity="0.4"/>
        `;
    }

    return `
        <rect width="500" height="500" fill="#060818"/>
        ${lines}
    `;
}

function retroBackground(rng) {
    let s = "";
    for (let i = 0; i < 10; i++) {
        s += `<rect x="0" y="${i*50}" width="500" height="50"
            fill="${hashColor(rng)}"/>`;
    }
    return s;
}

/* ---------------- SUBJECTS ---------------- */

function vinylSubject(rng) {
    return `
        <circle cx="250" cy="220" r="170" fill="#000"/>
        <circle cx="250" cy="220" r="60" fill="${hashColor(rng)}"/>
        <circle cx="250" cy="220" r="12" fill="#fff"/>
    `;
}

function equalizerSubject(rng) {
    let bars = "";
    for (let i = 0; i < 20; i++) {
        const h = 50 + rng() * 200;
        bars += `
            <rect x="${60+i*18}" y="${300-h}" width="12" height="${h}"
                fill="${hashColor(rng)}"/>
        `;
    }
    return bars;
}

function sunSubject(rng) {
    return `
        <circle cx="250" cy="180" r="90" fill="${hashColor(rng)}"/>
        <circle cx="250" cy="180" r="60" fill="${hashColorSoft(rng)}"/>
    `;
}

function geometricSubject(rng) {
    let s = "";
    for (let i = 0; i < 18; i++) {
        s += `<circle cx="${rng()*500}" cy="${rng()*400}" r="${20+rng()*40}"
            fill="${hashColor(rng)}"/>`;
    }
    return s;
}

/* ---------------- MAIN ---------------- */

function generateCover(title, artist, rng) {
    const backgrounds = [
        gradientBackground,
        spaceBackground,
        neonGridBackground,
        retroBackground
    ];

    const subjects = [
        vinylSubject,
        equalizerSubject,
        sunSubject,
        geometricSubject
    ];

    const bg = backgrounds[Math.floor(rng() * backgrounds.length)](rng);
    const subject = subjects[Math.floor(rng() * subjects.length)](rng);

    const svg = svgWrap(`
        ${bg}
        ${subject}
        ${label(title, artist)}
    `);

    return Buffer.from(svg).toString("base64");
}

module.exports = { generateCover };
