import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import github from "../assets/github.png";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants/projects";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ name, description, tags, images, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring")} className="project-card">
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full relative"
      >
        {/* Split Image Container */}
        <div className="project-img-container">
          {images && images.length >= 4 ? (
            images.slice(0, 4).map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${name}-screenshot-${idx}`}
                loading="lazy"
                className={`split-img split-img-${idx}`}
              />
            ))
          ) : (
            <img
              src={Array.isArray(images) ? images[0] : images}
              alt={`${name}-screenshot`}
              loading="lazy"
              className="single-img"
            />
          )}

          {/* GitHub Source Code Link (placed on top with high z-index) */}
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover z-10">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
            >
              <img src={github} alt="source code" className="w-1/2 h-1/2 object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p variants={fadeIn("", "", 0.1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through examples
          of my work. Each project is briefly described with links to code
          repositories in it.
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>

      <style>{`
        .project-img-container {
          position: relative;
          width: 100%;
          height: 230px;
          overflow: hidden;
          border-radius: 16px;
          background: #111;
        }

        .split-img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          border-radius: 16px;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform, top, left, width, height, opacity;
        }

        .single-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          border-radius: 16px;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        .project-card:hover .single-img {
          transform: scale(1.08);
        }

        /* Stacked initial states */
        .split-img-0 {
          top: 0;
          left: 0;
          z-index: 4;
          opacity: 1;
        }
        .split-img-1 {
          top: 0;
          left: 0;
          z-index: 3;
          opacity: 0;
        }
        .split-img-2 {
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0;
        }
        .split-img-3 {
          top: 0;
          left: 0;
          z-index: 1;
          opacity: 0;
        }

        /* 2x2 Grid Hover Splitting */
        .project-card:hover .split-img-0 {
          width: calc(50% - 3px);
          height: calc(50% - 3px);
          top: 0;
          left: 0;
          border-radius: 8px;
        }

        .project-card:hover .split-img-1 {
          width: calc(50% - 3px);
          height: calc(50% - 3px);
          top: 0;
          left: calc(50% + 3px);
          opacity: 1;
          border-radius: 8px;
        }

        .project-card:hover .split-img-2 {
          width: calc(50% - 3px);
          height: calc(50% - 3px);
          top: calc(50% + 3px);
          left: 0;
          opacity: 1;
          border-radius: 8px;
        }

        .project-card:hover .split-img-3 {
          width: calc(50% - 3px);
          height: calc(50% - 3px);
          top: calc(50% + 3px);
          left: calc(50% + 3px);
          opacity: 1;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default SectionWrapper(Works, "");
