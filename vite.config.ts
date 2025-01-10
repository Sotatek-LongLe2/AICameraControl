import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const SITE_APP = process.env.SITE || "user";
  const isProduct = mode === "production";
  // const isDevelop = mode === "development";

  return {
    plugins: [react(), svgr()],

    server: {
      open: true,
      port: SITE_APP === "user" ? 3033 : 3066,
    },
    resolve: {
      alias: [{ find: "src", replacement: path.resolve(__dirname, "src") }],
    },
    esbuild: {
      drop: isProduct ? ["console", "debugger"] : [],
    },
    build: {
      sourcemap: !isProduct, // Generate source maps only for non-production builds
      outDir: `dist/${SITE_APP}`,
    },
    define: {
      "process.env.SITE": JSON.stringify(SITE_APP),
    },
  };
});
