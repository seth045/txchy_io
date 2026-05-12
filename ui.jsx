/* global React, ReactDOM, framerMotion, gsap, ScrollTrigger, lucide */
const { useState, useEffect, useRef, useMemo, useLayoutEffect, Fragment } = React;
const { motion, AnimatePresence, useScroll, useTransform } = framerMotion;

if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

/* ======================================================================
   Tiny icon set — original line icons (no third-party brand marks)
====================================================================== */
const Icon = ({ name, size = 16, stroke = 1.6 }) => {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'arrow-ur': return <svg {...common}><path d="M7 17 17 7M9 7h8v8" /></svg>;
    case 'arrow-r':  return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case 'arrow-d':  return <svg {...common}><path d="M12 5v14M5 13l7 7 7-7" /></svg>;
    case 'play':     return <svg {...common}><path d="M6 4l14 8L6 20z" fill="currentColor" stroke="none"/></svg>;
    case 'plus':     return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'close':    return <svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'download': return <svg {...common}><path d="M12 4v12m-5-5 5 5 5-5M5 20h14"/></svg>;
    case 'monitor':  return <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
    case 'sparkle':  return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4"/></svg>;
    case 'dot':      return <svg {...common}><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>;
    case 'frame':    return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>;
    case 'grid':     return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case 'wave':     return <svg {...common}><path d="M3 12c3-6 6 6 9 0s6-6 9 0"/></svg>;
    case 'mail':     return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>;
    case 'instagram-like': return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>;
    default: return null;
  }
};

/* ======================================================================
   Section header
====================================================================== */
const SectionHeader = ({ eyebrow, heading, italicWord, sub, cta, align = 'left' }) => {
  // heading may include {ITAL} marker for italic word
  const parts = heading.split('{ITAL}');
  return (
    <div className={`section-head ${align}`}>
      <div className="head-top">
        <div className="head-row">
          <div className="head-eyebrow">
            <span className="hairline" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          {cta && (
            <a href={cta.href || '#'} className="head-cta gradient-border">
              <span>{cta.label}</span>
              <Icon name="arrow-ur" size={14}/>
            </a>
          )}
        </div>
        <h2 className="head-title">
          {parts[0]}
          <span className="font-display">{italicWord}</span>
          {parts[1]}
        </h2>
        {sub && <p className="head-sub">{sub}</p>}
      </div>
    </div>
  );
};

/* ======================================================================
   Gradient button
====================================================================== */
const GradientButton = ({ children, kind = 'solid', icon = 'arrow-ur', onClick, href }) => {
  const inner = (
    <span className="btn-inner">
      <span>{children}</span>
      {icon && <Icon name={icon} size={14}/>}
    </span>
  );
  const cls = `btn ${kind === 'solid' ? 'btn-solid' : 'btn-outline'}`;
  if (href) return <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
};

window.TXCHY_UI = { Icon, SectionHeader, GradientButton, motion, AnimatePresence };
