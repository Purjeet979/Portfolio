import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Typewriter from "typewriter-effect";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const useDesktopCanvas = () => {
  const [enabled, setEnabled] = useState(
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

const Hero = () => {
  const showComputerCanvas = useDesktopCanvas();

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Purjeet</span>
          </h1>
          <div className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am doing
            <Typewriter
              options={{
                strings: ["B.Tech", "Information Technology"],
                autoStart: true,
                loop: true,
                loopCount: Infinity,
                deleteSpeed: "natural",
                pauseFor: 1000,
              }}
            />
          </div>
        </div>
      </div>

      {showComputerCanvas ? (
        <Suspense fallback={<div className="hero-canvas-fallback" />}>
          <ComputersCanvas />
        </Suspense>
      ) : (
        <div className="hero-canvas-fallback" />
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
