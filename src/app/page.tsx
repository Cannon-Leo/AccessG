"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AccessGLogo } from "@/components/AccessGLogo";

interface HexNode {
  id: string;
  col: number;
  row: number;
  isLarge: boolean;
  isBottomLeft: boolean;
  isTopRight: boolean;
  videoSrc: string;
  posterSrc: string;
}

// ============================================================================
// HONEYCOMB BACKGROUND: Mathematically calculated coordinate system
// Generated outward from viewport center (0, 0) with trigonometric offsets.
// Eliminates voids, guarantees zero gaps, and preserves symmetry.
// ============================================================================
const HoneycombBackground: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hexagon geometry
  const R = 110;
  const hexWidth = Math.sqrt(3) * R; // ~190.52px
  const hexHeight = 2 * R; // 220px
  const colSpacing = 1.5 * R; // 165px
  const rowSpacing = Math.sqrt(3) * R; // ~190.52px

  // Curated high-energy festival, concert, and rave video assets
  const videoPool = [
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-dancing-crowd-at-a-concert-with-lights-34241-large.mp4",
      poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    },
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-crowd-at-music-concert-34394-large.mp4",
      poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    },
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-at-a-live-concert-34242-large.mp4",
      poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    },
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-at-a-concert-34397-large.mp4",
      poster: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
    },
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-cheering-crowd-at-a-rock-concert-34244-large.mp4",
      poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // Specific videos for the two prominent hexagons:
  // Bottom-Left (col: -2, row: 1): Concert rave (Rema style dancing crowd)
  const concertVideo = {
    video: "https://assets.mixkit.co/videos/preview/mixkit-dancing-crowd-at-a-concert-with-lights-34241-large.mp4",
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  };

  // Top-Right (col: 2, row: -2): Festival / carnival lights
  const festivalVideo = {
    video: "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-at-a-live-concert-34242-large.mp4",
    poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
  };

  // Generating coordinates OUTWARD FROM THE CENTER (0, 0 is center)
  const hexagons = useMemo<HexNode[]>(() => {
    const list: HexNode[] = [];
    const minCol = -5;
    const maxCol = 5;
    const minRow = -3;
    const maxRow = 3;

    for (let col = minCol; col <= maxCol; col++) {
      for (let row = minRow; row <= maxRow; row++) {
        // High-contrast large nodes: Bottom-Left (col: -2, row: 1) and Top-Right (col: 2, row: -2)
        const isBottomLeft = col === -2 && row === 1;
        const isTopRight = col === 2 && row === -2;
        const isLarge = isBottomLeft || isTopRight;

        let videoSrc: string;
        let posterSrc: string;

        if (isBottomLeft) {
          videoSrc = concertVideo.video;
          posterSrc = concertVideo.poster;
        } else if (isTopRight) {
          videoSrc = festivalVideo.video;
          posterSrc = festivalVideo.poster;
        } else {
          const item = videoPool[Math.abs(col + row * 2) % videoPool.length];
          videoSrc = item.video;
          posterSrc = item.poster;
        }

        list.push({
          id: `${col}-${row}`,
          col,
          row,
          isLarge,
          isBottomLeft,
          isTopRight,
          videoSrc,
          posterSrc,
        });
      }
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none select-none z-0">
      {/* 
        Container anchor centered via absolute calc.
        Responsive scaling: adapts to mobile viewports so prominent hexagons stay inside viewport
      */}
      <div className="absolute left-1/2 top-1/2 w-[2200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 scale-[0.55] sm:scale-[0.75] md:scale-[0.9] lg:scale-100 transition-transform duration-700 ease-out opacity-90">
        {isMounted &&
          hexagons.map(({ id, col, row, isLarge, isBottomLeft, isTopRight, videoSrc, posterSrc }) => {
            // Trigonometric staggering math for seamless overlap
            const xOffset = col * colSpacing;
            const yOffset = row * rowSpacing + (col % 2 !== 0 ? rowSpacing / 2 : 0);

            return (
              <div
                key={id}
                className="absolute origin-center transition-all duration-700"
                style={{
                  left: `calc(50% - ${hexWidth / 2}px + ${xOffset}px)`,
                  top: `calc(50% - ${hexHeight / 2}px + ${yOffset}px)`,
                  width: `${hexWidth}px`,
                  height: `${hexHeight}px`,
                  zIndex: isLarge ? 10 : 2,
                  transform: isLarge ? "scale(1.72)" : "scale(0.985)",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className={`relative w-full h-full bg-[#111114] overflow-hidden ${
                    isLarge ? "border border-primary/30" : "border border-white/5"
                  }`}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src={videoSrc}
                    poster={posterSrc}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      isLarge
                        ? "brightness-[1.1] contrast-[1.2] saturate-[1.25]"
                        : "brightness-[0.45] contrast-[1.1] saturate-[0.9] opacity-70"
                    }`}
                  />
                  {/* Subtle edge outline and ambient gradient */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-colors ${
                      isLarge
                        ? isBottomLeft
                          ? "border-2 border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.25)]"
                          : "border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                        : "border border-zinc-800/40"
                    }`}
                  />
                  {/* Contrast gradient overlay */}
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      isLarge
                        ? "bg-gradient-to-t from-black/50 via-transparent to-black/20"
                        : "bg-black/35"
                    }`}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Central radial gradient vignette: keeps center hero zone completely legible */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 18%, rgba(9, 9, 11, 0.94) 42%, rgba(9, 9, 11, 0.6) 72%, rgba(0, 0, 0, 0.15) 90%, transparent 100%)",
        }}
      />
      {/* Vertical edge fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-10" />
    </div>
  );
};

// ============================================================================
// ACCESSG LANDING PAGE: Main Hero and Interactions
// ============================================================================
export default function AccessGLanding() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [studioCode, setStudioCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  const handleStudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studioCode.trim()) {
      alert(`Validating Access Code: ${studioCode.trim()}`);
    }
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full bg-black text-inverse-on-surface overflow-hidden flex flex-col justify-between selection:bg-primary selection:text-on-primary-fixed"
      suppressHydrationWarning
    >
      {/* 1. Symmetrical, Seamless Mathematical Honeycomb Grid Background */}
      <HoneycombBackground />

      {/* 2. Top Header Navigation */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <AccessGLogo variant="dark" />
        </Link>

        <Link
          href="/gatekeeper/login"
          className="px-5 py-2 rounded-full font-label font-medium text-sm tracking-[-0.025rem] border border-outline-variant/60 text-inverse-on-surface bg-surface-container-highest/60 hover:bg-surface-container-highest hover:text-primary hover:border-primary/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm"
        >
          Gatekeeper Login
        </Link>
      </header>

      {/* 3. Hero Content (Centered, Unobstructed Zone aligned to Design Tokens) */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-3xl mx-auto py-12">
        {/* Eyebrow Pill: Label Medium */}
        <div className="mb-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container/15 border border-tertiary/30 text-tertiary font-label text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-sm">
            THE UNBREAKABLE DIGITAL PASS
          </span>
        </div>

        {/* H1 Main Heading: Display Medium (56px) / Display Small (40px) */}
        <h1 className="font-display font-bold text-[2.5rem] sm:text-[3.5rem] tracking-[-0.125rem] sm:tracking-[-0.188rem] text-inverse-on-surface leading-[1.2] sm:leading-[1.25] mb-5">
          Own the Moment. <br />
          <span className="text-primary drop-shadow-[0_4px_16px_rgba(0,255,102,0.15)]">
            Never the Queue.
          </span>
        </h1>

        {/* Subtext Description: Body Large (16px / 1.00rem, Medium 500) */}
        <p className="font-body font-medium text-base text-on-surface-variant max-w-xl mx-auto leading-normal tracking-[-0.05rem] mb-8 text-balance">
          Secure your spot at the most exclusive events in Lagos. Your digital pass saves directly to your device—guaranteeing instant entry at the gate, even if the network drops.
        </p>

        {/* 4. Call-to-Action Area: Label Large (14px / 0.875rem, Medium 500) */}
        <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/events"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-label font-medium text-sm tracking-[-0.025rem] whitespace-nowrap bg-primary text-on-primary-fixed shadow-none hover:shadow-soft-shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer text-center inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-black"
          >
            Discover Events
          </Link>

          {!isInputActive ? (
            <button
              type="button"
              onClick={() => setIsInputActive(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-label font-medium text-sm tracking-[-0.025rem] whitespace-nowrap border border-accent text-accent bg-transparent shadow-none hover:bg-accent/10 active:scale-[0.98] transition-all cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-black"
            >
              Have a Studio Code?
            </button>
          ) : (
            <form
              onSubmit={handleStudioSubmit}
              className="w-full sm:w-auto flex items-center bg-surface-container-lowest/90 backdrop-blur-md rounded-full border border-accent p-1 shadow-soft-shadow transition-all animate-fadeIn"
            >
              <input
                ref={inputRef}
                type="text"
                value={studioCode}
                onChange={(e) => setStudioCode(e.target.value)}
                placeholder="Enter Access Code..."
                className="bg-transparent text-sm font-body font-medium text-inverse-on-surface placeholder:text-on-surface-variant/60 px-3.5 py-1.5 focus:outline-none w-40 sm:w-48 tracking-wider uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full font-label font-medium text-xs bg-accent text-black hover:brightness-105 transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap"
              >
                Unlock
              </button>
              <button
                type="button"
                onClick={() => setIsInputActive(false)}
                aria-label="Cancel code entry"
                className="text-on-surface-variant hover:text-white px-2.5 text-xs"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
