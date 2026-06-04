import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoLightboxProps {
  src: string | null;
  poster?: string;
  onClose: () => void;
}

/**
 * Fullscreen, dimmed viewer for a single clip. Opens with controls, closes on
 * backdrop click or Escape, and locks body scroll while open.
 */
export function VideoLightbox({ src, poster, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="lightbox__inner"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="lightbox__close"
              onClick={onClose}
              aria-label="Close video"
            >
              ✕
            </button>
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
