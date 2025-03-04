import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/SUSC-WEB-FE/",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  optimizeDeps: {
    include: ["react-markdown", "remark-gfm"],
  },
  server: {
    proxy: {
      "/forms": {
        target: "https://cpprhtn.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
