import { posterFor } from "@/components/ui/task-card";
import { LazyVideo } from "@/components/ui/lazy-video";

interface VideoTileProps {
  src: string;
  onExpand: (src: string, poster: string) => void;
}

/**
 * A single rounded, click-to-expand video tile (poster + hover expand button).
 * Shares the .video-shell styling used inside the task cards.
 */
export function VideoTile({ src, onExpand }: VideoTileProps) {
  const poster = posterFor(src);
  return (
    <div className="video-shell" onClick={() => onExpand(src, poster)}>
      <button
        type="button"
        className="video-shell__expand"
        aria-label="Expand video"
        onClick={(e) => {
          e.stopPropagation();
          onExpand(src, poster);
        }}
      >
        ⤢
      </button>
      <LazyVideo src={src} poster={poster} controls={false} />
    </div>
  );
}
