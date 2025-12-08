import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const apiTarget = process.env.VITE_SERVER_URL || "http://localhost:4000";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
