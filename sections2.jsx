/* global React, framerMotion, gsap, ScrollTrigger */
const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = framerMotion;
const { Icon, SectionHeader, GradientButton } = window.TXCHY_UI;
const { NeonArt } = window.TXCHY_S1;

const VIDEO_SRC = 'assets/txchy-gallery.mp4';

/* ======================================================================
   SETUP SHOWCASE — horizontal editorial cards w/ parallax
====================================================================== */
function SetupShowcase() {
  const rootRef = useRef(null);
  const setups = [
    {
      title: 'Clean creator desk',
      sub: 'Editorial whites · OLED · single light source.',
      tags: ['OLED', 'Glass pad', 'Ambient'],
      v: 4,
    },
    {
      title: 'RGB gaming corner',
      sub: 'High-saturation, sync-driven, late-night battle pit.',
      tags: ['RGB sync', 'Ultrawide', '240Hz'],
      v: 2,
    },
    {
      title: 'Dark productivity station',
      sub: 'Matte ceramics, deep blacks, zero distraction.',
      tags: ['Matte', 'Wallpaper sync', 'Focus'],
      v: 6,
    },
  ];

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.setup-card').forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -40 : -80),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="setups" ref={rootRef} className="section" data-screen-label="04 Setups">
      <div className="container">
        <SectionHeader
          eyebrow="Desk Energy"
          heading="Setup energy, {ITAL}"
          italicWord="systemized."
          sub="Three modes of operating — pick your aesthetic, copy the recipe."
        />
        <div className="setup-grid">
          {setups.map((s, i) => (
            <motion.div
              key={s.title}
              className="setup-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.9 }}
            >
              <div className="setup-monitor">
                <div className="setup-monitor-bezel">
                  <div className="setup-monitor-screen">
                    <NeonArt variant={s.v} />
                    <div className="setup-monitor-scan" />
                  </div>
                </div>
                <div className="setup-monitor-stand" />
                <div className="setup-monitor-base" />
                <div className="setup-monitor-glow" />
                {s.tags.map((t, ti) => (
                  <span
                    key={t}
                    className="setup-spec glass mono small"
                    style={{
                      top: `${10 + ti * 22}%`,
                      [ti % 2 === 0 ? 'right' : 'left']: '-8%',
                    }}
                  >
                    <span className="setup-spec-dot" /> {t}
                  </span>
                ))}
              </div>
              <div className="setup-info">
                <div className="mono small muted">0{i + 1} · MODE</div>
                <h3 className="setup-title">{s.title}</h3>
                <p className="setup-sub">{s.sub}</p>
                <button className="setup-link">
                  View build <Icon name="arrow-ur" size={14}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   EXPLORATIONS — pinned text + two parallax columns
====================================================================== */
function Explorations() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  const left = [
    { title: 'Corridor 07', v: 2 },
    { title: 'Glasshouse Drift', v: 0 },
    { title: 'Pixel Bloom', v: 4 },
  ];
  const right = [
    { title: 'Voltgate Mono', v: 5 },
    { title: 'Hyperion Field', v: 3 },
    { title: 'Mira Halo', v: 7 },
  ];

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        pinSpacing: false,
      });
      gsap.to(leftRef.current, {
        y: -260,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to(rightRef.current, {
        y: -480,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.utils.toArray('.expl-card').forEach((el, i) => {
        gsap.to(el, {
          rotation: i % 2 === 0 ? -3 : 4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="expl" data-screen-label="05 Explorations">
      <div ref={pinRef} className="expl-pin">
        <div className="expl-pin-inner">
          <span className="eyebrow">Explorations</span>
          <h2 className="expl-title">
            A visual <span className="font-display">playground</span><br/>
            for your setup.
          </h2>
          <p className="expl-sub">
            Experimental wallpapers, color systems, and interface-inspired compositions —
            drift through the gallery as you scroll.
          </p>
          <div className="expl-cta">
            <GradientButton kind="outline" icon="arrow-ur">Open archive</GradientButton>
          </div>
        </div>
      </div>

      <div className="expl-cols">
        <div ref={leftRef} className="expl-col expl-col-l">
          {left.map((c, i) => (
            <div key={c.title} className="expl-card" onClick={() => setLightbox(c)}>
              <NeonArt variant={c.v} />
              <div className="expl-card-meta glass mono small">{c.title}</div>
            </div>
          ))}
        </div>
        <div ref={rightRef} className="expl-col expl-col-r">
          {right.map((c, i) => (
            <div key={c.title} className="expl-card" onClick={() => setLightbox(c)}>
              <NeonArt variant={c.v} />
              <div className="expl-card-meta glass mono small">{c.title}</div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <NeonArt variant={lightbox.v}/>
              <div className="lightbox-meta">
                <div>
                  <div className="eyebrow">Exhibit</div>
                  <div className="lightbox-title font-display">{lightbox.title}</div>
                </div>
                <button className="lightbox-close" onClick={() => setLightbox(null)}>
                  <Icon name="close" size={18}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ======================================================================
   STATS
====================================================================== */
function CountUp({ to, suffix = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf, started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const dur = 1600;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.floor(eased * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      });
    });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="tab-num">{v.toLocaleString()}{suffix}</span>;
}

function Stats() {
  return (
    <section className="section stats-section" data-screen-label="06 Stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num font-display"><CountUp to={100} suffix="K+" /></div>
            <div className="stat-label">Community reach</div>
          </div>
          <div className="stat">
            <div className="stat-num font-display"><CountUp to={190} suffix="+" /></div>
            <div className="stat-label">Posts &amp; drops</div>
          </div>
          <div className="stat">
            <div className="stat-num font-display"><CountUp to={4} suffix="K" /></div>
            <div className="stat-label">Wallpaper-ready visuals</div>
          </div>
          <div className="stat">
            <div className="stat-num font-display">∞</div>
            <div className="stat-label">Setup inspiration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   COLLAB
====================================================================== */
function Collab() {
  const items = [
    { title: 'Sponsored reel', sub: 'Cinematic 30s placement woven into a setup story.', tag: 'Reel · 1×' },
    { title: 'Wallpaper pack', sub: 'Co-branded pack — gradient, gaming, anime tracks.', tag: 'Pack · 8 files' },
    { title: 'Setup feature',  sub: 'Full feature on your product inside a curated build.', tag: 'Feature · 1×' },
    { title: 'Product integration', sub: 'Long-form integration across drops + stories.', tag: 'Integration · series' },
  ];
  return (
    <section id="collab" className="section collab-section" data-screen-label="07 Collab">
      <div className="container">
        <SectionHeader
          eyebrow="Partnerships"
          heading="Collab with {ITAL}"
          italicWord="the vault."
          sub="For brands in gaming gear, desk accessories, wallpapers, creator tools, glass pads, keyboards, monitors, and digital products."
        />
        <div className="collab-grid">
          {items.map((c, i) => (
            <motion.div
              key={c.title}
              className="collab-card glass gradient-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <div className="collab-card-top">
                <span className="mono small muted">0{i + 1}</span>
                <span className="mono small collab-tag">{c.tag}</span>
              </div>
              <h3 className="collab-card-title">{c.title}</h3>
              <p className="collab-card-sub">{c.sub}</p>
              <div className="collab-card-foot">
                <span className="eyebrow">Request</span>
                <Icon name="arrow-ur" size={16}/>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="collab-cta glass">
          <div>
            <div className="eyebrow">Open for collabs · 2026</div>
            <div className="collab-cta-title">
              Start a <span className="font-display">collab</span> in two lines.
            </div>
            <p className="collab-cta-sub">
              Drop a one-liner about your product and which lane (reel, pack, feature, integration).
              We'll send a short proposal back within 48h.
            </p>
          </div>
          <div className="collab-cta-actions">
            <GradientButton href="mailto:hello@vault.studio" kind="solid" icon="mail">
              Start a collab
            </GradientButton>
            <div className="collab-cta-or">
              <span className="mono small muted">— or DM —</span>
              <a className="collab-handle" href="#">
                @vault.curator <Icon name="arrow-ur" size={14}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   FOOTER — flipped video, marquee, contact
====================================================================== */
function Footer() {
  const marqueeRef = useRef(null);
  useEffect(() => {
    if (!window.gsap) return;
    const items = marqueeRef.current?.querySelectorAll('.mq-track');
    if (!items) return;
    const tween = gsap.to(items, {
      xPercent: -100,
      duration: 32,
      ease: 'none',
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  const marqueeWords = ['Setups', 'Wallpapers', 'Gaming', 'Anime', 'Tech'];

  return (
    <footer className="footer" data-screen-label="08 Footer">
      <div className="footer-video-wrap">
        <video
          className="footer-video"
          src={VIDEO_SRC}
          autoPlay muted loop playsInline preload="metadata"
        />
        <div className="footer-video-overlay" />
        <div className="footer-video-fallback" />
      </div>

      <div className="footer-marquee" ref={marqueeRef}>
        {[0, 1].map((k) => (
          <div className="mq-track" key={k}>
            {Array.from({ length: 6 }).flatMap((_, i) =>
              marqueeWords.map((w) => (
                <span key={`${k}-${i}-${w}`} className="mq-item font-display">
                  {w}<span className="mq-dot">•</span>
                </span>
              ))
            )}
          </div>
        ))}
      </div>

      <div className="footer-center">
        <span className="eyebrow">2026 · OPEN STUDIO</span>
        <h2 className="footer-cta">
          Build your next <span className="font-display">screen aesthetic.</span>
        </h2>
        <div className="footer-buttons">
          <GradientButton kind="solid" icon="arrow-ur" href="#">
            Follow the vault
          </GradientButton>
          <GradientButton kind="outline" icon="mail" href="mailto:hello@vault.studio">
            Collab via email
          </GradientButton>
        </div>
        <div className="footer-status">
          <span className="status-dot pulse-dot" />
          <span className="eyebrow">Open for collabs · responds within 48h</span>
        </div>
      </div>

      <div className="footer-bar">
        <div className="footer-bar-l">
          <span className="font-display footer-brand">TXCHY</span>
          <span className="mono small muted">— Digital gallery, since 2022</span>
        </div>
        <div className="footer-bar-c mono small muted">
          <a href="#">Profile</a>
          <a href="#wallpapers">Wallpapers</a>
          <a href="#collab">Collab</a>
          <a href="#">Credits</a>
        </div>
        <div className="footer-bar-r mono small muted">
          © 2026 · All visuals original
        </div>
      </div>
    </footer>
  );
}

window.TXCHY_S2 = { SetupShowcase, Explorations, Stats, Collab, Footer };
