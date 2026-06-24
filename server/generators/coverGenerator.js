function hashColor(rng) {
    const h = Math.floor(rng() * 360);

    return `hsl(${h}, 70%, 55%)`;
}

function hashColorSoft(rng) {
    const h = Math.floor(rng() * 360);

    return `hsl(${h}, 55%, 65%)`;
}

function hashColorDark(rng) {
    const h = Math.floor(rng() * 360);

    return `hsl(${h}, 65%, 35%)`;
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
            x="20"
            y="380"
            width="460"
            height="95"
            rx="14"
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
function gradientBackground(rng) {
    const c1 = hashColor(rng);
    const c2 = hashColor(rng);

    return `
        <defs>
            <linearGradient
                id="bgGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop
                    offset="0%"
                    stop-color="${c1}"
                />

                <stop
                    offset="100%"
                    stop-color="${c2}"
                />
            </linearGradient>
        </defs>

        <rect
            width="500"
            height="500"
            fill="url(#bgGradient)"
        />
    `;
}
function sunsetBackground() {
    return `
        <defs>
            <linearGradient
                id="sunsetBg"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stop-color="#ff7a59"/>
                <stop offset="100%" stop-color="#4c1d95"/>
            </linearGradient>
        </defs>

        <rect
            width="500"
            height="500"
            fill="url(#sunsetBg)"
        />

        <circle
            cx="250"
            cy="170"
            r="90"
            fill="#ffd54a"
        />

        <rect
            x="0"
            y="280"
            width="500"
            height="220"
            fill="#111"
        />
    `;
}
function synthwaveBackground(rng) {
    const lines = [];

    for (let i = 0; i < 25; i++) {
        lines.push(`
            <line
                x1="0"
                y1="${250 + i * 12}"
                x2="500"
                y2="${250 + i * 12}"
                stroke="rgba(255,255,255,0.15)"
            />
        `);
    }

    return `
        <defs>
            <linearGradient
                id="synth"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stop-color="#ff006e"/>
                <stop offset="100%" stop-color="#3a0ca3"/>
            </linearGradient>
        </defs>

        <rect
            width="500"
            height="500"
            fill="url(#synth)"
        />

        <circle
            cx="250"
            cy="170"
            r="85"
            fill="#ffd60a"
        />

        ${lines.join("")}
    `;
}
function cityBackground(rng) {
    const buildings = [];

    for (let i = 0; i < 15; i++) {
        const h = 100 + rng() * 220;

        buildings.push(`
            <rect
                x="${i * 34}"
                y="${360 - h}"
                width="${20 + rng() * 35}"
                height="${h}"
                fill="${hashColorDark(rng)}"
            />
        `);
    }

    return `
        <rect
            width="500"
            height="500"
            fill="#050505"
        />

        <circle
            cx="400"
            cy="90"
            r="40"
            fill="#facc15"
        />

        ${buildings.join("")}
    `;
}
function mountainBackground(rng) {
    return `
        <rect
            width="500"
            height="500"
            fill="#0f172a"
        />

        <polygon
            points="0,330 130,150 260,330"
            fill="${hashColor(rng)}"
        />

        <polygon
            points="140,330 320,120 500,330"
            fill="${hashColor(rng)}"
        />

        <polygon
            points="0,400 160,240 350,400"
            fill="#475569"
        />
    `;
}
function spaceBackground(rng) {
    let stars = "";

    for (let i = 0; i < 140; i++) {
        stars += `
            <circle
                cx="${rng() * 500}"
                cy="${rng() * 500}"
                r="${0.5 + rng() * 2}"
                fill="white"
            />
        `;
    }

    return `
        <rect
            width="500"
            height="500"
            fill="#030712"
        />

        ${stars}
    `;
}
function auroraBackground(rng) {
    return `
        <defs>
            <linearGradient
                id="aurora"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
            >
                <stop offset="0%" stop-color="#22c55e"/>
                <stop offset="50%" stop-color="#06b6d4"/>
                <stop offset="100%" stop-color="#7c3aed"/>
            </linearGradient>
        </defs>

        <rect
            width="500"
            height="500"
            fill="#081018"
        />

        <ellipse
            cx="180"
            cy="150"
            rx="220"
            ry="80"
            fill="url(#aurora)"
            opacity="0.45"
        />

        <ellipse
            cx="350"
            cy="220"
            rx="220"
            ry="90"
            fill="url(#aurora)"
            opacity="0.35"
        />
    `;
}
function retroBackground(rng) {
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

    return stripes.join("");
}
function neonGridBackground(rng) {
    const lines = [];

    for (let i = 0; i < 14; i++) {
        const pos = i * 40;

        lines.push(`
            <line
                x1="${pos}"
                y1="0"
                x2="${pos}"
                y2="500"
                stroke="${hashColor(rng)}"
                opacity="0.45"
            />
        `);

        lines.push(`
            <line
                x1="0"
                y1="${pos}"
                x2="500"
                y2="${pos}"
                stroke="${hashColor(rng)}"
                opacity="0.45"
            />
        `);
    }

    return `
        <rect
            width="500"
            height="500"
            fill="#050816"
        />

        ${lines.join("")}
    `;
}
function paperBackground(rng) {
    let dots = "";

    for (let i = 0; i < 250; i++) {
        dots += `
            <circle
                cx="${rng() * 500}"
                cy="${rng() * 500}"
                r="${0.4 + rng()}"
                fill="rgba(0,0,0,0.08)"
            />
        `;
    }

    return `
        <rect
            width="500"
            height="500"
            fill="#f8f4e8"
        />

        ${dots}
    `;
}
function vinylSubject(rng) {
    const rings = [];

    for (let i = 0; i < 24; i++) {
        rings.push(`
            <circle
                cx="250"
                cy="220"
                r="${70 + i * 5}"
                fill="none"
                stroke="#222"
                stroke-width="1"
            />
        `);
    }

    return `
        <circle
            cx="250"
            cy="220"
            r="180"
            fill="#000"
        />

        ${rings.join("")}

        <circle
            cx="250"
            cy="220"
            r="55"
            fill="${hashColor(rng)}"
        />

        <circle
            cx="250"
            cy="220"
            r="10"
            fill="#eee"
        />
    `;
}

function cdSubject(rng) {
    const shine = hashColorSoft(rng);

    return `
        <defs>
            <radialGradient id="cdGrad">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="45%" stop-color="${shine}"/>
                <stop offset="100%" stop-color="#999999"/>
            </radialGradient>
        </defs>

        <circle
            cx="250"
            cy="220"
            r="150"
            fill="url(#cdGrad)"
        />

        <circle
            cx="250"
            cy="220"
            r="28"
            fill="#111"
        />

        <circle
            cx="250"
            cy="220"
            r="95"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            stroke-width="3"
        />
    `;
}

function cassetteSubject(rng) {
    return `
        <rect
            x="105"
            y="135"
            width="290"
            height="170"
            rx="12"
            fill="#222"
        />

        <rect
            x="145"
            y="170"
            width="210"
            height="45"
            fill="${hashColor(rng)}"
        />

        <circle
            cx="180"
            cy="220"
            r="34"
            fill="#ddd"
        />

        <circle
            cx="320"
            cy="220"
            r="34"
            fill="#ddd"
        />

        <circle
            cx="180"
            cy="220"
            r="12"
            fill="#444"
        />

        <circle
            cx="320"
            cy="220"
            r="12"
            fill="#444"
        />
    `;
}

function equalizerSubject(rng) {
    const bars = [];

    for (let i = 0; i < 20; i++) {
        const h = 40 + rng() * 180;

        bars.push(`
            <rect
                x="${60 + i * 18}"
                y="${300 - h}"
                width="12"
                height="${h}"
                fill="${hashColor(rng)}"
                rx="4"
            />
        `);
    }

    return bars.join("");
}

function waveformSubject(rng) {
    const paths = [];

    for (let i = 0; i < 7; i++) {
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

    return paths.join("");
}

function ringsSubject(rng) {
    const rings = [];

    for (let i = 0; i < 12; i++) {
        rings.push(`
            <circle
                cx="250"
                cy="220"
                r="${30 + i * 18}"
                fill="none"
                stroke="${hashColor(rng)}"
                stroke-width="4"
                opacity="0.8"
            />
        `);
    }

    return rings.join("");
}

function geometricSubject(rng) {
    const shapes = [];

    for (let i = 0; i < 20; i++) {
        const size = 20 + rng() * 80;

        if (rng() > 0.5) {
            shapes.push(`
                <rect
                    x="${rng() * 420}"
                    y="${rng() * 320}"
                    width="${size}"
                    height="${size}"
                    fill="${hashColor(rng)}"
                    transform="
                        rotate(
                            ${rng() * 360}
                            250
                            220
                        )
                    "
                />
            `);
        } else {
            shapes.push(`
                <circle
                    cx="${rng() * 500}"
                    cy="${rng() * 350}"
                    r="${size / 2}"
                    fill="${hashColor(rng)}"
                    opacity="0.7"
                />
            `);
        }
    }

    return shapes.join("");
}

function skylineSubject(rng) {
    const buildings = [];

    for (let i = 0; i < 18; i++) {
        const width = 18 + rng() * 25;
        const height = 80 + rng() * 180;

        buildings.push(`
            <rect
                x="${i * 28}"
                y="${340 - height}"
                width="${width}"
                height="${height}"
                fill="${hashColor(rng)}"
            />
        `);
    }

    return buildings.join("");
}

function sunSubject(rng) {
    return `
        <circle
            cx="250"
            cy="180"
            r="100"
            fill="${hashColor(rng)}"
        />

        <circle
            cx="250"
            cy="180"
            r="75"
            fill="${hashColorSoft(rng)}"
        />
    `;
}

function crystalSubject(rng) {
    const p1 = hashColor(rng);
    const p2 = hashColor(rng);
    const p3 = hashColor(rng);

    return `
        <polygon
            points="
                250,70
                340,170
                300,310
                200,310
                160,170
            "
            fill="${p1}"
        />

        <polygon
            points="
                250,70
                300,170
                250,310
                200,170
            "
            fill="${p2}"
            opacity="0.85"
        />

        <polygon
            points="
                250,70
                340,170
                250,310
            "
            fill="${p3}"
            opacity="0.7"
        />
    `;
}
function photoCollageCover(title, artist, rng) {
    const cells = [];
    const palette = Array.from(
        { length: 12 },
        () => hashColor(rng)
    );

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const x = col * 166;
            const y = row * 166;
            const color = palette[
                Math.floor(rng() * palette.length)
            ];

            const mode = Math.floor(rng() * 4);

            let content = `
                <rect
                    x="${x}"
                    y="${y}"
                    width="166"
                    height="166"
                    fill="${color}"
                />
            `;

            if (mode === 0) {
                content += `
                    <circle
                        cx="${x + 83}"
                        cy="${y + 83}"
                        r="${40 + rng() * 35}"
                        fill="rgba(255,255,255,0.35)"
                    />
                `;
            }

            if (mode === 1) {
                content += `
                    <polygon
                        points="
                            ${x + 20},${y + 140}
                            ${x + 80},${y + 40}
                            ${x + 145},${y + 140}
                        "
                        fill="rgba(255,255,255,0.35)"
                    />
                `;
            }

            if (mode === 2) {
                content += `
                    <rect
                        x="${x + 30}"
                        y="${y + 30}"
                        width="100"
                        height="100"
                        fill="rgba(0,0,0,0.25)"
                        transform="rotate(${rng() * 45} ${x + 80} ${y + 80})"
                    />
                `;
            }

            if (mode === 3) {
                for (let i = 0; i < 12; i++) {
                    content += `
                        <line
                            x1="${x}"
                            y1="${y + i * 12}"
                            x2="${x + 166}"
                            y2="${y + i * 12}"
                            stroke="rgba(255,255,255,0.25)"
                        />
                    `;
                }
            }

            cells.push(content);
        }
    }

    return svgWrap(`
        ${cells.join("")}
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
        retroCover,

        synthwaveCover,
        geometricPosterCover,
        planetCover,
        tunnelCover,
        cassetteCover,
        radialBurstCover,
        blueprintCover,
        circuitBoardCover,
        topographicCover,
        stainedGlassCover,
        skylineSunsetCover,
        mosaicCover,
        photoCollageCover
    ];

    const style =
        styles[
            Math.floor(
                rng() * styles.length
            )
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

module.exports = {
    generateCover
};
