/* global React, ReactDOM, framerMotion */
const { useState, useEffect, useRef } = React;
const { AnimatePresence } = framerMotion;
const { LoadingScreen, Navbar } = window.TXCHY_NAV;
const { Hero, BentoGallery, WallpaperVault } = window.TXCHY_S1;
const { SetupShowcase, Explorations, Stats, Collab, Footer } = window.TXCHY_S2;

function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('home');

  // lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  // smooth jump
  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // active section observer
  useEffect(() => {
    if (loading) return;
    const ids = ['home', 'gallery', 'setups', 'wallpapers', 'collab'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar active={active} onJump={jump} />
          <main>
            <Hero />
            <BentoGallery />
            <WallpaperVault />
            <SetupShowcase />
            <Explorations />
            <Stats />
            <Collab />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
