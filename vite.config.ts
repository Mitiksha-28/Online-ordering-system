import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  root: "client",
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@client": path.join(import.meta.dirname, "/client/src"),
      "@server": path.join(import.meta.dirname, "/server/src"),
    },
  },
  plugins: [react()],
});

console.log();
