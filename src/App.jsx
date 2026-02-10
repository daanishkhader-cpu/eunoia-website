import { useState, useEffect, useRef } from "react";

const GOLD = "#D4A843";
const DARK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const WARM_GRAY = "#F5F3EF";
const MID_GRAY = "#8A8A8A";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Services", "About", "Results", "Industries", "Contact"];
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,0.15)" : "1px solid transparent",
        transition: "all 0.4s ease",
        padding: "0 clamp(24px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Eunoia</span>
          <span style={{ fontSize: 11, color: GOLD, fontFamily: "'DM Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>Tech</span>
        </a>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "#ccc", textDecoration: "none", fontSize: 13, letterSpacing: 1,
              textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = "#ccc"}
            >{l}</a>
          ))}
          <a href="#contact" style={{
            background: GOLD, color: DARK, padding: "10px 24px", borderRadius: 6,
            fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: 0.5,
            fontFamily: "'DM Sans', sans-serif", transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 20px rgba(212,168,67,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >Get Started</a>
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
        >
          <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: "rgba(10,10,10,0.98)", padding: "24px 0",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              color: "#ccc", textDecoration: "none", fontSize: 15, letterSpacing: 1,
              textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "120px clamp(24px, 5vw, 80px) 80px",
    }}>
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Gold accent glow */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw",
        background: `radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />
      <div style={{ maxWidth: 900, position: "relative", zIndex: 2, textAlign: "center" }}>
        <FadeIn>
          <div style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 100,
            border: `1px solid rgba(212,168,67,0.3)`, marginBottom: 32,
            background: "rgba(212,168,67,0.05)",
          }}>
            <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              Eunoia · /juːˈnɔɪ.ə/ · The art of thinking beautifully
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px",
          }}>
            We don't just deliver technology.<br />
            <span style={{ color: GOLD }}>We make sure it works.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2vw, 20px)",
            color: "#999", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 40px",
          }}>
            We help small and mid-market businesses in Ontario modernize their operations — from AI enablement to ERP implementation to change management — with senior leaders who embed directly with your team.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: GOLD, color: DARK, padding: "16px 36px", borderRadius: 8,
              fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(212,168,67,0.25)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
            >Book a Discovery Call</a>
            <a href="#services" style={{
              background: "transparent", color: "#fff", padding: "16px 36px", borderRadius: 8,
              fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(255,255,255,0.2)", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.target.style.borderColor = GOLD}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
            >Explore Our Services</a>
          </div>
        </FadeIn>
        {/* Stats bar */}
        <FadeIn delay={0.4}>
          <div style={{
            display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 64px)", marginTop: 72,
            flexWrap: "wrap",
          }}>
            {[
              { num: "50+", label: "ERP Implementations" },
              { num: "40+", label: "CRM Deployments" },
              { num: "35+", label: "Years Combined Experience" },
              { num: "30%", label: "Average Cost Savings" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: GOLD }}>{s.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MID_GRAY, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PROBLEM/SOLUTION ─────────────────────────────────
function Problem() {
  return (
    <section style={{ background: WARM_GRAY, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>The Problem</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: DARK, lineHeight: 1.2, marginTop: 16, marginBottom: 24,
          }}>
            Technology transformations fail because of <span style={{ color: GOLD }}>people</span>, not technology.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.8,
          }}>
            70% of digital transformations don't achieve their intended outcomes. Not because the technology was wrong — but because the people weren't brought along for the journey. Implementations get delivered but never adopted. Systems go live but teams revert to old processes. Budgets are spent but value is never realized.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.8, marginTop: 16,
          }}>
            Eunoia exists to change that. We don't stop at delivery. <strong style={{ color: DARK }}>Adoption is the goal.</strong>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SERVICES ───────────────────────────────────────
const services = [
  {
    icon: "",
    title: "AI Enablement & Intelligent Automation",
    desc: "From AI readiness assessments to Copilot deployments to custom AI agent design — we help you harness AI practically, not theoretically. We build automations using Power Platform, Celonis, Make.com, and more, so your team spends less time on manual work and more time on what matters.",
    items: ["AI Readiness Assessments", "Microsoft Copilot Rollout & Adoption", "AI Agent Design (RAG, Conversational)", "Workflow Automation & Low-Code Solutions", "Process Automation Quick Wins"],
  },
  {
    icon: "",
    title: "Enterprise Systems (ERP & CRM)",
    desc: "With 50+ successful ERP implementations across D365, SAP, Oracle, and Odoo, we guide you from strategy through selection, implementation, and adoption. Specializing in multi-entity consolidation — turning fragmented systems into a single source of truth.",
    items: ["ERP/CRM Strategy & Selection", "Implementation & Migration", "Multi-Entity Consolidation", "Data Strategy & Power BI Analytics", "Post Go-Live Optimization"],
  },
  {
    icon: "",
    title: "IT Strategy, Security & Compliance",
    desc: "Strategic IT leadership for companies that need enterprise-grade guidance without the enterprise price tag. From cloud migration to SOC 2 readiness, we build the foundation that lets you win bigger contracts and sleep at night.",
    items: ["IT Roadmap & Cloud Strategy", "SOC 2 / ISO 27001 / PCI-DSS Readiness", "IT Cost Optimization Audits", "Cybersecurity Posture Assessment", "Business Continuity & Disaster Recovery"],
  },
  {
    icon: "",
    title: "Change Management & Technology Adoption",
    desc: "Successful transformations are about people first. Using PROSCI methodology, Design Thinking, and our proprietary AHEAD framework, we ensure your team doesn't just receive new technology — they embrace it.",
    items: ["Stakeholder Mapping & Impact Analysis", "Communications & Training Plans", "Design Thinking Facilitation", "Change Network Development", "Post-Deployment Adoption Support"],
  },
];

function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" style={{ background: DARK, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>What We Do</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 16, marginBottom: 12,
          }}>
            Four pillars. <span style={{ color: GOLD }}>One goal.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#888", marginBottom: 48, maxWidth: 600 }}>
            Every engagement is designed to deliver technology that your team actually uses — not just technology that gets installed.
          </p>
        </FadeIn>

        {/* Tab navigation */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 48, flexWrap: "wrap" }}>
            {services.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: active === i ? GOLD : "#666", fontWeight: active === i ? 700 : 500,
                borderBottom: active === i ? `2px solid ${GOLD}` : "2px solid transparent",
                transition: "all 0.3s", letterSpacing: 0.3,
                whiteSpace: "nowrap",
              }}>
                {s.title.split(" (")[0].split(" & ")[0]}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active service detail */}
        <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", minWidth: 300 }}>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700,
              color: "#fff", marginBottom: 16,
            }}>
              {services[active].title}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#999", lineHeight: 1.8 }}>
              {services[active].desc}
            </p>
          </div>
          <div style={{ flex: "0 0 320px" }}>
            <div style={{
              background: CHARCOAL, borderRadius: 16, padding: 32,
              border: "1px solid rgba(212,168,67,0.1)",
            }}>
              <div style={{ fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 20 }}>Capabilities</div>
              {services[active].items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Entry point engagements */}
        <FadeIn delay={0.15}>
          <div style={{
            marginTop: 72, display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24,
          }}>
            {[
              { title: "AI Readiness Assessment", time: "2–4 weeks", desc: "Discover where AI fits in your business and get a practical roadmap to get started." },
              { title: "IT Cost Optimization Audit", time: "2–3 weeks", desc: "We'll find the savings hiding in your IT spend — and show you exactly where to reinvest." },
              { title: "Process Automation Quick Win", time: "~2 weeks", desc: "Pick your most painful manual process. We'll automate it and prove the value fast." },
            ].map((e, i) => (
              <div key={i} style={{
                background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.15)",
                borderRadius: 12, padding: 28, transition: "border-color 0.3s",
              }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = GOLD}
                onMouseLeave={ev => ev.currentTarget.style.borderColor = "rgba(212,168,67,0.15)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Quick Start</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MID_GRAY }}>{e.time}</span>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#fff", marginBottom: 8 }}>{e.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ENGAGEMENT MODELS ──────────────────────────────
function Engagement() {
  return (
    <section style={{ background: CHARCOAL, padding: "80px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>How We Work</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 16, marginBottom: 48,
          }}>
            Three ways to engage.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            {
              num: "01", title: "Project-Based",
              desc: "Scoped engagements with clear deliverables, timelines, and outcomes. Ideal for ERP implementations, AI readiness assessments, or compliance programs.",
            },
            {
              num: "02", title: "Fractional Leadership",
              desc: "Embed one of our senior leaders with your team as a fractional CIO, IT Director, Change Lead, or AI Enablement Lead. Enterprise expertise, 2–3 days a week.",
            },
            {
              num: "03", title: "Advisory Retainer",
              desc: "Ongoing strategic counsel on your IT roadmap, AI strategy, and technology investments. A trusted advisor on speed dial — without the full-time salary.",
            },
          ].map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: DARK, borderRadius: 16, padding: 36,
                border: "1px solid rgba(255,255,255,0.06)",
                height: "100%", transition: "border-color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, color: "rgba(212,168,67,0.2)", fontWeight: 800, marginBottom: 12 }}>{m.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: "#fff", marginBottom: 12 }}>{m.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#888", lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT / TEAM ───────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: WARM_GRAY, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>The Team</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: DARK, lineHeight: 1.2, marginTop: 16, marginBottom: 16,
          }}>
            Senior leaders who <span style={{ color: GOLD }}>show up.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.8, maxWidth: 700, marginBottom: 56 }}>
            No layers of junior consultants. No handoff after the sale. When you hire Eunoia, you get the people who built it — embedded with your team, rolling up their sleeves, and accountable for results.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: 32 }}>
          {/* AK Card */}
          <FadeIn delay={0.1}>
            <div style={{
              background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: DARK,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: GOLD, fontWeight: 700,
                }}>AK</div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: DARK, marginBottom: 2 }}>AbdulKhader Pattillath</h3>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GOLD, fontWeight: 600 }}>Partner — IT Strategy & Enterprise Systems</span>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
                25+ years leading enterprise-scale IT transformations. Former IT Director across healthcare, pharma, manufacturing, retail, and financial services. Specializes in ERP consolidation, cloud modernization, cybersecurity, and compliance programs. Has managed $10M+ programs and delivered $400K+ in annual IT cost savings for clients.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["PMP", "CISM", "CISA", "CSM", "ITIL", "ISO 27001", "D365", "SAP", "Oracle"].map(c => (
                  <span key={c} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: DARK,
                    background: "rgba(212,168,67,0.12)", padding: "4px 12px", borderRadius: 100,
                    fontWeight: 600, letterSpacing: 0.5,
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #eee" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MID_GRAY, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Thought Leadership</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                  IDC IT Security Conference Speaker · Technology Leadership Panelist · Guest Professor, Conestoga College
                </div>
              </div>
            </div>
          </FadeIn>

          {/* DMoney Card */}
          <FadeIn delay={0.2}>
            <div style={{
              background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: DARK,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: GOLD, fontWeight: 700,
                }}>DK</div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: DARK, marginBottom: 2 }}>Daanish Khader</h3>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GOLD, fontWeight: 600 }}>Partner — AI Enablement & Change Management</span>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
                A decade of experience enabling large-scale technology adoption across enterprise organizations. Combines academic expertise in psychology, engineering design, and AI to bridge the gap between technical solutions and human adoption. Led Microsoft Copilot deployment and AI enablement programs at Canada's top enterprises.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["PROSCI", "Lean Six Sigma", "CSM", "ITIL", "Design Thinking", "Power Platform", "AI Agents", "RAG"].map(c => (
                  <span key={c} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: DARK,
                    background: "rgba(212,168,67,0.12)", padding: "4px 12px", borderRadius: 100,
                    fontWeight: 600, letterSpacing: 0.5,
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #eee" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MID_GRAY, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Education</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                  McMaster University — MEng, Product Design (AI & Product Focus) · University of Toronto — BSc, Psychology & Molecular Biology
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── RESULTS ────────────────────────────────────────
function Results() {
  return (
    <section id="results" style={{ background: DARK, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Proven Results</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 16, marginBottom: 48,
          }}>
            We measure success by <span style={{ color: GOLD }}>outcomes.</span>
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {[
            {
              client: "Top 5 Canadian Bank",
              type: "AI Enablement & Change Management",
              results: ["Deployed Microsoft Copilot across multiple business units", "Built comprehensive onboarding & training curriculum for diverse persona groups", "Established People Change Management team from the ground up", "Created enterprise-wide stakeholder mapping for data migration program"],
            },
            {
              client: "Multi-Entity Healthcare Organization",
              type: "ERP Consolidation & IT Strategy",
              results: ["Consolidated 9 disparate ERP instances into unified D365 Business Central", "Achieved $400K annual IT cost reduction", "Implemented real-time Power BI executive dashboards", "Led SOC 2 compliance program across all business units"],
            },
            {
              client: "Global Communications Manufacturer",
              type: "ERP Migration & Cloud Modernization",
              results: ["Migrated from Dynamics GP to D365 Business Central across global operations", "Delivered 15% annual IT cost reduction through cloud strategy", "Strengthened cybersecurity posture through multi-phase security program", "Managed $2M+ IT budget and multi-geography vendor relationships"],
            },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: CHARCOAL, borderRadius: 16, padding: 32, height: "100%",
                border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>{c.type}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#fff", marginBottom: 20 }}>{c.client}</h3>
                {c.results.map((r, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#aaa", lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ─────────────────────────────────────
function Industries() {
  const industries = [
    { icon: "🏥", name: "Healthcare", desc: "ERP consolidation, SOC 2 compliance, and digital modernization for multi-entity healthcare organizations." },
    { icon: "🏭", name: "Manufacturing", desc: "ERP implementation, supply chain optimization, and process automation for production environments." },
    { icon: "🛒", name: "Retail & Distribution", desc: "Omnichannel ERP solutions, POS integration, and inventory management across multi-site operations." },
    { icon: "🏦", name: "Financial Services", desc: "Core system modernization, PCI-DSS compliance, data migration, and AI enablement for financial institutions." },
  ];
  return (
    <section id="industries" style={{ background: WARM_GRAY, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Industries</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: DARK, lineHeight: 1.2, marginTop: 16, marginBottom: 12,
          }}>
            Deep expertise where it <span style={{ color: GOLD }}>matters.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", maxWidth: 600, marginBottom: 48 }}>
            We've delivered results across these industries — and our methodology adapts to any sector that's ready to transform.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: 32, height: "100%",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{ind.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: DARK, marginBottom: 8 }}>{ind.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{ind.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── METHODOLOGY ────────────────────────────────────
function Methodology() {
  const steps = [
    { num: "01", title: "Align", desc: "Understand your business goals, pain points, and current technology landscape." },
    { num: "02", title: "Formulate", desc: "Define the vision, select the right technology, and build the roadmap." },
    { num: "03", title: "Optimize", desc: "Streamline business processes before implementing technology on top of broken workflows." },
    { num: "04", title: "Implement", desc: "Deploy the solution with rigorous project management and stakeholder engagement." },
    { num: "05", title: "Adopt", desc: "Drive adoption through training, communications, and hands-on support until the technology sticks." },
  ];
  return (
    <section style={{ background: DARK, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Our Approach</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 16, marginBottom: 48,
          }}>
            Adoption is the <span style={{ color: GOLD }}>destination.</span>
          </h2>
        </FadeIn>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                flex: "1 1 180px", padding: "32px 24px", position: "relative",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                minWidth: 180,
              }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, color: "rgba(212,168,67,0.15)", fontWeight: 800, marginBottom: 8 }}>{s.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: GOLD, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: CHARCOAL, padding: "100px clamp(24px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <span style={{ color: GOLD, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Let's Talk</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 16, marginBottom: 16,
          }}>
            Ready to think <span style={{ color: GOLD }}>beautifully</span> about your technology?
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#888", lineHeight: 1.8, marginBottom: 40,
          }}>
            Whether you need an AI readiness assessment, an ERP implementation partner, or a fractional IT leader — we'd love to hear about your challenge.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{
            background: DARK, borderRadius: 20, padding: 48,
            border: "1px solid rgba(212,168,67,0.1)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <input placeholder="Your Name" style={{
                  flex: "1 1 200px", padding: "14px 20px", borderRadius: 8,
                  background: CHARCOAL, border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  outline: "none",
                }} />
                <input placeholder="Email" type="email" style={{
                  flex: "1 1 200px", padding: "14px 20px", borderRadius: 8,
                  background: CHARCOAL, border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  outline: "none",
                }} />
              </div>
              <input placeholder="Company Name" style={{
                padding: "14px 20px", borderRadius: 8,
                background: CHARCOAL, border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                outline: "none",
              }} />
              <select style={{
                padding: "14px 20px", borderRadius: 8,
                background: CHARCOAL, border: "1px solid rgba(255,255,255,0.1)",
                color: "#999", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                outline: "none", cursor: "pointer",
              }}>
                <option>What are you interested in?</option>
                <option>AI Enablement & Automation</option>
                <option>Enterprise Systems (ERP/CRM)</option>
                <option>IT Strategy, Security & Compliance</option>
                <option>Change Management & Adoption</option>
                <option>Fractional IT Leadership</option>
                <option>Not sure yet — just exploring</option>
              </select>
              <textarea placeholder="Tell us about your challenge..." rows={4} style={{
                padding: "14px 20px", borderRadius: 8,
                background: CHARCOAL, border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                outline: "none", resize: "vertical",
              }} />
              <button style={{
                background: GOLD, color: DARK, padding: "16px 36px", borderRadius: 8,
                fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(212,168,67,0.25)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
              >Send Message</button>
            </div>
            <div style={{ marginTop: 24, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MID_GRAY }}>
              Or reach us directly: <a href="mailto:contact@eunoiatech.ca" style={{ color: GOLD, textDecoration: "none" }}>contact@eunoiatech.ca</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: DARK, padding: "48px clamp(24px, 5vw, 80px) 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>Eunoia</span>
          <span style={{ fontSize: 10, color: GOLD, fontFamily: "'DM Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase", marginLeft: 8 }}>Technology Solutions</span>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MID_GRAY, marginTop: 8 }}>Toronto, Ontario, Canada</div>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MID_GRAY }}>
          © {new Date().getFullYear()} Eunoia Technology Solutions Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───────────────────────────────────────
export default function EunoiaWebsite() {
  return (
    <div style={{ margin: 0, padding: 0, background: DARK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(212,168,67,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #555; }
        input:focus, textarea:focus, select:focus { border-color: ${GOLD} !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <Problem />
      <Services />
      <Engagement />
      <About />
      <Results />
      <Industries />
      <Methodology />
      <Contact />
      <Footer />
    </div>
  );
}
