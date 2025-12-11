import preact from "@preact/preset-vite";
import { defineConfig } from "vitest/config";

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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
});
