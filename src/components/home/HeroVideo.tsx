"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroMode, setHeroMode] = useState<"video" | "image" | "grid">("video");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function setPlaybackSpeed() {
      if (!video) return;
      video.defaultPlaybackRate = 0.75;
      video.playbackRate = 0.75;
    }

    setPlaybackSpeed();
    video.addEventListener("loadedmetadata", setPlaybackSpeed);
    return () => video.removeEventListener("loadedmetadata", setPlaybackSpeed);
  }, [heroMode]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ibd:hero-mode-change", { detail: { mode: heroMode } }),
    );
  }, [heroMode]);

  const showBoardNoses = heroMode === "image";
  const showGrid = heroMode === "grid";

  function cycleHeroMode() {
    setHeroMode((current) => {
      if (current === "video") return "image";
      if (current === "image") return "grid";
      return "video";
    });
  }

  return (
    <>
      {showGrid ? (
        <div
          data-hero-mode="grid"
          className="surfboard-line-grid pointer-events-none absolute inset-0 z-[1] bg-white dark:bg-stone-950"
          aria-hidden="true"
        />
      ) : showBoardNoses ? (
        <Image
          src="/images/hero/board-noses.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          aria-hidden="true"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/surf-hero-sample.m4v" type="video/mp4" />
          <source src="/videos/surf-hero-sample.mov" type="video/quicktime" />
        </video>
      )}
      {!showGrid ? (
        <div
          className={`absolute inset-0 -z-10 ${showBoardNoses ? "bg-black/5" : "bg-black/45 dark:bg-black/60"}`}
          aria-hidden="true"
        />
      ) : null}
      <button
        type="button"
        onClick={cycleHeroMode}
        className={`absolute bottom-3 right-3 z-30 border bg-transparent px-2 py-1 text-[9px] uppercase tracking-[0.14em] transition-colors ${showGrid ? "border-stone-950/25 text-stone-950/60 hover:border-stone-950/70 hover:text-stone-950 dark:border-white/30 dark:text-white/60 dark:hover:border-white/70 dark:hover:text-white" : "border-white/30 text-white/60 hover:border-white/70 hover:text-white"}`}
        aria-label="Switch to the next hero background"
      >
        Switch
      </button>
    </>
  );
}
