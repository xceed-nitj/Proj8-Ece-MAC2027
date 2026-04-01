/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // cache: false,
      // fix: true,
      include: ["src/**/*.jsx", "src/**/*.js"],
    }),
    // add the support for import errors
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
