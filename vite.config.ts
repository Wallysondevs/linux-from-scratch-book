import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Quando publicado no GitHub Pages o site fica em
// https://wallysondevs.github.io/linux-from-scratch-book/
// Em dev/local mantemos o base como "/".
const base = process.env.GITHUB_ACTIONS ? "/linux-from-scratch-book/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  },
});
