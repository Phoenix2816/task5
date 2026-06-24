import React, { useState } from "react";
import SongDetails from "./SongDetails";

export default function TableView({ songs, page, setPage, localeData }) {
    const [expanded, setExpanded] = useState(null);

    function toggleRow(id) {
        setExpanded(
            expanded === id
                ? null
                : id
        );
    }

    return (
        <>
            <div className="table-container">
                <table className="songs-table">

                    <thead>
                        <tr>
                            <th className="expand-column"></th>
                            <th>#</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Likes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {songs.map((song) => (
                            <React.Fragment key={song.id}>

                                <tr
                                    className={
                                        expanded === song.id
                                            ? "song-row active"
                                            : "song-row"
                                    }
                                    onClick={() => toggleRow(song.id)}
                                >
                                    <td className="expand-icon">
                                        {expanded === song.id
                                            ? "▲"
                                            : "▼"}
                                    </td>

                                    <td className="song-id">
                                        {song.id}
                                    </td>

                                    <td className="song-title">
                                        {song.title}
                                    </td>

                                    <td>
                                        {song.artist}
                                    </td>

                                    <td>
                                        {song.album}
                                    </td>

                                    <td>
                                        <span className="genre-pill">
                                            {song.genre}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="likes-cell">

                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 10V20M8 10L4 10V20H8M8 10L13.2 3.9C13.7 3.3 14.4 3.1 15.2 3.3C16.6 3.6 17.2 5.2 16.4 6.3L14 10H18.6C19.8 10 20.8 11.2 20.5 12.4L19.3 18.4C19.1 19.3 18.3 20 17.4 20H8"
                                                    stroke="#2563eb"
                                                    strokeWidth="1.7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            {song.likes}
                                        </div>
                                    </td>
                                </tr>

                                {expanded === song.id && (
                                    <tr className="details-row">
                                        <td colSpan="7">
                                            <SongDetails song={song} />
                                        </td>
                                    </tr>
                                )}

                            </React.Fragment>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="pagination">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    {localeData.ui.previous}
                </button>

                <div className="page-badge">
                    {page}
                </div>

                <button
                    onClick={() => setPage(page + 1)}
                >
                    {localeData.ui.next}
                </button>

            </div>
        </>
    );
}