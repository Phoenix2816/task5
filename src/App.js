/* global BigInt */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getLocale } from "./utils/i18n";
import Toolbar from "./components/Toolbar";
import TableView from "./components/TableView";
import GalleryView from "./components/GalleryView";

import { fetchSongs } from "./services/api";

export default function App() {
    const [region, setRegion] = useState("en-US");
    const [seed, setSeed] = useState("12345");
    const [likes, setLikes] = useState(3.7);

    const [view, setView] = useState("table");

    const [tablePage, setTablePage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(1);

    const [tableSongs, setTableSongs] = useState([]);
    const [gallerySongs, setGallerySongs] = useState([]);

    const [loading, setLoading] = useState(false);

    const localeData = getLocale(region);
    const loadingMoreRef = useRef(false);
    const MIN_SEED = -(1n << 63n);
    const MAX_SEED = (1n << 63n) - 1n;

    function isValidSeed(value) {
        try {
            const n = BigInt(value);

            return (
                n >= MIN_SEED &&
                n <= MAX_SEED
            );
        } catch {
            return false;
        }
    }

    useEffect(() => {
        if (!isValidSeed(seed)) {
            console.log("Seed must be a signed 64-bit integer");
            setLoading(false);
            return;
        }
        setLoading(true);


        fetchSongs({
            page: tablePage,
            seed,
            region,
            likes
        })
            .then((data) => {
                setTableSongs(data.songs || []);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [tablePage, seed, region, likes]);

    useEffect(() => {
        setTablePage(1);
        setGalleryPage(1);

        setTableSongs([]);
        setGallerySongs([]);

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        if (!isValidSeed(seed)) {
            console.log("Seed must be a signed 64-bit integer");
            setLoading(false);
            return;
        }
        setLoading(true);

        fetchSongs({
            page: 1,
            seed,
            region,
            likes
        })
            .then((data) => {
                setGallerySongs(data.songs || []);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [seed, region, likes]);

    function generateSeed() {
        const hi =
            BigInt(Math.floor(Math.random() * 0x80000000));

        const lo =
            BigInt(Math.floor(Math.random() * 0xffffffff));

        const seed64 =
            (hi << 32n) | lo;

        setSeed(seed64.toString());
    }
    async function loadMore() {

        if (loadingMoreRef.current) return;

        loadingMoreRef.current = true;

        try {
            const nextPage = galleryPage + 1;

            const data = await fetchSongs({
                page: nextPage,
                seed,
                region,
                likes
            });

            setGallerySongs(prev => [
                ...prev,
                ...(data.songs || [])
            ]);

            setGalleryPage(nextPage);

        } finally {
            loadingMoreRef.current = false;
        }
    }

    return (
        <div className="App">

            <header className="app-header">

                <div>
                    <h1 className="app-title">
                        Music Explorer
                    </h1>

                    <p className="app-subtitle">
                        Discover generated songs, albums,
                        artists and reviews
                    </p>
                </div>

                <div className="header-stats">

                    <div className="stat-card">
                        <span className="stat-value">
                            {view === "table"
                                ? tableSongs.length
                                : gallerySongs.length}
                        </span>

                        <span className="stat-label">
                            Songs
                        </span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-value">
                            {likes}
                        </span>

                        <span className="stat-label">
                            Avg Likes
                        </span>
                    </div>

                </div>

            </header>

            <Toolbar
                region={region}
                setRegion={setRegion}
                seed={seed}
                setSeed={setSeed}
                likes={likes}
                setLikes={setLikes}
                generateSeed={generateSeed}
                localeData={localeData}
            />

            <div className="view-switch">

                <button
                    className={
                        view === "table"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setView("table")
                    }
                >
                    Table View
                </button>

                <button
                    className={
                        view === "gallery"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setView("gallery")
                    }
                >
                    Gallery View
                </button>

            </div>

            <section className="content-section">

                {loading ? (
                    <div className="loading-state">

                        <div className="spinner" />

                        <p>
                            Loading music...
                        </p>

                    </div>
                ) : view === "table" ? (
                    <TableView
                        songs={tableSongs}
                        page={tablePage}
                        setPage={setTablePage}
                        localeData={localeData}
                    />
                ) : (
                    <GalleryView
                        songs={gallerySongs}
                        loadMore={loadMore}
                        localeData={localeData}
                    />
                )}

            </section>

        </div>
    );
}