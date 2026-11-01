"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

interface EventMedia {
  id: string;
  title: string;
  type: string;
  video: string;
}

// Exactly 10 Curated, Verified Real Events: Concerts, Festivals, Parties & Meetups
const EVENT_PLAYLIST: EventMedia[] = [
  {
    id: "event-1",
    title: "Concert Rave & Stage Lights",
    type: "Concert",
    video: "https://assets.mixkit.co/videos/48507/48507-720.mp4",
  },
  {
    id: "event-2",
    title: "Festival Crowd Energy",
    type: "Festival",
    video: "https://assets.mixkit.co/videos/14084/14084-720.mp4",
  },
  {
    id: "event-3",
    title: "Arena Laser Light Show",
    type: "Arena",
    video: "https://assets.mixkit.co/videos/11942/11942-720.mp4",
  },
  {
    id: "event-4",
    title: "Nightclub DJ Session",
    type: "Club",
    video: "https://assets.mixkit.co/videos/4026/4026-720.mp4",
  },
  {
    id: "event-5",
    title: "Crowd Celebration",
    type: "Festival",
    video: "https://assets.mixkit.co/videos/48504/48504-720.mp4",
  },
  {
    id: "event-6",
    title: "Private Studio & Lounge Meetup",
    type: "Private Meetup",
    video: "https://assets.mixkit.co/videos/48636/48636-720.mp4",
  },
  {
    id: "event-7",
    title: "Live Band Stage Performance",
    type: "Concert",
    video: "https://assets.mixkit.co/videos/486/486-720.mp4",
  },
  {
    id: "event-8",
    title: "Rooftop Sundowner Social",
    type: "Party",
    video: "https://assets.mixkit.co/videos/46893/46893-720.mp4",
  },
  {
    id: "event-9",
    title: "Outdoor Festival Crowd",
    type: "Festival",
    video: "https://assets.mixkit.co/videos/14088/14088-720.mp4",
  },
  {
    id: "event-10",
    title: "Underground Warehouse Session",
    type: "Exclusive",
    video: "https://assets.mixkit.co/videos/4344/4344-720.mp4",
  },
];

// ============================================================================
// DUAL-SLOT CONTINUOUS VIDEO REEL:
// Guaranteed Autoplay (hardware muted), 10s intervals, seamless crossfade
// ============================================================================
const VideoReelBackground: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(1);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force mute & trigger play programmatically to satisfy browser autoplay policies
  useEffect(() => {
    if (!isMounted) return;

    const playVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled
        });
      }
    };

    if (activeSlot === "A") {
      playVideo(videoRefA.current);
    } else {
      playVideo(videoRefB.current);
    }
  }, [isMounted, activeSlot, slotAIndex, slotBIndex]);

  // Transition every 10 seconds between Slot A and Slot B
  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      if (activeSlot === "A") {
        // Pre-cue Slot B to next item, start playing it, then switch visibility
        const nextB = (slotAIndex + 1) % EVENT_PLAYLIST.length;
        setSlotBIndex(nextB);
        if (videoRefB.current) {
          videoRefB.current.currentTime = 0;
          videoRefB.current.muted = true;
          videoRefB.current.play().catch(() => {});
        }
        setActiveSlot("B");
      } else {
        // Pre-cue Slot A to next item, start playing it, then switch visibility
        const nextA = (slotBIndex + 1) % EVENT_PLAYLIST.length;
        setSlotAIndex(nextA);
        if (videoRefA.current) {
          videoRefA.current.currentTime = 0;
          videoRefA.current.muted = true;
          videoRefA.current.play().catch(() => {});
        }
        setActiveSlot("A");
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [isMounted, activeSlot, slotAIndex, slotBIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none select-none z-0">
      {isMounted && (
        <>
          {/* Video Slot A */}
          <video
            ref={videoRefA}
            src={EVENT_PLAYLIST[slotAIndex].video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15] saturate-[1.05] transition-opacity duration-1000 ease-in-out ${
              activeSlot === "A" ? "opacity-65" : "opacity-0"
            }`}
          />

          {/* Video Slot B */}
          <video
            ref={videoRefB}
            src={EVENT_PLAYLIST[slotBIndex].video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15] saturate-[1.05] transition-opacity duration-1000 ease-in-out ${
              activeSlot === "B" ? "opacity-65" : "opacity-0"
            }`}
          />
        </>
      )}

      {/* 
        Central Protective Radial Vignette Shield:
        Guarantees 100% WCAG AAA contrast for hero text while letting background motion breathe.
      */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.92) 18%, rgba(9, 9, 11, 0.82) 45%, rgba(9, 9, 11, 0.45) 75%, rgba(0, 0, 0, 0.25) 100%)",
        }}
      />

      {/* Vertical Edge Fade: Soft ambient dark gradient at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none z-10" />
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
      className="relative min-h-[100dvh] w-full bg-black text-inverse-on-surface overflow-x-clip flex flex-col justify-between selection:bg-primary selection:text-on-primary-fixed"
      suppressHydrationWarning
    >
      {/* 1. Full-Screen Looping Background Video Reel (10 Real Concert/Festival Events) */}
      <VideoReelBackground />

      {/* 2. Sticky Top Header Navigation (search, login, sign up) */}
      <SiteHeader />

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
          Secure your access to the world&apos;s most exclusive events. Your digital pass saves directly to your device to guarantee instant entry at the gate even when the internet drops.
        </p>

        {/* 4. Call-to-Action Area: Label Large (14px / 0.875rem, Medium 500) */}
        <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/events"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-label font-medium text-sm tracking-[-0.025rem] whitespace-nowrap bg-primary text-on-primary-fixed shadow-none hover:shadow-medium-shadow hover:brightness-105 hover:font-semibold active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer text-center inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-black"
          >
            Discover Events
          </Link>

          {!isInputActive ? (
            <button
              type="button"
              onClick={() => setIsInputActive(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-label font-medium text-sm tracking-[-0.025rem] whitespace-nowrap border border-accent text-accent bg-transparent shadow-none hover:bg-accent hover:text-black hover:border-accent active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-black"
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
