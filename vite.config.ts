import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 44396,
    https: {
      key: undefined,
      cert: undefined,
    },
    strictPort: true,
    cors: {
      origin: true,
    },
    proxy: {
      '/api': {
        target: 'https://localhost:44396',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "esnext",
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  }
});
