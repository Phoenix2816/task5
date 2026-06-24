import React, { useEffect, useState } from "react";
import { toggleSong, subscribe } from "./audioController";

export default function SongCard({ song }) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return subscribe((currentId) => {
            setIsPlaying(currentId === song.id);
        });
    }, [song.id]);

    return (
        <article className="card">

            <div className="card-image">
                <img
                    src={`data:image/svg+xml;base64,${song.cover}`}
                    alt={song.title}
                />

                <button
                    className="card-overlay"
                    onClick={async () => {
                        await toggleSong(song);
                    }}
                >
                    {isPlaying ? "⏹" : "▶"}
                </button>

            </div>

            <div className="card-content">

                <h3 className="card-title">
                    {song.title}
                </h3>

                <p className="card-artist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" ><path fill="#533566" d="M22.525 17.94a7.47 7.47 0 1 0 0-14.94 7.47 7.47 0 0 0 0 14.94"/><path fill="#9B9B9B" d="M2.644 29.21c-.83-.88-.86-2.25-.08-3.17l12.54-14.7 6.11 6.48-15.41 11.66c-.96.73-2.33.61-3.16-.27"/><path fill="#BEBEBE" d="m18.996 4.005 9.94 10.55c.66.7.63 1.8-.07 2.45-.7.66-1.79.63-2.45-.07l-9.94-10.55c-.66-.7-.63-1.79.07-2.45s1.79-.63 2.45.07M15.415 18.53a1.47 1.47 0 1 1-2.94 0 1.47 1.47 0 0 1 2.94 0"/></svg>
                    {song.artist}
                </p>

                <div className="card-meta">

                    <span className="album-pill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"><path fill="#B4ACBC" d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16s6.268 14 14 14m0-10a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/><path fill="#F3EEF8" d="M19.535 12.465A4.98 4.98 0 0 0 16 11c-.903 0-1.75.24-2.481.658l-3.227-5.646c-.41-.719-.164-1.643.598-1.969A13 13 0 0 1 16 3c3.05 0 5.855 1.05 8.073 2.81.65.515.644 1.472.058 2.058zm-7.07 7.07A4.98 4.98 0 0 0 16 21c.903 0 1.75-.24 2.481-.658l3.226 5.646c.411.719.164 1.643-.597 1.97A13 13 0 0 1 16 29c-3.05 0-5.856-1.05-8.073-2.81-.65-.515-.645-1.473-.059-2.058z"/></svg>
                        {song.album}
                    </span>

                    <span className="genre-pill">
                        {song.genre}
                    </span>

                </div>

                {song.review && (
                    <p className="card-review">
                        {song.review.length > 80
                            ? song.review.slice(0, 80) + "..."
                            : song.review}
                    </p>
                )}

                <div className="card-footer">

                    <div className="likes">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span>{song.likes}</span>

                    </div>

                    <button
                        className="play-btn"
                        onClick={async () => {
                            await toggleSong(song);
                        }}
                    >
                        {isPlaying ? "⏹ Stop" : "▶ Play"}
                    </button>

                </div>

            </div>

        </article>
    );
}