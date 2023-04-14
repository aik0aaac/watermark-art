// vite.config.js
import vue from "@vitejs/plugin-vue";
import path from "path";

export default {
  plugins: [vue()],
  server: {
    port: 5250,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "docs",
};
