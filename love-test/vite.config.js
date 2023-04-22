import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/YOUR_REPOSITORY_NAME",
  plugins: [vue()],
  server: {
    host: true,
  },
});
