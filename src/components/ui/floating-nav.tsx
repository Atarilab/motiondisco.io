import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "abstract", label: "Abstract" },
  { id: "overview", label: "Overview" },
  { id: "results", label: "Robot Experiments" },
  { id: "simulation", label: "Simulation" },
  { id: "bibtex", label: "Cite" },
];

/**
 * Translucent pill nav that slides in once the hero is scrolled past and
 * highlights the section currently in the viewport.
 */
export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className={`site-nav ${visible ? "is-visible" : ""}`}
      aria-label="Section navigation"
    >
      <a href="#top" className="site-nav__brand">
        MotionDisco
        <span className="dot" aria-hidden />
      </a>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? "is-active" : ""}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
