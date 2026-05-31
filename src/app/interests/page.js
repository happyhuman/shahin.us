"use client";

import React, { useState, useEffect } from "react";
import styles from "./interests.module.css";
import { siteConfig } from "@/config";

export default function InterestsPage() {
  return (
    <div className={styles.interestsContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Interests & Chapters</h1>
        <p className={styles.pageSubtitle}>
          A look into the activities, hobbies, and pursuits that shape my time outside of coding.
        </p>
      </div>

      <div className={styles.interestsGrid}>
        {/* Chess Card */}
        <div className={styles.singleSpan}>
          <ChessCard />
        </div>

        {/* Movies Card */}
        <div className={styles.singleSpan}>
          <MoviesCard />
        </div>

        {/* Paragliding Card */}
        <div className={styles.singleSpan}>
          <ImageCard config={siteConfig.interests.paragliding} />
        </div>

        {/* Soccer Card */}
        <div className={styles.doubleSpan}>
          <ImageCard config={siteConfig.interests.soccer} isLandscape={true} />
        </div>

        {/* Camping Card */}
        <div className={styles.doubleSpan}>
          <ImageCard config={siteConfig.interests.camping} isLandscape={true} />
        </div>
      </div>
    </div>
  );
}

function ChessCard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // Baseline fallbacks matching current stats
  const fallbackStats = {
    chess_rapid: { last: { rating: 1788 }, best: { rating: 1834 } },
    chess_blitz: { last: { rating: 1546 }, best: { rating: 1705 } },
    chess_daily: { last: { rating: 1414 }, best: { rating: 1749 } },
    puzzle_rush: { best: { score: 20 } },
  };

  useEffect(() => {
    let active = true;

    async function fetchChessStats() {
      try {
        const res = await fetch(`https://api.chess.com/pub/player/${siteConfig.interests.chess.username}/stats`, {
          headers: {
            // Chess.com requests a User-Agent or contact email for public scripts
            "User-Agent": "shahin.us-personal-site-contact",
          },
        });
        if (!res.ok) throw new Error("API response not ok");
        const data = await res.json();
        
        if (active) {
          // Verify we got the expected sections, fallback to default if missing
          const resolvedStats = {
            chess_rapid: data.chess_rapid || fallbackStats.chess_rapid,
            chess_blitz: data.chess_blitz || fallbackStats.chess_blitz,
            chess_daily: data.chess_daily || fallbackStats.chess_daily,
            puzzle_rush: data.puzzle_rush || fallbackStats.puzzle_rush,
          };
          setStats(resolvedStats);
          setIsLive(true);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Chess.com API failed, loading local cached stats: ", err);
        if (active) {
          setStats(fallbackStats);
          setIsLive(false);
          setLoading(false);
        }
      }
    }

    fetchChessStats();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={`card ${styles.chessCard}`}>
      {/* Decorative Chess Board Pattern */}
      <div className={styles.chessBackground} />

      <div className={styles.cardHeader}>
        <h3 className={styles.cardHeading}>♟️ Chess</h3>
        <span className={styles.cardBadge}>Tactics</span>
      </div>

      <p className={styles.chessDescription}>
        Average rating, infinite complexity. I play on Chess.com for the sheer tactical enjoyment, calculation exercise, and appreciation of geometric board structures.
      </p>

      {loading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <span>Fetching stats...</span>
        </div>
      ) : (
        <>
          <div className={styles.statsContainer}>
            {/* Rapid */}
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Rapid</span>
              <span className={styles.statValue}>
                <span className={styles.statValueHighlight}>
                  {stats?.chess_rapid?.last?.rating || "—"}
                </span>
              </span>
              <span className={styles.bestValue}>
                Best: {stats?.chess_rapid?.best?.rating || "—"}
              </span>
            </div>

            {/* Blitz */}
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Blitz</span>
              <span className={styles.statValue}>
                {stats?.chess_blitz?.last?.rating || "—"}
              </span>
              <span className={styles.bestValue}>
                Best: {stats?.chess_blitz?.best?.rating || "—"}
              </span>
            </div>

            {/* Daily */}
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Daily</span>
              <span className={styles.statValue}>
                {stats?.chess_daily?.last?.rating || "—"}
              </span>
              <span className={styles.bestValue}>
                Best: {stats?.chess_daily?.best?.rating || "—"}
              </span>
            </div>

            {/* Puzzle Rush */}
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Puzzles</span>
              <span className={styles.statValue}>
                {stats?.puzzle_rush?.best?.score || "—"}
              </span>
              <span className={styles.bestValue}>Best Rush</span>
            </div>
          </div>

          <div className={styles.liveIndicator}>
            <span className={isLive ? styles.liveDot : ""} />
            <span>{isLive ? "Live Chess.com stats" : "Cached stats"}</span>
          </div>
        </>
      )}

      <div className={styles.cardFooter}>
        <a
          href={siteConfig.interests.chess.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ textDecoration: "none", width: "100%" }}
        >
          View chess.com Profile &rarr;
        </a>
      </div>
    </section>
  );
}

function MoviesCard() {
  const { movies } = siteConfig.interests;

  return (
    <section className={`card ${styles.moviesCard}`}>
      <div className={styles.moviesBackground} />

      <div className={styles.cardHeader}>
        <h3 className={styles.cardHeading}>🎬 Movies</h3>
        <span className={styles.cardBadge}>Cinema</span>
      </div>

      <p className={styles.chessDescription} style={{ marginBottom: "16px" }}>
        {movies.description}
      </p>

      <div className={styles.moviesStatsBanner} style={{ marginBottom: "16px" }}>
        <span className={styles.moviesStatsText}>Films Logged</span>
        <span className={styles.moviesStatsCount}>{movies.totalWatched}</span>
      </div>

      <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", zIndex: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        A few of my favorites:
      </div>

      <div className={styles.moviesList}>
        {movies.favorites && movies.favorites.map((movie, idx) => (
          <a
            key={idx}
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.movieItem}
            title="View on Letterboxd"
          >
            <div className={styles.movieInfo}>
              <span className={styles.movieTitle}>{movie.title}</span>
              <span className={styles.movieYear}>{movie.year}</span>
            </div>
            <span className={styles.movieRating}>{movie.rating}</span>
          </a>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <a
          href={movies.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ textDecoration: "none", width: "100%" }}
        >
          View Letterboxd Profile &rarr;
        </a>
      </div>
    </section>
  );
}

function ImageCard({ config, isLandscape = false }) {
  if (isLandscape) {
    return (
      <section className={`card ${styles.imageCard}`} style={{ height: "100%", padding: "20px" }}>
        <div className={styles.landscapeLayout}>
          <div className={styles.imageWrapper}>
            <img 
              src={config.imagePath} 
              alt={config.title} 
              className={styles.cardImg} 
            />
          </div>
          <div className={styles.landscapeLayoutContent}>
            <div className={styles.cardHeader} style={{ marginBottom: "8px" }}>
              <h3 className={styles.cardHeading}>{config.title}</h3>
              <span className={styles.cardBadge}>{config.badge}</span>
            </div>
            <p className={styles.chessDescription} style={{ margin: 0 }}>
              {config.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`card ${styles.imageCard}`} style={{ height: "100%" }}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardHeading}>{config.title}</h3>
        <span className={styles.cardBadge}>{config.badge}</span>
      </div>

      <div className={`${styles.imageWrapper} ${styles.verticalImage}`}>
        <img 
          src={config.imagePath} 
          alt={config.title} 
          className={styles.cardImg} 
        />
      </div>

      <p className={styles.chessDescription} style={{ margin: 0 }}>
        {config.description}
      </p>
    </section>
  );
}
