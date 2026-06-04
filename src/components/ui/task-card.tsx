import { MouseEvent, useRef } from "react";
import { LazyVideo } from "@/components/ui/lazy-video";

/** ./static/videos/tasks/banana_1.mp4 -> ./static/images/posters/banana_1.jpg */
export function posterFor(src: string): string {
  const file = (src.split("/").pop() ?? "").replace(/\.mp4$/i, ".jpg");
  return `./static/images/posters/${file}`;
}

interface TaskCardProps {
  index: number;
  total: number;
  title: string;
  videos: string[];
  tags?: string[];
  onExpand: (src: string, poster: string) => void;
}

export function TaskCard({
  index,
  total,
  title,
  videos,
  tags = [],
  onExpand,
}: TaskCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const num = String(index).padStart(2, "0");
  const isDouble = videos.length > 1;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article className="task-card" ref={cardRef} onMouseMove={handleMove}>
      <div className="task-card__glow" aria-hidden />

      <header className="task-card__head">
        <span className="task-card__index">
          {num} / {String(total).padStart(2, "0")}
        </span>
        <h3 className="task-card__title">{title}</h3>
        {tags.length > 0 && (
          <div className="task-card__chips">
            {tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className={`task-card__videos ${isDouble ? "is-double" : "is-single"}`}>
        {videos.map((src) => {
          const poster = posterFor(src);
          return (
            <div
              className="video-shell"
              key={src}
              onClick={() => onExpand(src, poster)}
            >
              <button
                type="button"
                className="video-shell__expand"
                aria-label={`Expand video: ${title}`}
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
        })}
      </div>
    </article>
  );
}
