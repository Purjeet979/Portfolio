import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          three: ["three"],
        },
      },
      onwarn(warning, warn) {
        if (warning.code === "MISSING_EXPORT" &&
            warning.exporter?.includes("three")) return;
        warn(warning);
      },
    },
  },
});
