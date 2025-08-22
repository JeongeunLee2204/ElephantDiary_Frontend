import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 Vite 플러그인 추가
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring 서버 주소
        changeOrigin: true,
      },
    },
  },
});
