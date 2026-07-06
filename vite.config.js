import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Highlight-start
import path from "path";
// Highlight-end

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  
  // Highlight-start
  // Configure path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Highlight-end

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));