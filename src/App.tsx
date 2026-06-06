import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { HeroMontage, type HeroClip } from "@/components/ui/hero-montage";
import { FloatingNav } from "@/components/ui/floating-nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Reveal } from "@/components/ui/reveal";
import { TaskCard } from "@/components/ui/task-card";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { CopyBibtex } from "@/components/ui/copy-bibtex";
import { VideoTile } from "@/components/ui/video-tile";

const ARXIV_URL = "https://arxiv.org/pdf/2606.06139"; // TODO: set the arXiv/paper URL when available.
const YOUTUBE_URL = "https://youtu.be/DHiVz34QYlw";

// Curated, dynamic clips for the looping hero montage (files in static/videos/tasks/).
// Each entry is { src, start } — start is the begin time in seconds (0 = from the
// beginning); the clip also loops back to that start.
const HERO_CLIPS: HeroClip[] = [
  { src: "./static/videos/tasks/climb_place_high_table_1.mp4", start: 9 },
  { src: "./static/videos/tasks/banana_1.mp4", start: 11 },
  { src: "./static/videos/tasks/long_dist_pick_place.mp4", start: 9 },
  { src: "./static/videos/tasks/move_through_clutter_1.mp4", start: 7 },
  { src: "./static/videos/tasks/under_table_pick_place.mp4", start: 34 },
  { src: "./static/videos/tasks/climb_up_with_object_2.mp4", start: 15 },
];
const HERO_POSTER = "./static/images/hero_poster.jpg";

// One entry per task. One clip => single centered video; two => side by side.
const TASKS: {
  num: number;
  title: string;
  videos: string[];
  tags?: string[];
}[] = [
  {
    num: 1,
    title: "Reach the banana hanging from the ceiling",
    // tags: ["Reaching", "Balance"],
    videos: [
      "./static/videos/tasks/banana_1.mp4",
      "./static/videos/tasks/banana_2.mp4",
    ],
  },
  {
    num: 2,
    title: "Climb on the table with the box",
    // tags: ["Climbing", "Contact-rich"],
    videos: [
      "./static/videos/tasks/climb_up_with_object_1.mp4",
      "./static/videos/tasks/climb_up_with_object_2.mp4",
    ],
  },
  {
    num: 3,
    title: "Climb on the table and place the object on the higher table",
    // tags: ["Climbing", "Long-horizon"],
    videos: [
      "./static/videos/tasks/climb_place_high_table_1.mp4",
      "./static/videos/tasks/climb_place_high_table_2.mp4",
    ],
  },
  {
    num: 4,
    title: "Pick and place over long distance",
    // tags: ["Locomotion", "Pick & place"],
    videos: ["./static/videos/tasks/long_dist_pick_place.mp4"],
  },
  {
    num: 5,
    title: "Move through clutter to the other side",
    // tags: ["Navigation", "Clutter"],
    videos: [
      "./static/videos/tasks/move_through_clutter_1.mp4",
      "./static/videos/tasks/move_through_clutter_2.mp4",
    ],
  },
  {
    num: 6,
    title: "Pick the box from under the table and place it on top",
    // tags: ["Manipulation", "Contact-rich"],
    videos: ["./static/videos/tasks/under_table_pick_place.mp4"],
  },
];

// Supplementary simulation clips for the "More Simulation Results" section
// (files in static/videos/simulation/). Add or reorder freely.
const SIM_VIDEOS = [
  "./static/videos/simulation/sim_06-02-2026_12_08_06.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_11_05.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_12_55.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_15_06.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_16_44.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_18_40.mp4",
  "./static/videos/simulation/sim_06-02-2026_12_38_41.mp4",
  "./static/videos/simulation/sim_06-03-2026_11_15_31.mp4",
  "./static/videos/simulation/sim_06-03-2026_11_19_00.mp4",
];

// Placeholder citation — replace fields once the arXiv preprint is live.
const BIBTEX = `@misc{taouil2026motiondiscomotiondiscoveryextreme,
      title={{MotionDisco}: Motion Discovery for Extreme Humanoid Loco-Manipulation}, 
      author={Ilyass Taouil and Michal Ciebelski and Shafeef Omar and Haizhou Zhao and Angela Dai and Aaron M. Johnson and Majid Khadiv},
      year={2026},
      eprint={2606.06139},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2606.06139}, 
}`;

function App() {
  const reduce = useReducedMotion();
  const [lightbox, setLightbox] = useState<{ src: string; poster?: string } | null>(
    null
  );

  const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <FloatingNav />

      {/* ===================================================== HERO ===== */}
      <section id="top" className="hero hero-with-video-bg">
        <HeroMontage clips={HERO_CLIPS} poster={HERO_POSTER} />

        <div className="hero-body">
          <div className="container is-max-desktop hero-body-container">
            <motion.div
              className="columns is-centered"
              variants={heroContainer}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              <div className="column has-text-centered">
                {/* <motion.div variants={heroItem}>
                  <span className="hero-eyebrow">
                    <span className="gem">◇</span> Automated Skill Discovery
                  </span>
                </motion.div> */}
                <motion.h1
                  className="title publication-title has-text-centered"
                  variants={heroItem}
                >
                  <span className="publication-title-main">
                    <span className="title-motion">Motion</span>
                    <span className="title-disco">Disco</span>
                  </span>
                  <span className="publication-title-sub">
                    <span className="title-line-1">Motion Discovery for Extreme </span>
                    <span className="title-line-2">Humanoid Loco-Manipulation</span>
                  </span>
                </motion.h1>
              </div>
            </motion.div>

            <div className="columns is-centered hero-bottom-content">
              <div className="column has-text-centered">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: reduce ? 0 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="is-size-5 publication-authors">
                    <span className="author-block">
                      <a
                        href="https://www.linkedin.com/in/ilyass-taouil-8b2b15a7/?locale=en"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>Ilyass Taouil</strong>
                      </a>
                      <sup>1,*</sup>, 
                    </span>
                    <span className="author-block">
                      <strong>Michal Ciebielski</strong>
                      <sup>1,*</sup>,
                    </span>
                    <span className="author-block">
                      <a
                        href="https://shafeef901.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>Shafeef Omar</strong>
                      </a>
                      <sup>1,*</sup>,
                    </span>
                    <br />
                    <span className="author-block">
                      Haizhou Zhao<sup>1,2</sup>,
                    </span>
                    <span className="author-block">
                      <a
                        href="https://www.3dunderstanding.org/team.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Angela Dai
                      </a>
                      <sup>1</sup>,
                    </span>
                    <span className="author-block">
                      <a
                        href="https://www.linkedin.com/in/aaron-johnson-47b6772a/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Aaron M. Johnson
                      </a>
                      <sup>3</sup>,
                    </span>
                    <span className="author-block">
                      <a
                        href="https://www.ce.cit.tum.de/en/aipd/home/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Majid Khadiv
                      </a>
                      <sup>1</sup>
                    </span>
                  </div>

                  <div className="is-size-6 publication-authors">
                    <span className="author-block">
                      <sup>1</sup>Technical University of Munich, Germany,&nbsp;
                    </span>
                    <span className="author-block">
                      <sup>2</sup>New York University, USA,&nbsp;
                    </span>
                    <span className="author-block">
                      <sup>3</sup>Carnegie Mellon University, USA
                    </span>
                  </div>

                  <div className="publication-footnote">* Equal contribution</div>

                  <div className="has-text-centered mt-6">
                    <div className="publication-links">
                      <span className="link-block">
                        <a
                          href={ARXIV_URL}
                          className="external-link button is-normal is-rounded is-dark"
                        >
                          <span className="icon">
                            <i className="ai ai-arxiv"></i>
                          </span>
                          <span>arXiv</span>
                        </a>
                      </span>
                      {/* <span className="link-block">
                        <a
                          href="https://github.com/atarilab/motiondisco.io"
                          className="external-link button is-normal is-rounded is-dark"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="icon">
                            <i className="fab fa-github"></i>
                          </span>
                          <span>Code</span>
                        </a>
                      </span> */}
                      <span className="link-block">
                        <a
                          href={YOUTUBE_URL}
                          className="external-link button is-normal is-rounded is-dark"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="icon">
                            <i className="fab fa-youtube"></i>
                          </span>
                          <span>Video</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= ABSTRACT ===== */}
      <section id="abstract" className="section section-abstract">
        <div className="container is-max-desktop">
          <Reveal>
            <div className="columns is-centered has-text-centered">
              <div className="column is-four-fifths">
                <h2 className="title is-3">Abstract</h2>
                <div className="content has-text-justified">
                  <p>
                    We present <strong>MotionDisco</strong>, a framework that discovers
                    contact-rich, long-horizon humanoid loco-manipulation motions from
                    scratch, without relying on teleoperation or motion retargeting from
                    human demonstrations. This is challenging because the space of possible
                    contact interactions grows combinatorially with the task horizon and the
                    number of objects in the scene.
                  </p>
                  <p>
                    <strong>MotionDisco</strong> enables rapid discovery of novel motions by
                    coupling a large language model (LLM) guided evolutionary search over
                    sequences of interactions with an efficient sequential kinodynamic
                    trajectory optimizer and pruning strategy, enabling the rapid discovery of
                    novel skills. Through extensive ablation studies, we show that our
                    LLM-guided search discovers successful whole-body trajectories across
                    several challenging long-horizon tasks.
                  </p>
                  <p>
                    Finally, by training reinforcement learning tracking policies on the
                    discovered trajectories, we transfer the motions to a real humanoid robot.
                  </p>
                  <p>
                    <b>
                      This is the first work to discover and deploy long-horizon humanoid
                      loco-manipulation skills entirely through automated evolutionary search.
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= OVERVIEW ===== */}
      <section id="overview" className="section section-overview">
        <div className="container is-max-desktop has-text-centered">
          <Reveal>
            <h2 className="title is-2 section-main-title">Overview</h2><br/>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="overview-figure">
              <img
                src="./static/images/overview.png"
                alt="Overview of the MotionDisco framework: an LLM-guided evolutionary tree search over interaction programs coupled with a contact-explicit motion planner."
              />
            </figure>
            <p className="overview-caption">
              MotionDisco couples LLM-guided evolutionary discovery of contact plans (left)
              with contact-explicit trajectory optimization (right). Each search node proposes
              a mutation of its parent program, conditioned on the goal prompt and the parent’s
              feasibility feedback; executing the mutated program yields a discrete contact plan
              (denoted by the blue dots). Plans that pass a kinematic feasibility check are sent
              to the trajectory optimizer, which assesses dynamic feasibility and returns the
              feedback that guides subsequent mutations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================== RESULTS ===== */}
      <section id="results" className="section section-results">
        <div className="container is-max-desktop">
          <Reveal>
            <div className="has-text-centered">
              <h2 className="title is-2 section-main-title">
                Discovered Skills for
                <br />
                Diverse Long-Horizon Tasks
              </h2>
            </div>
          </Reveal>

          <div
            className="tasks-grid"
            style={{ marginTop: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {TASKS.map((task, i) => (
              <Reveal key={task.num} delay={Math.min(i * 0.04, 0.2)}>
                <TaskCard
                  index={task.num}
                  total={TASKS.length}
                  title={task.title}
                  videos={task.videos}
                  tags={task.tags}
                  onExpand={(src, poster) => setLightbox({ src, poster })}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== SIMULATION ===== */}
      <section id="simulation" className="section section-simulation">
        <div className="container is-max-desktop">
          <Reveal>
            <div className="has-text-centered">
              <h2 className="title is-2 section-main-title">More Simulation Results</h2>
              <p className="section-lead">
                Long-horizon reasoning and motion generation for more tasks.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="sim-grid">
              {SIM_VIDEOS.map((src) => (
                <VideoTile
                  key={src}
                  src={src}
                  onExpand={(s, p) => setLightbox({ src: s, poster: p })}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================================== BIBTEX ===== */}
      <section id="bibtex" className="section section-bibtex">
        <div className="container is-max-desktop has-text-centered">
          <Reveal>
            <h2 className="title is-2 section-main-title">Citation</h2>
            <CopyBibtex bibtex={BIBTEX} />
          </Reveal>
        </div>
      </section>

      {/* =================================================== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <div className="content">
                <p>
                  Page template borrowed from{" "}
                  <a href="https://nerfies.github.io/" target="_blank" rel="noopener noreferrer">
                    Nerfies
                  </a> and modified with Claude :)
                </p>

                <p>MotionDisco · Technical University of Munich · 2026</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <VideoLightbox
        src={lightbox?.src ?? null}
        poster={lightbox?.poster}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}

export default App;
