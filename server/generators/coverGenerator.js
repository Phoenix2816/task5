function hashColor(rng) {
    const h = Math.floor(rng() * 360);
    return `hsl(${h}, 70%, 55%)`;
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
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
            viewBox="0 0 500 500"
        >
            ${content}
        </svg>
    `;
}

function label(title, artist) {
    return `
        <rect
            x="25"
            y="380"
            width="450"
            height="95"
            rx="12"
            fill="rgba(0,0,0,0.45)"
        />

        <text
            x="40"
            y="425"
            fill="white"
            font-size="28"
            font-family="Arial"
            font-weight="bold"
        >
            ${escapeXML(title)}
        </text>

        <text
            x="40"
            y="455"
            fill="rgba(255,255,255,0.85)"
            font-size="18"
            font-family="Arial"
        >
            ${escapeXML(artist)}
        </text>
    `;
}

function vinylCover(title, artist, rng) {
    const center = hashColor(rng);

    const rings = Array.from(
        { length: 24 },
        (_, i) => `
            <circle
                cx="250"
                cy="220"
                r="${70 + i * 5}"
                fill="none"
                stroke="#222"
                stroke-width="1"
            />
        `
    ).join("");

    return svgWrap(`
        <rect width="500" height="500" fill="#111"/>

        <circle
            cx="250"
            cy="220"
            r="180"
            fill="#000"
        />

        ${rings}

        <circle
            cx="250"
            cy="220"
            r="55"
            fill="${center}"
        />

        <circle
            cx="250"
            cy="220"
            r="10"
            fill="#eee"
        />

        ${label(title, artist)}
    `);
}

function equalizerCover(title, artist, rng) {
    const bars = [];

    for (let i = 0; i < 24; i++) {
        const h = 60 + rng() * 250;

        bars.push(`
            <rect
                x="${20 + i * 19}"
                y="${330 - h}"
                width="12"
                height="${h}"
                fill="${hashColor(rng)}"
                rx="3"
            />
        `);
    }

    return svgWrap(`
        <rect width="500" height="500" fill="#111827"/>
        ${bars.join("")}
        ${label(title, artist)}
    `);
}

function sunsetCover(title, artist) {
    return svgWrap(`
        <defs>
            <linearGradient id="sky">
                <stop offset="0%" stop-color="#ff7a59"/>
                <stop offset="100%" stop-color="#6a00ff"/>
            </linearGradient>
        </defs>

        <rect
            width="500"
            height="500"
            fill="url(#sky)"
        />

        <circle
            cx="250"
            cy="180"
            r="90"
            fill="#ffd54a"
        />

        <rect
            y="280"
            width="500"
            height="220"
            fill="#111"
        />

        ${label(title, artist)}
    `);
}

function mountainCover(title, artist, rng) {
    const c1 = hashColor(rng);
    const c2 = hashColor(rng);

    return svgWrap(`
        <rect width="500" height="500" fill="#0f172a"/>

        <polygon
            points="0,320 120,150 260,320"
            fill="${c1}"
        />

        <polygon
            points="120,320 300,120 500,320"
            fill="${c2}"
        />

        <polygon
            points="0,380 160,220 350,380"
            fill="#475569"
        />

        ${label(title, artist)}
    `);
}

function waveCover(title, artist, rng) {
    const paths = [];

    for (let i = 0; i < 8; i++) {
        const y = 90 + i * 35;

        paths.push(`
            <path
                d="
                M0 ${y}
                C100 ${y - 30}
                 150 ${y + 30}
                 250 ${y}
                C350 ${y - 30}
                 400 ${y + 30}
                 500 ${y}
                "
                stroke="${hashColor(rng)}"
                stroke-width="8"
                fill="none"
            />
        `);
    }

    return svgWrap(`
        <rect width="500" height="500" fill="#081018"/>
        ${paths.join("")}
        ${label(title, artist)}
    `);
}

function cityCover(title, artist, rng) {
    const buildings = [];

    for (let i = 0; i < 15; i++) {
        const width = 20 + rng() * 35;
        const height = 100 + rng() * 220;
        const x = i * 34;

        buildings.push(`
            <rect
                x="${x}"
                y="${350 - height}"
                width="${width}"
                height="${height}"
                fill="${hashColor(rng)}"
            />
        `);
    }

    return svgWrap(`
        <rect width="500" height="500" fill="#050505"/>

        <circle
            cx="400"
            cy="90"
            r="40"
            fill="#facc15"
        />

        ${buildings.join("")}

        ${label(title, artist)}
    `);
}

function neonGridCover(title, artist, rng) {
    const lines = [];

    for (let i = 0; i < 12; i++) {
        const pos = i * 40;

        lines.push(`
            <line
                x1="${pos}"
                y1="0"
                x2="${pos}"
                y2="500"
                stroke="${hashColor(rng)}"
                opacity="0.5"
            />
        `);

        lines.push(`
            <line
                x1="0"
                y1="${pos}"
                x2="500"
                y2="${pos}"
                stroke="${hashColor(rng)}"
                opacity="0.5"
            />
        `);
    }

    return svgWrap(`
        <rect width="500" height="500" fill="#050816"/>
        ${lines.join("")}
        ${label(title, artist)}
    `);
}

function retroCover(title, artist, rng) {
    const stripes = [];

    for (let i = 0; i < 10; i++) {
        stripes.push(`
            <rect
                x="0"
                y="${i * 50}"
                width="500"
                height="50"
                fill="${hashColor(rng)}"
            />
        `);
    }

    return svgWrap(`
        ${stripes.join("")}
        ${label(title, artist)}
    `);
}

function generateCover(title, artist, rng) {
    const styles = [
        vinylCover,
        equalizerCover,
        sunsetCover,
        mountainCover,
        waveCover,
        cityCover,
        neonGridCover,
        retroCover
    ];

    const style =
        styles[
            Math.floor(rng() * styles.length)
        ];

    const svg = style(
        title,
        artist,
        rng
    );

    return Buffer
        .from(svg)
        .toString("base64");
}

module.exports = { generateCover };
