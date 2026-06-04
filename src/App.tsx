import { GlassTextOverlay } from "@/components/ui/glass-text-overlay";
import { LazyVideo } from "@/components/ui/lazy-video";

const YOUTUBE_URL = "https://youtu.be/DHiVz34QYlw";

// Optional hero background video. Set to a path (e.g. "./static/videos/hero.mp4")
// to show a looping background behind the title; null shows the gradient backdrop.
const HERO_VIDEO: string | null = null;

// One section per task. List one clip for a single centered video, or two clips
// to show them side by side. Files live in static/videos/tasks/.
const TASKS: { num: number; title: string; videos: string[] }[] = [
  {
    num: 1,
    title: "Banana",
    videos: [
      "./static/videos/tasks/banana_1.mp4",
      "./static/videos/tasks/banana_2.mp4",
    ],
  },
  {
    num: 2,
    title: "Climb Up with Object",
    videos: [
      "./static/videos/tasks/climb_up_with_object_1.mp4",
      "./static/videos/tasks/climb_up_with_object_2.mp4",
    ],
  },
  {
    num: 3,
    title: "Climb Up & Place on High Table",
    videos: [
      "./static/videos/tasks/climb_place_high_table_1.mp4",
      "./static/videos/tasks/climb_place_high_table_2.mp4",
    ],
  },
  {
    num: 4,
    title: "Long-Distance Pick & Place",
    videos: ["./static/videos/tasks/long_dist_pick_place.mp4"],
  },
  {
    num: 5,
    title: "Move Through Clutter",
    videos: [
      "./static/videos/tasks/move_through_clutter_1.mp4",
      "./static/videos/tasks/move_through_clutter_2.mp4",
    ],
  },
  {
    num: 6,
    title: "Under-Table Pick & Place",
    videos: ["./static/videos/tasks/under_table_pick_place.mp4"],
  },
];

function App() {
  return (
    <>
      <section className="hero hero-with-video-bg">
        {HERO_VIDEO && (
          <video className="hero-video-bg" autoPlay muted loop playsInline preload="auto">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="hero-body">
          <div className="container is-max-desktop hero-body-container">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <GlassTextOverlay
                  className="mb-8 mx-auto"
                  backgroundColor="rgba(0, 0, 0, 0.0)"
                  borderRadius="8px"
                >
                  <h1 className="title publication-title has-text-centered">
                    <span className="publication-title-main">
                      <span className="title-motion">Motion</span><span className="title-disco">Disco</span>
                    </span>
                    <span className="publication-title-sub">
                      <span className="title-line-1">Motion Discovery for Extreme</span>
                      <span className="title-line-2">Humanoid Loco-Manipulation</span>
                    </span>
                  </h1>
                </GlassTextOverlay>
              </div>
            </div>
            <div className="columns is-centered hero-bottom-content">
              <div className="column has-text-centered">
                <GlassTextOverlay
                  className="mx-auto"
                  backgroundColor="rgba(0, 0, 0, 0.0)"
                  borderRadius="8px"
                >
                  <div className="is-size-5 publication-authors">
                    <span className="author-block">
                      <a href="https://www.linkedin.com/in/ilyass-taouil-8b2b15a7/?locale=en" target="_blank" rel="noopener noreferrer">Ilyass Taouil</a><sup>1,*</sup>,
                    </span>
                    <span className="author-block">
                      Michal Ciebielski<sup>1,*</sup>,
                    </span>
                    <span className="author-block">
                      <a href="https://shafeef901.github.io/" target="_blank" rel="noopener noreferrer">Shafeef Omar</a><sup>1,*</sup>,
                    </span>
                    <span className="author-block">
                      Haizhou Zhao<sup>1,2</sup>,
                    </span>
                    <span className="author-block">
                      <a href="https://www.3dunderstanding.org/team.html" target="_blank" rel="noopener noreferrer">Angela Dai</a><sup>1</sup>,
                    </span>
                    <span className="author-block">
                      Aaron M. Johnson<sup>3</sup>,
                    </span>
                    <span className="author-block">
                      <a href="https://www.ce.cit.tum.de/en/aipd/home/" target="_blank" rel="noopener noreferrer">Majid Khadiv</a><sup>1</sup>
                    </span>
                  </div>

                  <div className="is-size-6 publication-authors">
                    <span className="author-block"><sup>1</sup>Technical University of Munich, Germany,&nbsp;</span>
                    <span className="author-block"><sup>2</sup>New York University, USA,&nbsp;</span>
                    <span className="author-block"><sup>3</sup>Carnegie Mellon University, USA</span>
                  </div>

                  <div className="publication-footnote">* Equal contribution</div>
                </GlassTextOverlay>

                <div className="has-text-centered mt-6">
                  <div className="publication-links">
                    {/* Paper link — TODO: set the arXiv/paper URL when available. */}
                    <span className="link-block">
                      <a
                        href="#"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="ai ai-arxiv"></i>
                        </span>
                        <span>arXiv</span>
                      </a>
                    </span>
                    {/* Video Link. */}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">Abstract</h2>
              <div className="content has-text-justified">
                <p>
                  We present <strong>MotionDisco</strong>, a framework that discovers contact-rich,
                  long-horizon humanoid loco-manipulation motions from scratch, without relying on
                  teleoperation or motion retargeting from human demonstrations. This is challenging
                  because the space of possible contact interactions grows combinatorially with the
                  task horizon and the number of objects in the scene.
                </p>
                <p>
                  <strong>MotionDisco</strong> enables rapid discovery of novel motions by coupling a
                  large language model (LLM) guided evolutionary search over sequences of interactions
                  with an efficient sequential kinodynamic trajectory optimizer and pruning strategy,
                  enabling the rapid discovery of novel skills. Through extensive ablation studies, we
                  show that our LLM-guided search discovers successful whole-body trajectories across
                  several challenging long-horizon tasks.
                </p>
                <p>
                  Finally, by training reinforcement learning tracking policies on the discovered
                  trajectories, we transfer the motions to a real humanoid robot. This is the first
                  work to discover and deploy long-horizon humanoid loco-manipulation skills entirely
                  through automated evolutionary search.
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tasks-intro">
        <div className="container is-max-desktop has-text-centered">
          <h2 className="title is-2 section-main-title">Discovered Skills</h2>
        </div>
      </section>

      {TASKS.map((task) => {
        const colClass =
          task.videos.length > 1 ? "column is-half" : "column is-three-quarters";
        return (
          <section className="section section-task" key={task.num}>
            <div className="container is-max-desktop">
              <h2 className="title is-3 has-text-centered task-title">
                {task.num}. {task.title}
              </h2>
              <div className="columns is-centered">
                {task.videos.map((src) => (
                  <div className={colClass} key={src}>
                    <div className="publication-video">
                      <LazyVideo src={src} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <footer className="footer">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <div className="content">
                <p>
                  Page template borrowed from{" "}
                  <a href="https://nerfies.github.io/" target="_blank" rel="noopener noreferrer">
                    Nerfies
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
