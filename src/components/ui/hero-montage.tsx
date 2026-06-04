import { useEffect, useRef, useState } from "react";

/** A montage entry: a plain URL (plays from 0) or a URL with a start time (seconds). */
export type HeroClip = string | { src: string; start?: number };

interface HeroMontageProps {
  /** Ordered list of clips to cycle through. */
  clips: HeroClip[];
  /** Still frame shown before playback and as the reduced-motion fallback. */
  poster: string;
  /** How long each clip stays on screen before the crossfade, in ms. */
  interval?: number;
}

function normalize(clip: HeroClip): { src: string; start: number } {
  return typeof clip === "string"
    ? { src: clip, start: 0 }
    : { src: clip.src, start: clip.start ?? 0 };
}

/**
 * Cinematic background for the hero: two stacked <video> layers that crossfade
 * through a curated set of clips. Each clip can begin at a custom start time and
 * loops back to that point. Only one clip decodes at a time (except the ~1.4s
 * fade), playback pauses when the hero scrolls out of view, and users with
 * prefers-reduced-motion get a single darkened still instead.
 */
export function HeroMontage({ clips, poster, interval = 6500 }: HeroMontageProps) {
  const [reduced, setReduced] = useState(false);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || clips.length === 0) return;
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let activeIsA = true;
    let curClip = 0;
    let inView = true;
    // start time currently loaded on each layer, so looping resumes from there
    const starts = { a: 0, b: 0 };

    // Load a clip into a layer, seek to its start once metadata is ready, then play.
    const loadInto = (el: HTMLVideoElement, key: "a" | "b", index: number) => {
      const { src, start } = normalize(clips[index]);
      starts[key] = start;
      el.src = src;
      const onMeta = () => {
        el.removeEventListener("loadedmetadata", onMeta);
        if (start > 0) {
          try {
            el.currentTime = start;
          } catch {
            /* seek not ready yet — ignore */
          }
        }
        el.play().catch(() => {});
      };
      el.addEventListener("loadedmetadata", onMeta);
      el.load();
    };

    // Manual loop so a clip with a start time loops back to that point (the native
    // `loop` attribute always restarts at 0). Only the visible layer re-loops.
    const onEndedA = () => {
      if (!a.classList.contains("is-active")) return;
      try {
        a.currentTime = starts.a;
      } catch {
        /* noop */
      }
      a.play().catch(() => {});
    };
    const onEndedB = () => {
      if (!b.classList.contains("is-active")) return;
      try {
        b.currentTime = starts.b;
      } catch {
        /* noop */
      }
      b.play().catch(() => {});
    };
    a.addEventListener("ended", onEndedA);
    b.addEventListener("ended", onEndedB);

    a.classList.add("is-active");
    loadInto(a, "a", 0);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          (activeIsA ? a : b).play().catch(() => {});
        } else {
          a.pause();
          b.pause();
        }
      },
      { threshold: 0.04 }
    );
    if (containerRef.current) io.observe(containerRef.current);

    const timer = window.setInterval(() => {
      if (!inView || clips.length <= 1) return;
      const next = (curClip + 1) % clips.length;
      const incoming = activeIsA ? b : a;
      const outgoing = activeIsA ? a : b;

      incoming.classList.add("is-active");
      outgoing.classList.remove("is-active");
      loadInto(incoming, activeIsA ? "b" : "a", next);
      // free the decoder once the crossfade has completed
      window.setTimeout(() => outgoing.pause(), 1500);

      activeIsA = !activeIsA;
      curClip = next;
    }, interval);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      a.removeEventListener("ended", onEndedA);
      b.removeEventListener("ended", onEndedB);
    };
  }, [reduced, clips, interval]);

  return (
    <div className="hero-montage" ref={containerRef} aria-hidden>
      {reduced ? (
        <div
          className="hero-montage__poster"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <>
          <video
            ref={aRef}
            className="hero-montage__layer"
            poster={poster}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            disablePictureInPicture
          />
          <video
            ref={bRef}
            className="hero-montage__layer"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            disablePictureInPicture
          />
        </>
      )}
      <div className="hero-scrim" />
    </div>
  );
}
