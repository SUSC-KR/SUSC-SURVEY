import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/SUSC-WEB-FE/",
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
