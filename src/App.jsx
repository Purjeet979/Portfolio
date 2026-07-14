import React, { Suspense, lazy, useEffect, useRef } from 'react';
import About from './components/About';
import Hero from './components/Hero';
import LazyMount from './components/LazyMount';
import Navbar from './components/Navbar';

const Certificates = lazy(() => import('./components/Certificates'));
const Tech = lazy(() => import('./components/Tech'));
const Works = lazy(() => import('./components/Works'));
const Contact = lazy(() => import('./components/Contact'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const useDesktopEffects = () => {
  const [enabled, setEnabled] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mediaQuery.matches && !motionQuery.matches);

    mediaQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
};

const CustomCursor = () => {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const frameRef = useRef(0);
  const pointRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      pointRef.current = { x: e.clientX, y: e.clientY };

      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        const { x, y } = pointRef.current;

        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
        }

        frameRef.current = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="mouse-glow" />
      <div ref={dotRef} className="mouse-dot" />
      
      <style>{`
        .mouse-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(-1000px, -1000px, 0);
          will-change: transform;
          mix-blend-mode: screen;
        }

        .mouse-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
          pointer-events: none;
          z-index: 10000;
          transform: translate3d(-1000px, -1000px, 0);
          will-change: transform;
        }

        /* Hide on mobile screens to prevent touch issues */
        @media (max-width: 768px) {
          .mouse-glow, .mouse-dot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

const App = () => {
  const showDesktopEffects = useDesktopEffects();

  return (
    <div className="relative z-0 bg-primary">
      <CustomCursor />

      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Suspense fallback={null}>
        <LazyMount id="work" minHeight={760}>
          <Certificates />
        </LazyMount>
        <LazyMount minHeight={360}>
          <Tech />
        </LazyMount>
        <LazyMount minHeight={760}>
          <Works />
        </LazyMount>
        <LazyMount id="contact" minHeight={620}>
          <div className="relative z-0">
            <Contact />
            {showDesktopEffects ? <StarsCanvas /> : null}
          </div>
        </LazyMount>
      </Suspense>
    </div>
  );
};

export default App;
