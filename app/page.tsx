"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Bath,
  CheckCircle2,
  ChefHat,
  CircleDot,
  DraftingCompass,
  Home,
  Phone,
  Sparkles,
  Star,
  Trophy,
  Trees,
} from "lucide-react";

type ProjectLocation = "Indoor" | "Outdoor" | "";
type ProjectType = "Kitchen" | "Bathroom" | "Other" | "Patio" | "";
type Material = "Granite" | "Quartz" | "Tile" | "";

const materials = [
  { name: "Marble", description: "Timeless elegance", tones: "marble-light" },
  { name: "Granite", description: "Bold. Durable. Natural.", tones: "granite-dark" },
  { name: "Quartz", description: "Modern. Low maintenance.", tones: "quartz-soft" },
  { name: "Quartzite", description: "Strength meets beauty.", tones: "quartzite-deep" },
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
  const [location, setLocation] = useState<ProjectLocation>("");
  const [projectType, setProjectType] = useState<ProjectType>("");
  const [material, setMaterial] = useState<Material>("");
  const [otherDetails, setOtherDetails] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const currentMaterialPrompt = useMemo(() => {
    if (projectType === "Kitchen" || projectType === "Patio") return ["Granite", "Quartz"];
    if (projectType === "Bathroom") return ["Tile"];
    return [];
  }, [projectType]);

  function handleLocationChange(next: ProjectLocation) {
    setLocation(next);
    setProjectType(next === "Outdoor" ? "Patio" : "");
    setMaterial("");
    setOtherDetails("");
  }

  function handleProjectTypeChange(next: ProjectType) {
    setProjectType(next);
    setMaterial(next === "Bathroom" ? "Tile" : "");
    setOtherDetails("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          projectType,
          material: projectType === "Other" ? "" : material,
          otherDetails,
          width,
          height,
          appointmentDate,
          appointmentTime,
          name,
          phone,
        }),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your project.");
      }

      setSubmitMessage(
        result.message ||
          "Thank you. Your project details and appointment request have been received.",
      );
      setLocation("");
      setProjectType("");
      setMaterial("");
      setOtherDetails("");
      setWidth("");
      setHeight("");
      setAppointmentDate("");
      setAppointmentTime("");
      setName("");
      setPhone("");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
              <a href="#start-project" className="button button-gold small">
                Start Your Project
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
                <a href="#start-project" className="button button-gold">
                  Start Your Project
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
            {materials.map((item) => (
              <article key={item.name} className={`material-card ${item.tones}`}>
                <div className="material-card-overlay" />
                <div className="material-card-content">
                  <div className="material-icon">
                    <CircleDot size={16} />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
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
            <a href="#start-project" className="button button-gold">
              Start Your Project
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
                {materials.map((item) => (
                  <div key={item.name} className={`swatch ${item.tones}`} />
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

      <section id="start-project" className="project-intake">
        <div className="container">
          <div className="project-intake-shell">
            <div className="project-intake-copy">
              <p className="eyebrow">Concierge Intake</p>
              <h2>Start Your Project</h2>
              <p>
                Share your project details, choose an appointment time, and let
                our team guide the next step.
              </p>
              <div className="intake-step-list">
                {[
                  "Indoor or outdoor",
                  "Project type",
                  "Material selection",
                  "Measurements",
                  "Appointment details",
                  "Email and text confirmation",
                ].map((label, index) => (
                  <div key={label} className="intake-step-pill">
                    <span>{index + 1}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <form className="intake-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <section className="form-card">
                  <div className="form-card-head">
                    <span>01</span>
                    <h3>Where is the project?</h3>
                  </div>
                  <div className="choice-grid two-up">
                    <button
                      type="button"
                      className={`choice-card ${location === "Indoor" ? "active" : ""}`}
                      onClick={() => handleLocationChange("Indoor")}
                    >
                      <Home size={18} />
                      <strong>Indoor</strong>
                      <small>Kitchens, baths, and custom interiors.</small>
                    </button>
                    <button
                      type="button"
                      className={`choice-card ${location === "Outdoor" ? "active" : ""}`}
                      onClick={() => handleLocationChange("Outdoor")}
                    >
                      <Trees size={18} />
                      <strong>Outdoor</strong>
                      <small>Patios and exterior entertaining spaces.</small>
                    </button>
                  </div>
                </section>

                {location ? (
                  <section className="form-card">
                    <div className="form-card-head">
                      <span>02</span>
                      <h3>Select your project type</h3>
                    </div>
                    <div className="choice-grid">
                      {location === "Indoor" ? (
                        <>
                          {["Kitchen", "Bathroom", "Other"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`choice-card ${
                                projectType === option ? "active" : ""
                              }`}
                              onClick={() => handleProjectTypeChange(option as ProjectType)}
                            >
                              <strong>{option}</strong>
                            </button>
                          ))}
                        </>
                      ) : (
                        <button
                          type="button"
                          className={`choice-card ${projectType === "Patio" ? "active" : ""}`}
                          onClick={() => handleProjectTypeChange("Patio")}
                        >
                          <strong>Patio</strong>
                        </button>
                      )}
                    </div>
                  </section>
                ) : null}

                {projectType ? (
                  <section className="form-card">
                    <div className="form-card-head">
                      <span>03</span>
                      <h3>
                        {projectType === "Other"
                          ? "Tell us about the project"
                          : "Choose your material"}
                      </h3>
                    </div>

                    {projectType === "Other" ? (
                      <label className="field">
                        <span>Project details</span>
                        <textarea
                          value={otherDetails}
                          onChange={(event) => setOtherDetails(event.target.value)}
                          placeholder="Describe the space, material ideas, and anything important to know."
                          required
                        />
                      </label>
                    ) : (
                      <div className="choice-grid two-up">
                        {currentMaterialPrompt.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`choice-card ${material === option ? "active" : ""}`}
                            onClick={() => setMaterial(option as Material)}
                          >
                            <strong>{option}</strong>
                          </button>
                        ))}
                      </div>
                    )}
                  </section>
                ) : null}

                {projectType && (projectType === "Other" || material) ? (
                  <section className="form-card">
                    <div className="form-card-head">
                      <span>04</span>
                      <h3>Enter your project dimensions</h3>
                    </div>
                    <div className="field-row">
                      <label className="field">
                        <span>Width (inches)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={width}
                          onChange={(event) => setWidth(event.target.value)}
                          placeholder="120"
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Height (inches)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={height}
                          onChange={(event) => setHeight(event.target.value)}
                          placeholder="36"
                          required
                        />
                      </label>
                    </div>
                    <p className="field-help">Please provide approximate measurements.</p>
                  </section>
                ) : null}

                {width && height ? (
                  <section className="form-card">
                    <div className="form-card-head">
                      <span>05</span>
                      <h3>Choose your appointment time</h3>
                    </div>
                    <div className="field-row">
                      <label className="field">
                        <span>Preferred date</span>
                        <input
                          type="date"
                          value={appointmentDate}
                          onChange={(event) => setAppointmentDate(event.target.value)}
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Preferred time</span>
                        <input
                          type="time"
                          value={appointmentTime}
                          onChange={(event) => setAppointmentTime(event.target.value)}
                          required
                        />
                      </label>
                    </div>
                    <div className="field-row">
                      <label className="field">
                        <span>Full name</span>
                        <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Phone number</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="(555) 555-5555"
                          required
                        />
                      </label>
                    </div>
                  </section>
                ) : null}

                {appointmentDate && appointmentTime && name && phone ? (
                  <section className="form-card confirm-card">
                    <div className="form-card-head">
                      <span>06</span>
                      <h3>Confirm and notify</h3>
                    </div>
                    <div className="confirm-grid">
                      <div className="confirm-note">
                        <CheckCircle2 size={18} />
                        <div>
                          <strong>Company email notification</strong>
                          <p>Your project details will be prepared for the team inbox.</p>
                        </div>
                      </div>
                      <div className="confirm-note">
                        <CheckCircle2 size={18} />
                        <div>
                          <strong>Client text confirmation</strong>
                          <p>Your appointment confirmation will be sent by SMS.</p>
                        </div>
                      </div>
                    </div>

                    {submitError ? <p className="submit-feedback error">{submitError}</p> : null}
                    {submitMessage ? (
                      <p className="submit-feedback success">{submitMessage}</p>
                    ) : null}

                    <button className="button button-gold submit-button" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Confirm Appointment"}
                    </button>
                  </section>
                ) : null}
              </div>
            </form>
          </div>
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
            <a href="#start-project">Start Your Project</a>
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
