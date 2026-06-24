import React, { useState } from "react";
import { toggleSong } from "./audioController";

export default function SongDetails({ song }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="details">

            <div className="details-cover">
                <img
                    alt={song.title}
                    src={`data:image/svg+xml;base64,${song.cover}`}
                />
            </div>

            <div className="details-content">

                <div className="details-header">

                    <h2>
                        {song.title}
                    </h2>

                    <p className="details-artist">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 3a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V8a5 5 0 0 0-5-5Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            />
                            <path
                                d="M5 11a7 7 0 0 0 14 0"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            />
                            <path
                                d="M12 18v3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            />
                        </svg>

                        {song.artist}

                    </p>

                </div>

                <div className="details-meta">

                    <span className="album-pill">
                        {song.album}
                    </span>

                    <span className="genre-pill">
                        {song.genre}
                    </span>

                </div>

                <p className="details-review">
                    {song.review}
                </p>

                <div className="details-player">

                <button 
                    className="play-btn" 
                    onClick={async () => {
                        setIsPlaying(await toggleSong(song));
                    }}
                >
                    {isPlaying ? "⏹ Stop" : "▶ Play"}
                </button>

                </div>

            </div>

        </div>
    );
}