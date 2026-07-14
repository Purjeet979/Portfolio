import trex from "../assets/trex.png";
import mysql from "../assets/mysql.png";
import mhft from "../assets/projects/mhft.webp";
import shramsetu1 from "../assets/projects/shramsetu1.webp";
import shramsetu2 from "../assets/projects/shramsetu2.webp";
import shramsetu3 from "../assets/projects/shramsetu3.webp";
import shramsetu4 from "../assets/projects/shramsetu4.webp";
import trex2 from "../assets/projects/trex2.webp";
import trex3 from "../assets/projects/trex3.webp";
import trex4 from "../assets/projects/trex4.webp";
import snehasathi1 from "../assets/projects/snehasathi1.webp";
import snehasathi2 from "../assets/projects/snehasathi2.webp";
import snehasathi3 from "../assets/projects/snehasathi3.webp";
import snehasathi4 from "../assets/projects/snehasathi4.webp";
import ai_assistant1 from "../assets/projects/ai_assistant1.webp";
import ai_assistant2 from "../assets/projects/ai_assistant2.webp";
import ai_assistant3 from "../assets/projects/ai_assistant3.webp";
import ai_assistant4 from "../assets/projects/ai_assistant4.webp";
import prepguru1 from "../assets/projects/prepguru1.webp";
import prepguru2 from "../assets/projects/prepguru2.webp";
import prepguru3 from "../assets/projects/prepguru3.webp";
import prepguru4 from "../assets/projects/prepguru4.webp";
import security1 from "../assets/projects/security1.webp";
import security2 from "../assets/projects/security2.webp";
import security3 from "../assets/projects/security3.webp";
import security4 from "../assets/projects/security4.webp";

export const projects = [
  {
    name: "T-Rex Runner Game",
    description:
      "An interactive, physics-based 2D infinite runner game built from scratch using Vanilla JavaScript, HTML5 Canvas API, and custom CSS3 animations. Features responsive collision detection algorithms, progressive difficulty scaling, state management, and localized high-score persistence via Web Storage API.",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "HTML5", color: "green-text-gradient" },
      { name: "CSS", color: "pink-text-gradient" },
    ],
    images: [trex3, trex, trex2, trex4],
    source_code_link: "https://github.com/Purjeet979/Trex.git",
  },
  {
    name: "SnehaSathi",
    description:
      "A cross-platform personal safety and support mobile application engineered with Flutter, Dart, and Firebase. Implements real-time GPS tracking integration, background geofencing, push notification triggers, automated emergency SMS dispatch APIs, and a secure real-time Firestore database for incident reporting.",
    tags: [
      { name: "Flutter", color: "blue-text-gradient" },
      { name: "Dart", color: "green-text-gradient" },
      { name: "Firebase", color: "pink-text-gradient" },
    ],
    images: [snehasathi1, snehasathi2, snehasathi3, snehasathi4],
    source_code_link: "https://github.com/Purjeet979/SnehaSathi.git",
  },
  {
    name: "Personal AI Assistant",
    description:
      "An intelligent, voice-activated desktop agent utilizing natural language processing (NLP) to automate system tasks, execute custom scripts, and query real-time APIs. Integrates advanced Speech-to-Text (STT) models, OpenAI GPT-4 API engine for context-aware responses, dynamic notification scheduling, and background thread execution.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "OpenAI", color: "green-text-gradient" },
      { name: "SpeechRecognition", color: "pink-text-gradient" },
    ],
    images: [ai_assistant1, ai_assistant2, ai_assistant3, ai_assistant4],
    source_code_link: "https://github.com/Purjeet979/PersonalAIAssistant.git",
  },
  {
    name: "ShramSetu",
    description:
      "A full-stack, decentralized livelihood marketplace connecting daily wage workers directly with local employers to eliminate intermediate commission agents. Features secure user authentication (JWT), dynamic bidding algorithms, interactive Google Maps geolocation integration, and transparent digital ledger transaction records.",
    tags: [
      { name: "ReactJS", color: "blue-text-gradient" },
      { name: "NodeJS", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
    ],
    images: [shramsetu1, shramsetu2, shramsetu3, shramsetu4],
    source_code_link: "https://github.com/Purjeet979/ShramSetu-The-Bridge-to-Fair-Pay.git",
  },
  {
    name: "SecurityApp",
    description:
      "A high-security Android credential vault utilizing military-grade AES-256 encryption keys generated and isolated within the Android Keystore system. Features secure biometric authentication integration, SQLite database encryption, protection against screen-capture exploits, and a clean, sandboxed UI.",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "AndroidSDK", color: "green-text-gradient" },
      { name: "Cryptography", color: "pink-text-gradient" },
    ],
    images: [security1, security2, security3, security4],
    source_code_link: "https://github.com/Purjeet979/SecurityApp.git",
  },
  {
    name: "PrepGuru - Full Stack Java Project",
    description:
      "A high-concurrency, full-stack learning platform powered by Spring Boot (REST APIs), Spring Security, and React.js. Incorporates an AI-driven hint engine, transactional quiz state engines, reactive performance tracking dashboards, and a robust admin dashboard with real-time leaderboard analytics powered by MySQL.",
    tags: [
      { name: "java", color: "blue-text-gradient" },
      { name: "springboot", color: "green-text-gradient" },
      { name: "react", color: "pink-text-gradient" },
      { name: "mysql", color: "orange-text-gradient" },
    ],
    images: [prepguru1, prepguru2, prepguru3, prepguru4],
    source_code_link: "https://github.com/Purjeet979/Purjeet-QuizGame.git",
  },
];
