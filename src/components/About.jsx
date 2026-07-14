import { motion } from 'framer-motion';
import React from 'react';
import { Tilt } from 'react-tilt';
import { services } from '../constants/services';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const glowConfig = {
  "C": {
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.04)",
    border: "rgba(59, 130, 246, 0.3)",
    glow: "rgba(59, 130, 246, 0.35)",
  },
  "Python": {
    color: "#eab308",
    bg: "rgba(234, 179, 8, 0.04)",
    border: "rgba(234, 179, 8, 0.3)",
    glow: "rgba(234, 179, 8, 0.35)",
  },
  "Java": {
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.04)",
    border: "rgba(239, 68, 68, 0.3)",
    glow: "rgba(239, 68, 68, 0.35)",
  },
  "MySQL": {
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.04)",
    border: "rgba(6, 182, 212, 0.3)",
    glow: "rgba(6, 182, 212, 0.35)",
  }
};

const ServiceCard = ({ index, title, icon }) => {
  const conf = glowConfig[title] || {
    color: "#915eff",
    bg: "rgba(145, 94, 255, 0.04)",
    border: "rgba(145, 94, 255, 0.3)",
    glow: "rgba(145, 94, 255, 0.35)"
  };

  return (
    <Tilt 
      className="xs:w-[250px] w-full"
      options={{
        max: 20,
        scale: 1.05,
        speed: 300,
        glare: true,
        "max-glare": 0.2
      }}
    >
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.25, 0.75)}
        className="cyber-card"
        style={{
          "--glow-color": conf.color,
          "--glow-bg": conf.bg,
          "--glow-border": conf.border,
          "--glow-shadow": conf.glow
        }}
      >
        {/* Futuristic Sci-fi Corner Brackets */}
        <span className="cyber-bracket bracket-tl" />
        <span className="cyber-bracket bracket-tr" />
        <span className="cyber-bracket bracket-bl" />
        <span className="cyber-bracket bracket-br" />

        {/* Card Content */}
        <div className="cyber-card-inner">
          <div className="icon-wrapper">
            <img src={icon} alt={title} className="w-16 h-16 object-contain cyber-icon" loading="lazy" />
          </div>
          <h3 className="text-white text-[20px] font-bold text-center mt-6">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      {/* Cyber Hacker Terminal Interface */}
      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-6 cyber-terminal-box max-w-4xl"
      >
        {/* Terminal Header */}
        <div className="cyber-terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>
          <div className="terminal-title">purjeet@system:~/about_me.sh</div>
        </div>

        {/* Terminal Body */}
        <div className="cyber-terminal-body">
          <p className="terminal-line"><span className="text-purple-400">guest@portfolio</span>:<span className="text-blue-400">~</span>$ ./read_bio.sh</p>
          <div className="terminal-content">
            I am an Information Technology student at MU University and multilingual speaker with a passion
            for ethical hacking and artificial intelligence. I am looking to do an internship in a company that values 
            innovation, collaboration, and continuous learning. I am confident that my enthusiasm and
            drive will help me succeed in any role that leverages my passion for technology.
            <span className="terminal-cursor" />
          </div>
        </div>
      </motion.div>

      {/* Grid of Skill Cards */}
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      {/* Scoped CSS Styles */}
      <style>{`
        /* ── Cyber Terminal ───────────────────────────── */
        .cyber-terminal-box {
          background: rgba(13, 11, 28, 0.75);
          border: 1px solid rgba(145, 94, 255, 0.25);
          border-radius: 12px;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(145, 94, 255, 0.05);
          overflow: hidden;
          font-family: 'Courier New', Courier, monospace;
        }

        .cyber-terminal-header {
          background: rgba(22, 19, 41, 0.9);
          border-bottom: 1px solid rgba(145, 94, 255, 0.15);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          position: relative;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .terminal-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #aaa6c3;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .cyber-terminal-body {
          padding: 20px 24px;
          color: #fff;
          font-size: 15px;
          line-height: 1.7;
        }

        .terminal-line {
          font-size: 13px;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .terminal-content {
          position: relative;
          color: #e5e5e5;
        }

        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: #915eff;
          margin-left: 6px;
          animation: terminal-blink 1s steps(2, start) infinite;
          vertical-align: middle;
        }

        @keyframes terminal-blink {
          to { visibility: hidden; }
        }

        /* ── Cyber Cards ──────────────────────────────── */
        .cyber-card {
          position: relative;
          width: 100%;
          min-height: 280px;
          background: rgba(26, 21, 51, 0.45);
          border: 1px solid var(--glow-border);
          border-radius: 20px;
          padding: 1px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .cyber-card:hover {
          background: var(--glow-bg);
          border-color: var(--glow-color);
          box-shadow: 0 8px 32px var(--glow-shadow), 0 0 15px rgba(255, 255, 255, 0.05);
        }

        .cyber-card-inner {
          background: rgba(29, 24, 54, 0.85);
          border-radius: 19px;
          min-height: 276px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
          height: 100%;
          transition: background 0.3s ease;
        }

        .cyber-card:hover .cyber-card-inner {
          background: rgba(29, 24, 54, 0.55);
        }

        .icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(22, 19, 41, 0.95);
          border: 1px solid rgba(145, 94, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .cyber-card:hover .icon-wrapper {
          transform: translateY(-8px) scale(1.05);
          border-color: var(--glow-color);
          box-shadow: 0 0 20px var(--glow-shadow);
        }

        .cyber-icon {
          transition: transform 0.3s ease;
        }

        .cyber-card:hover .cyber-icon {
          transform: rotate(5deg);
        }

        /* ── Sci-fi Corner Brackets ── */
        .cyber-bracket {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--glow-color);
          border-style: solid;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .cyber-card:hover .cyber-bracket {
          opacity: 1;
          width: 16px;
          height: 16px;
        }

        .bracket-tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
        .bracket-tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
        .bracket-bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
        .bracket-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }
      `}</style>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, 'about');

export default WrappedAbout;
