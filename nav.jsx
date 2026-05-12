/* global React, framerMotion */
const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = framerMotion;
const { Icon } = window.TXCHY_UI;

/* ======================================================================
   Loading screen — 000→100 over ~2.7s, rotating words, neon gradient bar
====================================================================== */
function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const words = ['Setups', 'Wallpapers', 'Gaming', 'Anime', 'Aesthetic'];

  useEffect(() => {
    const start = performance.now();
    const dur = 2700;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setExiting(true), 320);
        setTimeout(onComplete, 1120);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="loader"
      style={{
        opacity: exiting ? 0 : 1,
        filter: exiting ? 'blur(20px)' : 'none',
        transition: 'opacity .8s cubic-bezier(.7,0,.2,1), filter .8s cubic-bezier(.7,0,.2,1)',
      }}
    >
      <div className="loader-inner">
      <div className="loader-grid" />
      <div className="loader-glow" />

      <div className="loader-topleft">
        <span className="status-dot pulse-dot" />
        <span className="eyebrow">TXCHY · SYSTEM</span>
      </div>

      <div className="loader-topright">
        <span className="eyebrow">VAULT v3.2 — 2026</span>
      </div>

      <div className="loader-center">
        <div className="loader-word-stack">
          <div
            key={words[wordIdx]}
            className="font-display loader-word animate-role-fade"
          >
            {words[wordIdx]}
          </div>
        </div>
        <div className="loader-sub eyebrow">Loading the gallery corridor…</div>
      </div>

      <div className="loader-bottomleft mono">
        <div className="mono small muted">FRAME · 0042</div>
        <div className="mono small muted">CHANNEL · NEON / VIO / PINK</div>
        <div className="mono small muted">FPS · 60 · LOSSLESS</div>
      </div>

      <div className="loader-bottomright tab-num">
        <span className="loader-count">{String(count).padStart(3, '0')}</span>
        <span className="loader-pct">/100</span>
      </div>

      <div className="loader-bar">
        <div className="loader-bar-track" />
        <div
          className="loader-bar-fill accent-gradient animate-gradient"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
      </div>
    </div>
  );
}

/* ======================================================================
   Floating navbar
====================================================================== */
function Navbar({ active, onJump }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    ['home', 'Home'],
    ['gallery', 'Gallery'],
    ['setups', 'Setups'],
    ['wallpapers', 'Wallpapers'],
    ['collab', 'Collab'],
  ];

  return (
    <motion.div
      className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="nav-pill glass">
        <button className="nav-logo" onClick={() => onJump('home')} aria-label="home">
          <span className="nav-logo-ring animate-gradient accent-gradient" />
          <span className="nav-logo-core">
            <span className="font-display">TX</span>
          </span>
        </button>
        <div className="nav-sep" />
        <nav className="nav-links">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => onJump(id)}
              className={`nav-link ${active === id ? 'is-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-sep" />
        <button onClick={() => onJump('collab')} className="nav-cta gradient-border">
          <span>DM / Collab</span>
          <Icon name="arrow-ur" size={13}/>
        </button>
      </div>
    </motion.div>
  );
}

window.TXCHY_NAV = { LoadingScreen, Navbar };
