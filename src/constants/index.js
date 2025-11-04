import {
  c,
  python,
  java,
  cpp,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  edunet,
  weatherpedia,
  termpw,
  payloadmaster,
  threejs,
  mhft,
  sketcher,
  mathwork,
  CompileVortex,
  eduskill,
  // 1. Add your new logo/icon files to the 'src/assets' folder
  // 2. Import them here just like the others:
  // e.g., import nptel from "../assets/nptel.png";
  // e.g., import cisco from "../assets/cisco.png";
  // e.g., import hackerrank from "../assets/hackerrank.png";
} from "../assets";
// ADD THIS NEW LINE:
import mysql from "../assets/mysql.png";
import trex from "../assets/trex.png";
import angrybird from "../assets/angrybird.png";
import hackstreakImage from "../assets/hackstreak.png"; // <-- (Use your actual file name)
import prepguruImage from "../assets/prepguru.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  { title: "C", icon: c },
  { title: "Python", icon: python },
  { title: "Java", icon: java },
  { title: "MySQL", icon: mysql }, // <-- Added this
];
export const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "Rect JS", icon: reactjs },
  { name: "Node JS", icon: nodejs },
  { name: "git", icon: git },
];

export const experiences = [
  {
    title: "HTML Training",
    company_name: "Spoken Tutorial, IIT Bombay",
    icon: eduskill, // <-- 3. Replace 'eduskill' with your imported icon, e.g., 'iitbombay'
    iconBg: "#161329",
    date: "October 7, 2025",
    points: [
      "Successfully completed the HTML test with a score of 80%, organized at A. P Shah Institute of Technology.",
      "Training material provided by EduPyramids, SINE, IIT Bombay.",
    ],
  },
  {
    title: "1st Place - HackStreak 1.0",
    company_name: "ITSA, A.P. Shah Institute of Technology",
    icon: mathwork, // <-- Replace with your imported icon
    iconBg: "#161329",
    date: "September 17, 2025",
    points: [
      "Secured FIRST PLACE in the HackStreak 1.0 competition.",
      "The event was hosted by the Information Technology Student Association (ITSA) on the occasion of Engineer's Day.",
    ],
  },
  {
    title: "Java Full Stack Developer Virtual Internship",
    company_name: "AICTE - EduSkills",
    icon: eduskill, // <-- Replace with your imported icon
    iconBg: "#161329",
    date: "July - Sep 2025",
    points: [
      "Successfully completed a 10-week virtual internship as a Java Full Stack Developer.",
      "Gained practical experience in Java full-stack technologies through the AICTE National Internship Portal.",
    ],
  },
  {
    title: "Data Base Management System",
    company_name: "NPTEL (IIT Kharagpur)",
    icon: edunet, // <-- Replace 'edunet' with your imported 'nptel' icon
    iconBg: "#161329",
    date: "Jul - Sep 2025",
    points: [
      "Successfully completed the 8-week NPTEL course with a consolidated score of 63%.",
      "Gained proficiency in database management systems, verified by a proctored exam.",
    ],
  },
  {
    title: "Problem Solving (Basic) Certified",
    company_name: "HackerRank",
    icon: mathwork, // <-- Replace 'mathwork' with your imported 'hackerrank' icon
    iconBg: "#161329",
    date: "August 11, 2025",
    points: [
      "Passed the HackerRank skill certification test for Problem Solving (Basic).",
      "Demonstrated proficiency in fundamental problem-solving skills.",
    ],
  },
  
  {
    title: "Array Mastery Bootcamp",
    company_name: "DevTown, Microsoft Student Chapter - MSIT & GDG - VIT-AP",
    icon: eduskill, // <-- Replace 'eduskill' with your imported 'devtown' icon
    iconBg: "#161329",
    date: "June 24, 2025",
    points: [
      "Completed the 5-day free bootcamp on 'ARRAY MASTERY: CRACK ARRAY PUZZLES LIKE A PRO'.",
      "Recognized for participation and project completion in the event hosted in collaboration with Microsoft Student Chapter - MSIT and GDG - VIT-AP.",
    ],
  },
  {
    title: "Networking Technology Foundations",
    company_name: "Juniper Networks",
    icon: mathwork, // <-- Replace 'mathwork' with your imported 'juniper' icon
    iconBg: "#161329",
    date: "June 20, 2025",
    points: [
      "Successfully completed the Networking Technology Foundations course from Juniper Education Services.",
    ],
  },
  {
    title: "Fundamentals of Data Structures in C",
    company_name: "Simplilearn SkillUP",
    icon: edunet, // <-- Replace 'edunet' with your imported 'simplilearn' icon
    iconBg: "#161329",
    date: "April 4, 2025",
    points: [
      "Successfully completed the online course for Fundamentals of Data Structures in C.",
      "Demonstrated initiative and commitment to deepening skills in core computer science concepts.",
    ],
  },
  {
    title: "Python Essentials 1",
    company_name: "Cisco Networking Academy",
    icon: eduskill, // <-- Replace 'eduskill' with your imported 'cisco' icon
    iconBg: "#161329",
    date: "January 31, 2025",
    points: [
      "Successfully completed the Python Essentials 1 course offered by A.P. Shah Institute of Technology.",
      "Gained foundational knowledge in Python programming through the Cisco Networking Academy program.",
    ],
  },
];

export const projects = [
  {
    name: "T-Rex Runner Game",
    description:
      "A clone of the classic Chrome T-Rex runner game, built with JavaScript, HTML, and CSS. Jump over obstacles and see how high you can score!",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "HTML5", color: "green-text-gradient" }, // <-- THE FIX IS HERE (was 'name:g:')
      { name: "CSS", color: "pink-text-gradient" },
    ],
    image: trex,
    source_code_link: "https://github.com/Purjeet979/Trex.git", // <-- I also fixed this link
  },
  {
    name: "Angry Birds Clone",
    description:
      "A web-based physics game inspired by Angry Birds. Launch birds to knock down structures, created using JavaScript and game physics principles.",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "HTML5", color: "green-text-gradient" },
      { name: "GameDev", color: "pink-text-gradient" },
    ],
    image: angrybird,
    source_code_link: "https://github.com/Purjeet979/AngryBird.git", // <-- I also fixed this link
  },
  {
    name: "HackStreak 1.0",
    description:
      "Secured 1st place in HackStreak 1.0 (ITSA hackathon) for developing a real-time ambient music generator that adapts to user inputs like mood or session length. Demonstrated strong problem-solving, teamwork, and time management skills under pressure.",
    tags: [
      { name: "react", color: "blue-text-gradient" }, // <-- Example tag
      { name: "nodejs", color: "green-text-gradient" }, // <-- Example tag
      { name: "python", color: "pink-text-gradient" }, // <-- Example tag
    ],
    image: hackstreakImage, // The image you imported
    source_code_link: "https://github.com/Purjeet979/HackStreak-1.0.git", // <-- CHANGE THIS
  },
  {
    name: "PrepGuru - Full Stack Java Project",
    description:
      "Developed a full-stack AI-powered learning platform with timed quizzes, smart hints, progress dashboards, and an admin panel for quiz management and leaderboards using Spring Boot and React.",
    tags: [
      { name: "java", color: "blue-text-gradient" },
      { name: "springboot", color: "green-text-gradient" },
      { name: "react", color: "pink-text-gradient" },
      { name: "mysql", color: "orange-text-gradient" }, // <-- You can find colors in index.css
    ],
    image: prepguruImage, // The image you imported
    source_code_link: "https://github.com/Purjeet979/Purjeet-QuizGame.git", // <-- CHANGE THIS
  },
];