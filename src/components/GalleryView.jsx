import React, { useEffect, useRef } from "react";
import SongCard from "./SongCard";

export default function GalleryView({ songs, loadMore, localeData }){
    const observer = useRef();

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            {
                threshold: 0.2
            }
        );

        if (observer.current) {
            io.observe(observer.current);
        }

        return () => io.disconnect();
    }, [loadMore]);

    return (
        <div className="gallery-wrapper">

            <div className="gallery-header">
                <div>
                    <h2>{localeData.ui.discoverMusic}</h2>
                    <p>{localeData.ui.browseDescription}</p>
                </div>

                <div className="songs-count">
                    {songs.length} Songs
                </div>
            </div>

            <div className="gallery">
                {songs.map((song) => (
                    <SongCard
                        key={song.id}
                        song={song}
                    />
                ))}
            </div>

            <div
                ref={observer}
                className="gallery-loader"
            >
                {localeData.ui.loading}
            </div>

        </div>
    );
}