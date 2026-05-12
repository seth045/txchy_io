/* global React, framerMotion, gsap, ScrollTrigger */
const { useState, useEffect, useRef, useMemo } = React;
const { motion, AnimatePresence } = framerMotion;
const { Icon, SectionHeader, GradientButton } = window.TXCHY_UI;

const VIDEO_SRC = window.__resources?.galleryVideo || 'assets/txchy-gallery.mp4';

/* ----------------------------------------------------------------
   Reusable: placeholder neon artwork (CSS only)
---------------------------------------------------------------- */
const NeonArt = ({ variant = 0, label }) => {
  const variants = [
    { bg: 'radial-gradient(60% 60% at 30% 20%, #EC4899 0%, transparent 60%), radial-gradient(50% 50% at 80% 80%, #7DD3FC 0%, transparent 60%), radial-gradient(70% 70% at 50% 50%, #8B5CF6 0%, transparent 70%), #0a0a12' },
    { bg: 'radial-gradient(80% 50% at 50% 100%, #7DD3FC 0%, transparent 60%), linear-gradient(180deg, #0a0a18 0%, #1a0b2a 100%)' },
    { bg: 'conic-gradient(from 210deg at 50% 50%, #EC4899, #8B5CF6, #7DD3FC, #EC4899)' },
    { bg: 'radial-gradient(50% 60% at 50% 50%, #4E85BF 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 8px), #07070a' },
    { bg: 'linear-gradient(135deg, #ff7ac6 0%, #8B5CF6 40%, #1a1230 100%)' },
    { bg: 'radial-gradient(40% 60% at 70% 30%, #7DD3FC 0%, transparent 60%), radial-gradient(40% 50% at 30% 80%, #EC4899 0%, transparent 60%), #08080d' },
    { bg: 'linear-gradient(180deg, #0b0b14 0%, #1a0b2e 60%, #4E85BF 100%)' },
    { bg: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 70%), conic-gradient(from 90deg, #1a0b2e, #4E85BF, #EC4899, #1a0b2e)' },
  ];
  const v = variants[variant % variants.length];
  return (
    <div className="neon-art" style={{ background: v.bg }}>
      <div className="halftone" style={{ position: 'absolute', inset: 0 }} />
      <div className="neon-art-grid" />
      {label && <span className="mono neon-art-label">{label}</span>}
    </div>
  );
};

/* ======================================================================
   HERO
====================================================================== */
function Hero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [role, setRole] = useState(0);
  const roles = ['cinematic', 'anime', 'gaming', 'minimal', 'neon'];

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % roles.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!window.gsap) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.9, delay: 0.15 })
        .from('.hero-title .word', { opacity: 0, y: 60, filter: 'blur(12px)', stagger: 0.08, duration: 1.1 }, '-=0.5')
        .from('.hero-role-line', { opacity: 0, y: 14, duration: 0.7 }, '-=0.5')
        .from('.hero-desc', { opacity: 0, y: 14, duration: 0.7 }, '-=0.45')
        .from('.hero-buttons > *', { opacity: 0, y: 18, stagger: 0.08, duration: 0.7 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.7 }, '-=0.2')
        .from('.hero-corner', { opacity: 0, y: 12, stagger: 0.08, duration: 0.6 }, '-=0.6');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero" data-screen-label="01 Hero">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          autoPlay muted loop playsInline preload="metadata"
        />
        <div className="hero-video-fallback" />
        <div className="hero-overlay" />
        <div className="hero-vignette" />
        <div className="hero-bottom-fade" />
      </div>

      {/* corner HUD */}
      <div className="hero-corner hero-corner-tl mono small muted">
        <div>LIVE · CORRIDOR_07</div>
        <div>BLR · 04</div>
      </div>
      <div className="hero-corner hero-corner-tr mono small muted">
        <div>[ EXHIBIT ]</div>
        <div>WALLPAPER · VAULT</div>
      </div>
      <div className="hero-corner hero-corner-bl mono small muted">
        <div>↳ INDEX · 001 / 190</div>
      </div>
      <div className="hero-corner hero-corner-br mono small muted">
        <div>NEON · BLU / VIO / PNK</div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow eyebrow">
          <span className="bullet">·</span> DIGITAL SETUPS
          <span className="bullet">·</span> WALLPAPER CULTURE
          <span className="bullet">·</span> 2026
        </div>

        <h1 className="hero-title">
          <span className="word">Curated</span>{' '}
          <span className="word">setups</span>{' '}
          <span className="word">for</span>{' '}
          <span className="word">the</span><br />
          <span className="word font-display">screen-obsessed.</span>
        </h1>

        <div className="hero-role-line">
          A vault for{' '}
          <span className="hero-role-word">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[role]}
                className="font-display"
                initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0)' }}
                exit={{ y: -16, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45 }}
              >
                {roles[role]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          desktops.
        </div>

        <p className="hero-desc">
          Explore wallpapers, glass dashboards, anime-inspired layouts, and tech setups
          curated for people who treat their screens like art.
        </p>

        <div className="hero-buttons">
          <GradientButton kind="solid" icon="arrow-r" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore gallery
          </GradientButton>
          <GradientButton kind="outline" icon="download" onClick={() => document.getElementById('wallpapers')?.scrollIntoView({ behavior: 'smooth' })}>
            Get wallpapers
          </GradientButton>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="eyebrow">SCROLL</span>
        <div className="hero-scroll-line">
          <span className="hero-scroll-fill animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   BENTO GALLERY
====================================================================== */
function BentoGallery() {
  const cards = [
    { title: 'Chrome Glass Dashboard', tag: 'Dashboard · 4K', span: 7, v: 0 },
    { title: 'Pixel Wallpaper Pack',   tag: '8 wallpapers',  span: 5, v: 1 },
    { title: 'Anime Battle Station',   tag: 'Series · A1',   span: 5, v: 2 },
    { title: 'Neon Gradient Vault',    tag: 'Pack · 12',     span: 7, v: 3 },
    { title: 'Minimal Desk Flow',      tag: 'Editorial',     span: 7, v: 4 },
    { title: 'Gaming Focus Mode',      tag: 'RGB sync',      span: 5, v: 5 },
  ];

  return (
    <section id="gallery" className="section" data-screen-label="02 Gallery">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Drops"
          heading="Featured visual {ITAL}"
          italicWord="systems"
          sub="A rotating collection of wallpapers, dashboards, and setup references from the vault."
          cta={{ label: 'View all drops', href: '#wallpapers' }}
        />
        <div className="bento">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`bento-card span-${c.span}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className="bento-glow accent-gradient animate-gradient" />
              <div className="bento-art">
                <NeonArt variant={c.v} label={c.tag} />
                <div className="bento-overlay" />
              </div>
              <div className="bento-meta">
                <div className="bento-tag mono">{String(i + 1).padStart(2, '0')} · {c.tag}</div>
                <div className="bento-title">
                  <span>{c.title}</span>
                  <Icon name="arrow-ur" size={18}/>
                </div>
              </div>
              <div className="bento-hover-pill glass">
                View drop — <span className="font-display">{c.title}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   WALLPAPER VAULT
====================================================================== */
function WallpaperVault() {
  const [filter, setFilter] = useState('All');
  const all = [
    { name: 'Hyperion 01', cat: 'Anime',    res: '4K · Ultrawide',  free: false, v: 2 },
    { name: 'Kage Drift',  cat: 'Anime',    res: '4K · Mobile',     free: true,  v: 4 },
    { name: 'Glasshouse',  cat: 'Chrome',   res: '4K · Ultrawide',  free: false, v: 0 },
    { name: 'Mira Field',  cat: 'Gradient', res: 'Mobile · Tablet', free: true,  v: 5 },
    { name: 'Nullbeam',    cat: 'Minimal',  res: '4K',              free: true,  v: 6 },
    { name: 'Voltgate',    cat: 'Gaming',   res: '4K · RGB Sync',   free: false, v: 7 },
    { name: 'Pinewave',    cat: 'Minimal',  res: 'Mobile',          free: true,  v: 1 },
    { name: 'Cyber Bloom', cat: 'Gradient', res: 'Ultrawide',       free: false, v: 3 },
  ];
  const cats = ['All', 'Anime', 'Gaming', 'Minimal', 'Gradient', 'Chrome'];
  const items = filter === 'All' ? all : all.filter((w) => w.cat === filter);

  return (
    <section id="wallpapers" className="section" data-screen-label="03 Wallpapers">
      <div className="container">
        <SectionHeader
          eyebrow="Wallpaper Vault"
          heading="Built for lock screens & {ITAL}"
          italicWord="ultrawides"
          sub="A growing library tuned for OLEDs, gaming rigs, and clean desktops."
          cta={{ label: 'Unlock full pack', href: '#collab' }}
        />

        <div className="vault-filters">
          <div className="vault-filter-row">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`vault-pill ${filter === c ? 'is-active' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mono small muted vault-count">{String(items.length).padStart(2,'0')} items · curated</div>
        </div>

        <motion.div className="vault-grid" layout>
          <AnimatePresence>
            {items.map((w, i) => (
              <motion.a
                key={w.name}
                layout
                href="#"
                onClick={(e) => e.preventDefault()}
                className="vault-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.04, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="vault-art">
                  <NeonArt variant={w.v} />
                  <div className="vault-art-glass" />
                  <div className="vault-art-meta">
                    <span className="vault-chip mono">{w.cat}</span>
                    <span className={`vault-chip mono ${w.free ? 'free' : 'premium'}`}>{w.free ? 'Free' : 'Premium'}</span>
                  </div>
                </div>
                <div className="vault-info">
                  <div className="vault-name">{w.name}</div>
                  <div className="mono small muted">{w.res}</div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

window.TXCHY_S1 = { Hero, BentoGallery, WallpaperVault, NeonArt };
