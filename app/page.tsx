import Image from "next/image";
import {
  ArrowRight,
  Award,
  Bath,
  ChefHat,
  CircleDot,
  DraftingCompass,
  Home,
  Phone,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const materials = [
  {
    name: "Marble",
    description: "Timeless elegance",
    tones: "marble-light",
  },
  {
    name: "Granite",
    description: "Bold. Durable. Natural.",
    tones: "granite-dark",
  },
  {
    name: "Quartz",
    description: "Modern. Low maintenance.",
    tones: "quartz-soft",
  },
  {
    name: "Quartzite",
    description: "Strength meets beauty.",
    tones: "quartzite-deep",
  },
];

const projects = [
  { title: "Modern Kitchen", icon: ChefHat },
  { title: "Luxury Bath", icon: Bath },
  { title: "Contemporary Living", icon: Sparkles },
  { title: "Timeless Elegance", icon: Home },
];

const process = [
  { step: "01", title: "Select", text: "Choose your perfect stone." },
  { step: "02", title: "Fabricate", text: "Cut with precision." },
  { step: "03", title: "Install", text: "Finished to perfection." },
];

const stats = [
  { label: "Projects Completed", value: "500+", icon: Trophy },
  { label: "Rated By Our Clients", value: "5-Star", icon: Star },
  { label: "Turnaround", value: "Fast", icon: Award },
];

function StoneSlab({ className, sheen = true }: { className?: string; sheen?: boolean }) {
  return (
    <div className={`stone-slab ${className ?? ""}`}>
      <div className="stone-veins" />
      <div className="stone-vein stone-vein-a" />
      <div className="stone-vein stone-vein-b" />
      {sheen ? <div className="stone-sheen" /> : null}
    </div>
  );
}

function BrandLockup() {
  return (
    <div className="brand-lockup">
      <Image
        src="/logo.png"
        alt="Stone House logo"
        width={72}
        height={72}
        className="brand-logo"
        priority
      />
      <div>
        <p className="brand-title">Stone House</p>
        <p className="brand-tag">Marble / Granite / Tile</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-right-glow" />
        <div className="hero-pendants">
          <span />
          <span />
          <span />
        </div>

        <div className="container hero-inner">
          <header className="topbar">
            <BrandLockup />
            <nav className="nav-links">
              <a href="#materials">Materials</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#visualizers">Visualizers</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#quote" className="button button-gold small">
                Get A Quote
              </a>
            </nav>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <h1>Crafted In Stone. Designed For Life.</h1>
              <p>
                Custom marble, granite, and quartz countertops. Precision
                fabrication. Flawless installation.
              </p>
              <div className="hero-actions">
                <a href="#quote" className="button button-gold">
                  Get A Quote
                </a>
                <a href="#materials" className="button button-outline">
                  Explore Materials
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-back-wall" />
              <div className="hero-light-strip" />
              <StoneSlab className="hero-island-top" />
              <div className="hero-island-base" />
              <div className="hero-waterfall" />
              <div className="hero-window" />
              <div className="hero-chairs">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="materials" className="materials">
        <div className="container">
          <div className="section-head">
            <h2>Explore Our Materials</h2>
            <p>
              Hand-selected natural and engineered stones. Endless beauty.
              Lasting performance.
            </p>
          </div>

          <div className="material-grid">
            {materials.map((material) => (
              <article key={material.name} className={`material-card ${material.tones}`}>
                <div className="material-card-overlay" />
                <div className="material-card-content">
                  <div className="material-icon">
                    <CircleDot size={16} />
                  </div>
                  <h3>{material.name}</h3>
                  <p>{material.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visualizers" className="visualizers">
        <div className="container visualizers-grid">
          <div className="visualizers-copy">
            <h2>Design Your Space</h2>
            <p>
              Bring your vision to life with our interactive tools. Visualize the
              perfect countertop before we cut a single slab.
            </p>
            <a href="#quote" className="button button-gold">
              Launch Kitchen Visualizer
              <ArrowRight size={16} />
            </a>
            <div className="visualizer-links">
              <span>
                <ChefHat size={16} />
                Kitchen Visualizer
              </span>
              <span>
                <Bath size={16} />
                Bath Visualizer
              </span>
              <span>
                <DraftingCompass size={16} />
                Edge Visualizer
              </span>
            </div>
          </div>

          <div className="visualizer-frame">
            <aside className="visualizer-panel left">
              <p>Choose Stone</p>
              <div className="swatch-grid">
                {materials.map((material) => (
                  <div key={material.name} className={`swatch ${material.tones}`} />
                ))}
              </div>
            </aside>

            <div className="visualizer-stage">
              <div className="visualizer-light-strip" />
              <StoneSlab className="visualizer-island-top" sheen={false} />
              <div className="visualizer-island-base" />
              <div className="visualizer-waterfall" />
            </div>

            <aside className="visualizer-panel right">
              <p>Choose Edge</p>
              <div className="edge-list">
                {["Eased", "Mitered", "Round", "Bevel"].map((edge) => (
                  <span key={edge}>{edge}</span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="about" className="process">
        <div className="container">
          <h2>Our Process</h2>
          <div className="process-grid">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <span className="process-step">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="projects">
        <div className="container">
          <div className="section-head projects-head">
            <h2>Featured Projects</h2>
            <a href="#contact">View All Projects</a>
          </div>

          <div className="project-grid">
            {projects.map(({ title, icon: Icon }, index) => (
              <article
                key={title}
                className={`project-card project-variant-${(index % 4) + 1}`}
              >
                <div className="project-card-overlay" />
                <div className="project-card-content">
                  <div className="project-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="stats-grid">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-card">
                <div className="stat-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{value}</h3>
                  <p>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="cta">
        <div className="container cta-inner">
          <div>
            <h2>Ready To Elevate Your Space?</h2>
            <p>
              Get a free quote and expert guidance for your next kitchen, bath,
              or statement stone installation.
            </p>
          </div>
          <a href="#contact" className="button button-gold">
            Get Your Free Estimate
          </a>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <BrandLockup />
          <div className="footer-links">
            <a href="#materials">Materials</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#visualizers">Visualizers</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-contact">
            <div>
              <Phone size={16} />
              <span>215.750.9100</span>
            </div>
            <p>Philadelphia, PA</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
