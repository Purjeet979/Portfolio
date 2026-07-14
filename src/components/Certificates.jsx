import React, { useRef, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import gsap from "gsap";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants/experiences";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ROTATIONS = [10, -6, 3, -4, 8, -2, 5, -7, 2];

// Deterministic stars — keep count low for scroll perf
const STARS = Array.from({ length: 35 }, (_, i) => ({
  x: ((i * 137 + 19) % 97) + 1,
  y: ((i * 97  + 31) % 55) + 1,
  r: i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
  op: 0.35 + (i % 6) * 0.1,
  del: (i * 0.38) % 6,
  dur: 2 + (i * 0.29) % 3,
}));

// Deterministic firefly positions (appear only when expanded)
const FIREFLIES = Array.from({ length: 28 }, (_, i) => ({
  x:   ((i * 173 + 41) % 88) + 5,
  y:   ((i * 113 + 57) % 58) + 8,
  del: (i * 0.55) % 7,
  dur: 2.5 + (i * 0.42) % 3.5,
  driftDur: 6 + (i * 0.8) % 8,
  driftDel: (i * 0.6) % 5,
  col: i % 3 === 0 ? '#a8ff60' : i % 3 === 1 ? '#e8ff50' : '#60ffb0',
}));

// Pine tree helper — x,y = base centre
const PineTree = ({ x, y, scale = 1, col = "#05050f" }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <polygon points="0,-50 14,0 -14,0"   fill={col} />
    <polygon points="0,-66 11,-18 -11,-18" fill={col} />
    <polygon points="0,-78  8,-34  -8,-34" fill={col} />
    <rect x="-3" y="0" width="6" height="15" fill={col} />
  </g>
);

/* ── Animated galaxy-landscape background ─────────────────────── */
/* Uses CSS filter:grayscale transition — collapsed=B&W, expanded=color */
const CertBg = ({ isExpanded }) => (
  <div
    className={`cert-bg-root${isExpanded ? ' cert-ff-on' : ''}`}
    style={{
      filter: isExpanded
        ? "grayscale(0) brightness(1)"
        : "grayscale(1) brightness(0.72)",
      transition: "filter 1.6s ease",
    }}
  >
    {/* ── Sky gradient ───────────────────────────────────────── */}
    <div className="cert-sky" />

    {/* ── Nebula clouds ──────────────────────────────────────── */}
    <div className="cert-nebula cert-neb-pink"  />
    <div className="cert-nebula cert-neb-blue"  />
    <div className="cert-nebula cert-neb-teal"  />

    {/* ── Spiral galaxy ──────────────────────────────────────── */}
    <div className="cert-galaxy-wrap">
      <div className="cert-galaxy" />
    </div>

    {/* ── Moon (crescent, always present — looks cool in B&W too) */}
    <div className="cert-moon-wrap">
      <div className="cert-moon" />
      <div className="cert-moon-shadow" />
    </div>

    {/* ── Planets ────────────────────────────────────────────── */}
    <div className="cert-planet cert-planet-l" />
    <div className="cert-planet cert-planet-r" />

    {/* ── Fireflies (visible only when expanded) ──────────────────── */}
    {FIREFLIES.map((f, i) => (
      <div
        key={`ff-${i}`}
        className="cert-firefly"
        style={{
          left: `${f.x}%`,
          top:  `${f.y}%`,
          '--ff-col': f.col,
          animationDelay:     `${f.del}s`,
          animationDuration:  `${f.dur}s`,
          '--dd': `${f.driftDur}s`,
          '--ddel': `${f.driftDel}s`,
        }}
      />
    ))}

    {/* ── Twinkling stars ────────────────────────────────────────── */}
    {STARS.map((s, i) => (
      <div
        key={i}
        className="cert-star"
        style={{
          left: `${s.x}%`,
          top:  `${s.y}%`,
          width:  `${s.r * 2}px`,
          height: `${s.r * 2}px`,
          opacity: s.op,
          animationDelay:    `${s.del}s`,
          animationDuration: `${s.dur}s`,
        }}
      />
    ))}

    {/* ── Shooting star ──────────────────────────────────────── */}
    <div className="cert-shoot" />

    {/* ── Mountain + tree landscape (SVG) ────────────────────── */}
    <svg
      viewBox="0 0 800 220"
      className="cert-land"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Distant mountains */}
      <path
        d="M0,145 L45,100 L90,120 L140,75 L185,105 L235,62 L280,92 L330,48 L380,80 L430,42 L480,70 L530,48 L580,78 L630,56 L680,84 L730,64 L775,88 L800,102 L800,220 L0,220 Z"
        fill="#0d0d26"
        opacity="0.75"
      />
      {/* Foreground mountains */}
      <path
        d="M0,168 L55,122 L110,152 L170,108 L225,142 L285,112 L340,138 L395,100 L450,130 L508,110 L562,136 L618,116 L672,140 L728,120 L782,145 L800,158 L800,220 L0,220 Z"
        fill="#080818"
      />
      {/* Pine trees */}
      {[18,80,148,215,285,355,428,505,578,648,720,788].map((x, i) => {
        const bases = [163,168,160,165,162,167,161,166,163,169,165,162];
        return (
          <PineTree
            key={i}
            x={x}
            y={bases[i]}
            scale={0.72 + (i % 4) * 0.08}
            col="#040410"
          />
        );
      })}
    </svg>

    {/* ── Water / lake reflection ─────────────────────────────── */}
    <svg
      viewBox="0 0 800 100"
      className="cert-water"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="wMask">
          <rect width="800" height="100" fill="url(#wFade)" />
        </mask>
      </defs>
      {/* Flipped mountains */}
      <g mask="url(#wMask)" transform="scale(1,-1) translate(0,-100)">
        <path
          d="M0,68 L55,22 L110,52 L170,8 L225,42 L285,12 L340,38 L395,0 L450,30 L508,10 L562,36 L618,16 L672,40 L728,20 L782,45 L800,58 L800,120 L0,120 Z"
          fill="#090919"
          opacity="0.6"
        />
        {[18,148,285,428,578,720].map((x, i) => (
          <PineTree key={i} x={x} y={62} scale={0.55} col="#040410" />
        ))}
      </g>
      {/* Shimmer lines */}
      <line x1="0" y1="10" x2="800" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="55" x2="800" y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      {/* Galaxy/moon glow on water */}
      <ellipse cx="400" cy="8" rx="90" ry="12" fill="rgba(255,200,120,0.12)" />
    </svg>
  </div>
);

/* ── Timeline card ────────────────────────────────────────────── */
const CertCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "rgba(13,12,30,0.82)",
      color: "#fff",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(145,94,255,0.25)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    }}
    contentArrowStyle={{ borderRight: "7px solid rgba(145,94,255,0.3)" }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          width={38} height={38}
          loading="lazy"
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
        {experience.company_name}
      </p>
    </div>
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((pt, i) => (
        <li key={i} className="text-white-100 text-[14px] pl-1 tracking-wider">{pt}</li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

/* ── Main component ───────────────────────────────────────────── */
const Certificates = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const stackRef    = useRef(null);
  const timelineRef = useRef(null);
  const sectionRef  = useRef(null);

  const expand = () => {
    gsap.to(stackRef.current, {
      opacity: 0, y: -20, duration: 0.4, ease: "power2.in",
      onComplete: () => {
        setIsExpanded(true);
        requestAnimationFrame(() => {
          gsap.fromTo(timelineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
          );
        });
      },
    });
  };

  const collapse = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      gsap.to(timelineRef.current, {
        opacity: 0, y: 20, duration: 0.4, ease: "power2.in",
        onComplete: () => {
          setIsExpanded(false);
          requestAnimationFrame(() => {
            gsap.fromTo(stackRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
            );
          });
        },
      });
    }, 400);
  };

  return (
    <div ref={sectionRef} className="cert-section-root">
      {/* Galaxy landscape background — grayscale ↔ color */}
      <CertBg isExpanded={isExpanded} />

      <motion.div variants={textVariant()} style={{ position: "relative", zIndex: 2 }}>
        <p className={`${styles.sectionSubText} text-center`}>My accomplishments</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Certificates &amp; Achievements
        </h2>
      </motion.div>

      {/* ── STACKED view ─────────────────────────────────── */}
      {!isExpanded && (
        <div className="mt-16 flex flex-col items-center" style={{ position: "relative", zIndex: 2 }}>
          <div ref={stackRef} className="cert-collapsed-wrap">
            {/* ── Certificates stack ── */}
            <h3 className="cert-panel-label">🎓 Certificates</h3>
            <div className="cert-stack">
              {[...experiences].filter(e => e.type !== 'achievement').reverse().slice(0, 5).map((cert, idx) => {
                const angles = [8, -5, 3, -3, 6];
                return (
                  <div key={`csc-${idx}`} className="cert-stack-card" style={{ "--rot": `${angles[idx % angles.length]}deg` }}>
                    <div className="cert-si-wrap">
                      <img src={cert.icon} alt={cert.company_name} width={40} height={40} loading="lazy" className="cert-si-img" />
                    </div>
                    <p className="cert-s-title">{cert.title}</p>
                    <p className="cert-s-co">{cert.company_name}</p>
                    <p className="cert-s-date">{cert.date}</p>
                  </div>
                );
              })}
            </div>


            {/* ── Achievements auto-scroll marquee ── */}
            <h3 className="cert-panel-label" style={{ marginTop: 48 }}>🏆 Achievements</h3>
            <div className="ach-marquee">
              <div className="ach-track">
                {/* Render twice for seamless loop */}
                {[0, 1].map(copy => (
                  [...experiences].filter(e => e.type === 'achievement').reverse().map((cert, idx) => (
                    <div key={`ach-${copy}-${idx}`} className="ach-card">
                      <div className="cert-si-wrap cert-si-wrap--ach">
                        <img src={cert.icon} alt={cert.company_name} width={40} height={40} loading="lazy" className="cert-si-img" />
                      </div>
                      <p className="cert-s-title">{cert.title}</p>
                      <p className="cert-s-co">{cert.company_name}</p>
                      <p className="cert-s-date cert-s-date--ach">{cert.date}</p>
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
          <button id="cert-view-btn" className="cert-btn mt-10" onClick={expand}>
            View All
          </button>
        </div>
      )}

      {/* ── EXPANDED / timeline view ─────────────────────────── */}
      {isExpanded && (
        <div ref={timelineRef} className="mt-20 flex flex-col" style={{ position: "relative", zIndex: 2 }}>
          <VerticalTimeline>
            {experiences
              .filter(e => e.type !== "achievement")
              .sort((a, b) => {
                const parseDate = (str) => {
                  const parts = str.split("-");
                  const target = parts[parts.length - 1].trim();
                  const parsed = Date.parse(target);
                  if (!isNaN(parsed)) return parsed;
                  const yearMatch = str.match(/\d{4}/);
                  if (yearMatch) {
                    const yr = parseInt(yearMatch[0]);
                    if (str.toLowerCase().includes("jan")) return new Date(yr, 0, 31).getTime();
                    if (str.toLowerCase().includes("feb")) return new Date(yr, 1, 28).getTime();
                    if (str.toLowerCase().includes("mar")) return new Date(yr, 2, 31).getTime();
                    if (str.toLowerCase().includes("apr")) return new Date(yr, 3, 30).getTime();
                    if (str.toLowerCase().includes("may")) return new Date(yr, 4, 31).getTime();
                    if (str.toLowerCase().includes("jun")) return new Date(yr, 5, 30).getTime();
                    if (str.toLowerCase().includes("jul")) return new Date(yr, 6, 31).getTime();
                    if (str.toLowerCase().includes("aug")) return new Date(yr, 7, 31).getTime();
                    if (str.toLowerCase().includes("sep")) return new Date(yr, 8, 30).getTime();
                    if (str.toLowerCase().includes("oct")) return new Date(yr, 9, 31).getTime();
                    if (str.toLowerCase().includes("nov")) return new Date(yr, 10, 30).getTime();
                    if (str.toLowerCase().includes("dec")) return new Date(yr, 11, 31).getTime();
                    return new Date(yr, 11, 31).getTime();
                  }
                  return 0;
                };
                return parseDate(b.date) - parseDate(a.date);
              })
              .map((cert, i) => (
                <CertCard key={`ct-${i}`} experience={cert} />
              ))}
          </VerticalTimeline>
          <div className="flex justify-center mt-10">
            <button id="cert-stack-btn" className="cert-btn" onClick={collapse}>
              Stack 'em up
            </button>
          </div>
        </div>
      )}

      {/* ── All styles ─────────────────────────────────────────── */}
      <style>{`
        /* ── Section root ──────────────────────────────────── */
        .cert-section-root {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 640px;
        }

        /* ── Background root ───────────────────────────────── */
        .cert-bg-root {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          /* Isolate bg repaints from scroll — biggest scroll-perf win */
          contain: strict;
        }

        /* ── Sky ───────────────────────────────────────────── */
        .cert-sky {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 40% 18%, #0d1b5e 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 25%, #1a0a3e 0%, transparent 55%),
            linear-gradient(180deg, #02020f 0%, #040418 45%, #080820 70%, #0a0a10 100%);
        }

        /* ── Nebula clouds ─────────────────────────────────── */
        .cert-nebula {
          position: absolute;
          border-radius: 50%;
          /* No filter:blur — it repaints every scroll frame. Gradient feathering is enough. */
          animation: neb-drift 18s ease-in-out infinite alternate;
          will-change: transform;
        }
        .cert-neb-pink {
          width: 500px; height: 320px;
          top: 3%; left: 15%;
          background: radial-gradient(ellipse at center, rgba(255,60,180,0.18) 0%, rgba(255,60,180,0.05) 50%, transparent 75%);
          animation-duration: 20s;
        }
        .cert-neb-blue {
          width: 460px; height: 360px;
          top: 6%; right: 5%;
          background: radial-gradient(ellipse at center, rgba(40,100,255,0.20) 0%, rgba(40,100,255,0.05) 50%, transparent 75%);
          animation-duration: 15s; animation-delay: 3s;
        }
        .cert-neb-teal {
          width: 360px; height: 280px;
          top: 22%; left: 2%;
          background: radial-gradient(ellipse at center, rgba(0,220,200,0.12) 0%, rgba(0,220,200,0.03) 50%, transparent 75%);
          animation-duration: 22s; animation-delay: 7s;
        }
        @keyframes neb-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -20px) scale(1.12); }
        }

        /* ── Spiral galaxy ─────────────────────────────────── */
        .cert-galaxy-wrap {
          position: absolute;
          top: 4%; left: 50%;
          transform: translateX(-50%);
          width: 320px; height: 200px;
          animation: gal-spin 60s linear infinite;
          will-change: transform;
        }
        @keyframes gal-spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) rotate(360deg); }
        }
        .cert-galaxy {
          width: 100%; height: 100%;
          /* No filter:blur — use wider gradient stops for softness instead */
          background:
            radial-gradient(ellipse 10% 10% at 50% 50%, #fff8e0 0%, transparent 100%),
            radial-gradient(ellipse 28% 22% at 50% 50%, rgba(255,210,80,0.65) 0%, transparent 75%),
            radial-gradient(ellipse 55% 38% at 52% 48%, rgba(200,100,255,0.45) 0%, transparent 85%),
            radial-gradient(ellipse 75% 55% at 48% 53%, rgba(80,140,255,0.35) 0%, transparent 92%),
            radial-gradient(ellipse 95% 70% at 50% 50%, rgba(255,80,180,0.22) 0%, transparent 100%);
        }

        /* ── Moon ──────────────────────────────────────────── */
        .cert-moon-wrap {
          position: absolute;
          top: 8%; left: 18%;
        }
        .cert-moon {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #e8e0c8, #b0a888);
          box-shadow: 0 0 30px rgba(220,200,140,0.5), 0 0 60px rgba(220,200,140,0.2);
        }
        .cert-moon-shadow {
          position: absolute;
          top: -4px; left: 14px;
          width: 54px; height: 54px;
          border-radius: 50%;
          background: #02020e;
          /* makes a crescent */
        }

        /* ── Planets ───────────────────────────────────────── */
        .cert-planet {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
          animation: planet-bob 10s ease-in-out infinite alternate;
        }
        .cert-planet-l {
          width: 52px; height: 52px;
          top: 12%; left: 8%;
          background: radial-gradient(circle at 35% 30%, #6ea8ff, #1a3a8a 60%, #0a1e4e);
          box-shadow: 0 0 25px rgba(80,140,255,0.5), inset -8px -8px 20px rgba(0,0,0,0.5);
          animation-delay: 1s;
        }
        .cert-planet-r {
          width: 38px; height: 38px;
          top: 18%; right: 9%;
          background: radial-gradient(circle at 30% 28%, #c87a4a, #8b4020 55%, #4a1a08);
          box-shadow: 0 0 20px rgba(200,100,60,0.4), inset -6px -6px 15px rgba(0,0,0,0.5);
          animation-duration: 13s;
        }
        @keyframes planet-bob {
          from { transform: translateY(0); }
          to   { transform: translateY(-12px); }
        }

        /* ── Fireflies ──────────────────────────────────────── */
        .cert-firefly {
          position: absolute;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--ff-col, #b8ff60);
          opacity: 0;
          pointer-events: none;
          /* glow pulse */
          animation:
            ff-glow var(--dur, 2.5s) ease-in-out infinite alternate,
            ff-drift var(--dd, 7s) ease-in-out infinite alternate;
          animation-delay: var(--ddel, 0s);
          will-change: transform, opacity, box-shadow;
          transition: opacity 1.2s ease;
        }
        /* Fade in when section is expanded */
        .cert-ff-on .cert-firefly { opacity: 1; }

        @keyframes ff-glow {
          0%   { opacity: 0.05; box-shadow: 0 0 3px 1px var(--ff-col, #b8ff60); }
          50%  { opacity: 0.9;  box-shadow: 0 0 10px 4px var(--ff-col, #b8ff60), 0 0 22px 8px color-mix(in srgb, var(--ff-col, #b8ff60) 40%, transparent); }
          100% { opacity: 0.2;  box-shadow: 0 0 5px 2px var(--ff-col, #b8ff60); }
        }
        @keyframes ff-drift {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(18px, -24px); }
          50%  { transform: translate(-12px, -42px); }
          75%  { transform: translate(22px, -18px); }
          100% { transform: translate(-8px, -50px); }
        }

        /* ── Stars ─────────────────────────────────────────── */
        .cert-star {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          animation: star-twinkle ease-in-out infinite alternate;
          will-change: opacity;
        }
        @keyframes star-twinkle {
          from { opacity: var(--op, 0.5); transform: scale(1); }
          to   { opacity: 0.1;            transform: scale(0.5); }
        }

        /* ── Shooting star ─────────────────────────────────── */
        .cert-shoot {
          position: absolute;
          top: 22%; left: 55%;
          width: 120px; height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(255,255,220,0.9), transparent);
          transform: rotate(-32deg);
          animation: shoot 7s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes shoot {
          0%   { transform: rotate(-32deg) translateX(0);    opacity: 0; }
          5%   { opacity: 1; }
          30%  { transform: rotate(-32deg) translateX(280px); opacity: 0; }
          100% { transform: rotate(-32deg) translateX(280px); opacity: 0; }
        }

        /* ── Landscape SVG ─────────────────────────────────── */
        .cert-land {
          position: absolute;
          bottom: 12%;
          left: 0; width: 100%;
          height: 200px;
          display: block;
        }

        /* ── Water reflection ──────────────────────────────── */
        .cert-water {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 12%;
          min-height: 60px;
          display: block;
        }

        /* ── Collapsed wrapper ──────────────────────────────── */
        .cert-collapsed-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cert-panel-label {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #e0d8ff;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        /* ── Stacked cards ─────────────────────────────────── */
        .cert-stack {
          position: relative;
          width: 300px; height: 360px;
          flex-shrink: 0;
        }
        .cert-stack-card {
          position: absolute;
          inset: 0;
          background: rgba(10, 8, 28, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(145,94,255,0.35);
          border-radius: 18px;
          padding: 26px 22px;
          color: #fff;
          transform: rotate(var(--rot));
          box-shadow: 0 8px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,58,237,0.12);
          display: flex; flex-direction: column; gap: 10px;
          will-change: transform;
        }
        .cert-stack-card:last-child {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cert-stack-card:last-child:hover {
          transform: rotate(var(--rot)) translateY(-6px);
          box-shadow: 0 20px 52px rgba(124,58,237,0.5), 0 0 28px rgba(124,58,237,0.25);
        }

        /* ── Achievement marquee ───────────────────────────── */
        .ach-marquee {
          width: 100%;
          max-width: 90vw;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .ach-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: ach-scroll 35s linear infinite;
          padding: 8px 0 16px;
        }
        .ach-marquee:hover .ach-track {
          animation-play-state: paused;
        }
        @keyframes ach-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ach-card {
          flex: 0 0 240px;
          background: rgba(10, 8, 28, 0.80);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,180,40,0.35);
          border-radius: 18px;
          padding: 24px 20px;
          color: #fff;
          display: flex; flex-direction: column; gap: 10px;
          box-shadow: 0 6px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,180,40,0.12);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ach-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 44px rgba(255,180,40,0.4), 0 0 20px rgba(255,180,40,0.15);
        }

        /* ── Achievement accents ── */
        .cert-si-wrap--ach {
          border-color: rgba(255,180,40,0.30);
          background: rgba(40,30,10,0.9);
        }
        .cert-s-date--ach {
          color: rgba(255,180,40,0.85);
        }

        .cert-si-wrap {
          width: 52px; height: 52px;
          border-radius: 12px;
          background: rgba(20,16,40,0.9);
          border: 1px solid rgba(124,58,237,0.25);
          display: flex; align-items: center; justify-content: center;
          padding: 8px; flex-shrink: 0;
        }
        .cert-si-img { width: 100%; height: 100%; object-fit: contain; }
        .cert-s-title { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.3; }
        .cert-s-co    { font-size: 12px; color: #aaa6c3; font-weight: 500; }
        .cert-s-date  { font-size: 11px; color: rgba(124,58,237,0.8); }

        /* ── Toggle button ─────────────────────────────────── */
        .cert-btn {
          background: linear-gradient(90deg, #7c3aed, #4f46e5);
          color: #fff; border: none;
          border-radius: 999px; padding: 13px 42px;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.07em; cursor: pointer;
          box-shadow: 0 4px 24px rgba(124,58,237,0.45), 0 0 0 1px rgba(124,58,237,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          will-change: transform;
        }
        .cert-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(124,58,237,0.7);
        }
        .cert-btn:active { transform: translateY(0); }

        /* ── Mobile ───────────────────────────────────── */
        @media (max-width: 700px) {
          .ach-card { flex: 0 0 200px; padding: 18px 16px; }
        }

        /* ── Reduced motion ─────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .cert-nebula,
          .cert-galaxy-wrap,
          .cert-planet,
          .cert-firefly,
          .cert-star,
          .cert-shoot,
          .ach-track {
            animation: none !important;
          }
          .cert-galaxy-wrap { transform: translateX(-50%) rotate(0deg) !important; }
          .cert-firefly { opacity: 0 !important; }
          .cert-shoot { opacity: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Certificates, "");
