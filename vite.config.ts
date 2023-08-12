import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@src": path.resolve(__dirname, "src") },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    minify: false,
  },
});
