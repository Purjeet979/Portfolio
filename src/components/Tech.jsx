import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants/technologies";

const TechBall = ({ name, icon }) => {
  return (
    <div className="tech-ball-container flex flex-col items-center justify-center">
      {/* Floating sphere */}
      <div className="tech-sphere-wrap">
        <div className="tech-sphere">
          <img
            src={icon}
            alt={name}
            loading="lazy"
            width={48}
            height={48}
            className="tech-icon"
          />
        </div>
      </div>
      {/* Dynamic shadow that scales as the sphere floats */}
      <div className="tech-shadow" />
      <span className="text-secondary text-[12px] font-semibold mt-2 opacity-80 select-none">
        {name}
      </span>
    </div>
  );
};

const Tech = () => {
  return (
    <div className="tech-section-container relative py-10">
      {/* Lightweight Glowing Golden Dragon Vector Lines */}
      <div className="tech-dragon-bg">
        <svg
          viewBox="0 0 1000 300"
          className="tech-dragon-svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 140, 0, 0)" />
              <stop offset="25%" stopColor="rgba(255, 180, 0, 0.4)" />
              <stop offset="50%" stopColor="rgba(255, 215, 0, 0.75)" />
              <stop offset="75%" stopColor="rgba(255, 180, 0, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 140, 0, 0)" />
            </linearGradient>
            <filter id="gold-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main winding dragon curve */}
          <path
            d="M 50,160 Q 180,40 320,160 T 600,160 T 950,110"
            stroke="url(#gold-grad)"
            strokeWidth="3.5"
            fill="none"
            filter="url(#gold-glow)"
          />
          
          {/* Undercurrent accent curve */}
          <path
            d="M 80,180 Q 230,80 380,180 T 700,130 T 920,170"
            stroke="url(#gold-grad)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />

          {/* Upper accent curve */}
          <path
            d="M 60,110 Q 210,220 360,110 T 660,190 T 940,140"
            stroke="url(#gold-grad)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />

          {/* Floating dragon ball energy particles */}
          <circle cx="320" cy="160" r="4.5" fill="#ffd700" filter="url(#gold-glow)" />
          <circle cx="460" cy="120" r="3.5" fill="#ff9900" filter="url(#gold-glow)" />
          <circle cx="600" cy="160" r="5" fill="#ffd700" filter="url(#gold-glow)" />
          <circle cx="740" cy="115" r="4" fill="#ff7700" filter="url(#gold-glow)" />
        </svg>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-10 max-w-5xl mx-auto relative z-10">
        {technologies.map((tech) => (
          <TechBall key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </div>

      <style>{`
        .tech-section-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .tech-dragon-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 900px;
          height: 250px;
          opacity: 0.85;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }

        .tech-dragon-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Dragon Flow Animations (Dashed offsets) ── */
        .tech-dragon-svg path {
          will-change: stroke-dashoffset;
        }

        /* Main winding line flows forward */
        .tech-dragon-svg path:nth-of-type(1) {
          stroke-dasharray: 200 150;
          animation: tech-flow-main 15s linear infinite;
        }

        /* Secondary line flows backward */
        .tech-dragon-svg path:nth-of-type(2) {
          stroke-dasharray: 100 180;
          animation: tech-flow-sub 22s linear infinite reverse;
        }

        /* Accent line flows forward with different dash sizing */
        .tech-dragon-svg path:nth-of-type(3) {
          stroke-dasharray: 80 200;
          animation: tech-flow-accent 18s linear infinite;
        }

        @keyframes tech-flow-main {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes tech-flow-sub {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 1000; }
        }

        @keyframes tech-flow-accent {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: 0; }
        }

        /* ── Energy Particles Pulsing ── */
        .tech-dragon-svg circle {
          transform-box: fill-box;
          transform-origin: center;
          animation: particle-pulse 3s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        .tech-dragon-svg circle:nth-of-type(even) {
          animation-duration: 4.5s;
          animation-delay: 0.8s;
        }

        @keyframes particle-pulse {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .tech-ball-container {
          position: relative;
          width: 110px;
          height: 140px;
        }

        /* ── Floating Animation ── */
        .tech-sphere-wrap {
          animation: sphere-float 4s ease-in-out infinite alternate;
          will-change: transform;
        }

        /* 3D Sphere styling using radial gradients */
        .tech-sphere {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ffffff 0%, #e2d9c8 50%, #9a907e 100%);
          box-shadow: 
            inset -8px -8px 20px rgba(0,0,0,0.4),
            inset 8px 8px 20px rgba(255,255,255,0.6),
            0 10px 20px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Gold/Orange Hover Glow (Dragon Ball Theme) */
        .tech-sphere:hover {
          transform: scale(1.1) rotate(8deg);
          box-shadow: 
            inset -8px -8px 20px rgba(0,0,0,0.4),
            inset 8px 8px 20px rgba(255,255,255,0.6),
            0 15px 30px rgba(255, 180, 0, 0.75),
            0 0 15px rgba(255, 140, 0, 0.45);
        }

        .tech-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.25));
          user-select: none;
        }

        /* ── Dynamic Shadow under the sphere ── */
        .tech-shadow {
          width: 50px;
          height: 8px;
          background: rgba(0,0,0,0.45);
          border-radius: 50%;
          filter: blur(4px);
          margin-top: 12px;
          animation: shadow-scale 4s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        /* Float sphere up and down */
        @keyframes sphere-float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-16px);
          }
        }

        /* Shadow shrinks/fades when sphere is high, expands when sphere is low */
        @keyframes shadow-scale {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.65);
            opacity: 0.45;
          }
        }
        /* ── Reduced motion ─────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .tech-dragon-svg path {
            animation: none !important;
          }
          .tech-dragon-svg circle {
            animation: none !important;
          }
          .tech-sphere-wrap {
            animation: none !important;
          }
          .tech-shadow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Tech, "");
