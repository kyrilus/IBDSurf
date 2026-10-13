"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBoardNoses, setShowBoardNoses] = useState(false);

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
  }, [showBoardNoses]);

  return (
    <>
      {showBoardNoses ? (
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
      <div
        className={`absolute inset-0 -z-10 ${showBoardNoses ? "bg-black/5" : "bg-black/60 dark:bg-black/75"}`}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setShowBoardNoses((current) => !current)}
        className="absolute bottom-3 right-3 z-30 border border-white/30 bg-transparent px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-white/70 hover:text-white"
        aria-label={showBoardNoses ? "Switch hero to video" : "Switch hero to board noses image"}
        aria-pressed={showBoardNoses}
      >
        Switch
      </button>
    </>
  );
}
