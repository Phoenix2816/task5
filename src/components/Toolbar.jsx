import React from "react";

export default function Toolbar({
    region,
    setRegion,
    seed,
    setSeed,
    likes,
    setLikes,
    generateSeed,
    localeData
}) {
    return (
        <div className="toolbar">

            <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="en-US">{localeData.languages["en-US"]}</option>
                <option value="de-DE">{localeData.languages["de-DE"]}</option>
                <option value="uk-UA">{localeData.languages["uk-UA"]}</option>
                <option value="fr-FR">{localeData.languages["fr-FR"]}</option>
                <option value="es-ES">{localeData.languages["es-ES"]}</option>
            </select>

            <input
                type="text"
                value={seed}
                placeholder="Seed"
                onChange={(e) => {
                    const value = e.target.value.trim();

                    if (
                        value === "" ||
                        /^-?\d+$/.test(value)
                    ) {
                        setSeed(value);
                    }
                }}
            />

            <button onClick={generateSeed}>
                Random Seed
            </button>

            <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
            />

        </div>
    );
}