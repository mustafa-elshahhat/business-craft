"use client";

import { useEffect, useRef, useState } from "react";

/** Only the most visible clip plays at a time. */
const players = new Map<HTMLVideoElement, number>();

function syncPlayers() {
  let best: HTMLVideoElement | null = null;
  let bestRatio = 0.6;
  for (const [video, ratio] of players) {
    if (ratio >= bestRatio) {
      best = video;
      bestRatio = ratio;
    }
  }
  for (const video of players.keys()) {
    if (video === best) void video.play().catch(() => {});
    else video.pause();
  }
}

/**
 * Muted real-interface clip layered over its poster image. Sources load only
 * when the clip is about to be visible; it plays while at least 60% visible
 * (and only the most visible clip plays), pauses off-screen, and is never
 * rendered under reduced motion — the poster stays.
 */
export function WorkVideo({ mp4, webm }: { mp4: string; webm: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const update = () => setAllowed(!query.matches && !saveData);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!allowed || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoad(true);
        players.set(video, entry.intersectionRatio);
        syncPlayers();
      },
      { threshold: [0, 0.3, 0.6, 0.8, 1] },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      players.delete(video);
      video.pause();
    };
  }, [allowed]);

  // Sources were just added: make the element pick them up.
  useEffect(() => {
    if (!load || !ref.current) return;
    ref.current.load();
    syncPlayers();
  }, [load]);

  if (!allowed) return null;

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 size-full object-cover object-left-top transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
    >
      {load ? (
        <>
          {/* MP4 first: smaller here; WebM is the fallback. */}
          <source src={mp4} type="video/mp4" />
          <source src={webm} type="video/webm" />
        </>
      ) : null}
    </video>
  );
}
