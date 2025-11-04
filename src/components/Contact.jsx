import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import "../index.css";

// This new component will replace the old <form>
const ContactInfoCard = ({ title, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-tertiary py-4 px-6 rounded-lg block transition-all
               hover:bg-black-200 hover:shadow-lg" // Added hover effect
  >
    <span className="text-white font-medium mb-2 block">{title}</span>
    <span className="text-secondary text-[16px]">{value}</span>
  </a>
);

const Contact = () => {
  // All the old state (useState) and handlers (handleSubmit) are removed.
  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact Me</h3>

        {/* This is the new block that replaces the <form> */}
        <div className="mt-12 flex flex-col gap-8">
          <ContactInfoCard
            title="Email"
            value="parthshahu9506@gmmail.com"
            href="mailto:parthshahu9506@gmmail.com"
          />
          <ContactInfoCard
            title="Phone"
            value="+91 8390346801"
            href="tel:+918390346801"
          />
          <ContactInfoCard
            title="LinkedIn"
            value="linkedin.com/in/purjeet-shahu"
            href="https://www.linkedin.com/in/purjeet-shahu-9a8b43370/"
          />
          <ContactInfoCard
            title="GitHub"
            value="github.com/Purjeet979"
            href="https://github.com/Purjeet979"
          />
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");