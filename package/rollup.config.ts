import { defineConfig } from "rollup"
import terser from "@rollup/plugin-terser"
import esbuild from "rollup-plugin-esbuild"

export default defineConfig({
  input: "sources/index.tsx",
  external: [
    "preact",
    "preact/hooks",
    "preact/compat",
    "preact/jsx-runtime"
  ],
  plugins: [
    esbuild({
      jsx: "automatic",
      jsxImportSource: "preact"
    }),
    terser()
  ],
  output: [
    {
      file: "dist/index.mjs",
      format: "esm"
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "preact-page",
      globals: {
        "preact/compat": "preact/compat",
        "preact": "preact",
        "preact/hooks": "preact/hooks",
        "preact/jsx-runtime": "preact/jsx-runtime"
      }
    }
  ]
})
