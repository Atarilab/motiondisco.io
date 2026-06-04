import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin iridescent bar pinned to the very top of the page that fills as the
 * user scrolls. Springed so it feels fluid rather than mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}
