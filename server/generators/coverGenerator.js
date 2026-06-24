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

function noiseTexture(rng, size = 50) {
    let out = "";
    for (let i = 0; i < size; i++) {
        out += `
            <circle
                cx="${rng() * 500}"
                cy="${rng() * 500}"
                r="${rng() * 2}"
                fill="rgba(255,255,255,${rng() * 0.08})"
            />
        `;
    }
    return out;
}

function gradientId(rng) {
    return `g${Math.floor(rng() * 1e9)}`;
}

function generateCover(title, artist, rng) {
    const bg1 = hashColor(rng);
    const bg2 = hashColor(rng);
    const gradId = gradientId(rng);

    const defs = `
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${bg1}" />
                <stop offset="100%" stop-color="${bg2}" />
            </linearGradient>

            <filter id="blur">
                <feGaussianBlur stdDeviation="2" />
            </filter>
        </defs>
    `;

    const shapes = Array.from({ length: 18 }, () => {
        const type = Math.floor(rng() * 3);

        if (type === 0) {
            return `
                <circle cx="${rng() * 500}" cy="${rng() * 500}"
                    r="${20 + rng() * 80}"
                    fill="rgba(255,255,255,0.12)"
                    filter="url(#blur)"
                />
            `;
        }

        if (type === 1) {
            return `
                <rect x="${rng() * 450}" y="${rng() * 450}"
                    width="${30 + rng() * 120}"
                    height="${30 + rng() * 120}"
                    fill="rgba(0,0,0,0.15)"
                    transform="rotate(${rng() * 360} 250 250)"
                />
            `;
        }

        return `
            <ellipse cx="${rng() * 500}" cy="${rng() * 500}"
                rx="${20 + rng() * 60}"
                ry="${10 + rng() * 40}"
                fill="rgba(255,255,255,0.08)"
            />
        `;
    }).join("");

    const noise = noiseTexture(rng, 120);

    const textBlock = `
        <rect x="30" y="330" width="440" height="120"
            fill="rgba(0,0,0,0.35)" rx="12"
        />

        <text x="50" y="380"
            fill="white"
            font-size="28"
            font-family="Arial"
            font-weight="bold"
        >
            ${escapeXML(title)}
        </text>

        <text x="50" y="415"
            fill="rgba(255,255,255,0.8)"
            font-size="18"
            font-family="Arial"
        >
            ${escapeXML(artist)}
        </text>
    `;

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="500" height="500">

            ${defs}

            <rect width="100%" height="100%"
                fill="url(#${gradId})"
            />

            ${shapes}
            ${noise}
            ${textBlock}

        </svg>
    `;

    return Buffer.from(svg).toString("base64");
}

module.exports = { generateCover };