import { useMemo, useState } from "react";

const projects = [
  {
    id: "rde",
    number: "01",
    title: "React Desktop Environment",
    eyebrow: "Open-source system",
    year: "2026",
    color: "acid",
    summary: "A portable application runtime where identity, state, and presentation are separate concerns.",
    description: "A React-based application host that can project the same runtime through desktops, embedded surfaces, mobile routes, and whatever comes next.",
    tags: ["React", "Runtime design", "Open source"],
    status: "In development",
    link: "https://github.com/brand-identity-brand/react-desktop-environment",
  },
  {
    id: "blrow",
    number: "02",
    title: "BLROW.WORLD",
    eyebrow: "Interactive web world",
    year: "2025",
    color: "blue",
    summary: "A playful web experiment that turns familiar internet platforms into places you can walk through.",
    description: "Part game, part browser archaeology: an explorable series of portals built from the visual memory of the social web.",
    tags: ["Next.js", "Game design", "Creative code"],
    status: "Live experiment",
    link: "https://blrow.world",
  },
  {
    id: "legacy",
    number: "03",
    title: "Legacy",
    eyebrow: "Narrative board game",
    year: "2026",
    color: "coral",
    summary: "A generational strategy game about the stories, traits, and consequences a family leaves behind.",
    description: "A digital card and board game prototype with a composable rules engine, scene system, and evolving family history.",
    tags: ["Systems design", "React", "Game engine"],
    status: "Prototype",
  },
  {
    id: "unawarehouse",
    number: "04",
    title: "Unawarehouse",
    eyebrow: "Commerce operations",
    year: "2025",
    color: "cream",
    summary: "Tools that make warehouse knowledge visible at the exact moment a retail team needs it.",
    description: "A Shopify application and extension suite focused on product locations, inventory context, and fast operational workflows.",
    tags: ["Shopify", "Product design", "Operations"],
    status: "Private beta",
  },
];

const navItems = [
  ["work", "Work"],
  ["about", "About"],
  ["contact", "Contact"],
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function App() {
  const [view, setView] = useState("work");
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("All");

  const selected = projects.find((project) => project.id === selectedId);
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "All" || project.tags.includes(filter)),
    [filter],
  );

  const navigate = (nextView) => {
    setSelectedId(null);
    setView(nextView);
  };

  const openExternal = (url) => {
    if (window.portfolio?.openExternal) window.portfolio.openExternal(url);
    else window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app-frame">
      <header className="titlebar">
        <div className="titlebar-drag" />
        <button className="wordmark" onClick={() => navigate("work")}>BIB<span>®</span></button>
        <div className="window-title">Brand Identity Brand — Portfolio</div>
        <div className="availability"><i /> Available for selected work</div>
      </header>

      <aside className="sidebar">
        <div className="identity">
          <span className="identity-label">Independent studio / Toronto</span>
          <p>Designing identities, interfaces, and strange little systems for the web.</p>
        </div>

        <nav aria-label="Portfolio navigation">
          {navItems.map(([id, label], index) => (
            <button
              key={id}
              className={view === id && !selected ? "active" : ""}
              onClick={() => navigate(id)}
            >
              <span>0{index + 1}</span>{label}<Arrow />
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => openExternal("https://github.com/brand-identity-brand")}>GitHub <Arrow diagonal /></button>
          <button onClick={() => openExternal("https://github.com/brand-identity-brand")}>GitHub <Arrow diagonal /></button>
          <p>© 2026 BIB. Built in public.</p>
        </div>
      </aside>

      <main className="content">
        {selected ? (
          <ProjectDetail project={selected} onBack={() => setSelectedId(null)} onOpen={openExternal} />
        ) : view === "work" ? (
          <Work projects={visibleProjects} filter={filter} setFilter={setFilter} onSelect={setSelectedId} />
        ) : view === "about" ? (
          <About />
        ) : (
          <Contact onOpen={openExternal} />
        )}
      </main>
    </div>
  );
}

function Work({ projects: items, filter, setFilter, onSelect }) {
  const filters = ["All", "React", "Product design", "Game design"];
  return (
    <div className="page work-page">
      <section className="hero">
        <p className="kicker">Selected work / 2025—26</p>
        <h1>Ideas with<br /><em>an interface.</em></h1>
        <div className="hero-note">
          <span>(A portfolio)</span>
          <p>I work where brand, product, and software overlap—making useful things with a point of view.</p>
        </div>
      </section>

      <div className="project-toolbar">
        <span>{String(items.length).padStart(2, "0")} projects</span>
        <div className="filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>

      <section className="project-grid">
        {items.map((project) => (
          <button className="project-card" key={project.id} onClick={() => onSelect(project.id)}>
            <div className={`project-art ${project.color}`}>
              <span className="project-number">{project.number}</span>
              <ProjectGlyph id={project.id} />
              <span className="project-year">{project.year}</span>
            </div>
            <div className="project-copy">
              <span>{project.eyebrow}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <div>{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
            </div>
            <span className="card-arrow"><Arrow /></span>
          </button>
        ))}
      </section>
    </div>
  );
}

function ProjectGlyph({ id }) {
  if (id === "rde") return <div className="glyph desktop-glyph"><i /><i /><i /><strong>RDE</strong></div>;
  if (id === "blrow") return <div className="glyph globe-glyph">BLR<br />OW<span>●</span></div>;
  if (id === "legacy") return <div className="glyph legacy-glyph"><i>♙</i><strong>LEGACY</strong><i>♟</i></div>;
  return <div className="glyph warehouse-glyph"><span>UN</span><span>AWARE</span><span>HOUSE</span></div>;
}

function ProjectDetail({ project, onBack, onOpen }) {
  return (
    <article className="page detail-page">
      <button className="back-button" onClick={onBack}>← All projects</button>
      <div className={`detail-visual ${project.color}`}>
        <span>{project.number} / {project.year}</span>
        <ProjectGlyph id={project.id} />
      </div>
      <div className="detail-copy">
        <p className="kicker">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="detail-lede">{project.description}</p>
        <dl>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Disciplines</dt><dd>{project.tags.join(" · ")}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
        </dl>
        {project.link && <button className="primary-action" onClick={() => onOpen(project.link)}>Visit project <Arrow diagonal /></button>}
      </div>
    </article>
  );
}

function About() {
  return (
    <div className="page text-page">
      <p className="kicker">About / Brand Identity Brand</p>
      <h1>One studio,<br /><em>many shapes.</em></h1>
      <div className="text-columns">
        <p className="large-copy">Brand Identity Brand is the independent practice of a designer-developer based in Toronto.</p>
        <div>
          <p>I make identity systems, web products, creative tools, and experimental games. The work usually starts with a knotty idea and ends as something people can actually touch.</p>
          <p>I’m especially interested in software with personality: interfaces that explain themselves, systems that reward curiosity, and brands that behave like more than a logo.</p>
        </div>
      </div>
      <div className="services">
        <span>Selected capabilities</span>
        <ul><li>Brand systems</li><li>Product design</li><li>Creative development</li><li>Prototyping</li><li>Art direction</li></ul>
      </div>
    </div>
  );
}

function Contact({ onOpen }) {
  return (
    <div className="page contact-page">
      <p className="kicker">Contact / Say hello</p>
      <h1>Have a good<br /><em>problem?</em></h1>
      <p>Tell me what you’re making, what’s stuck, or what doesn’t exist yet.</p>
      <button className="email-link" onClick={() => onOpen("https://github.com/brand-identity-brand")}>Start on GitHub <Arrow diagonal /></button>
      <div className="contact-meta"><span>Based in Toronto, Canada</span><span>Working worldwide</span><span>Replies within 2–3 days</span></div>
    </div>
  );
}

export default App;
