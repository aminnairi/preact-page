import { defineConfig } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import run from "@rollup/plugin-run"
import postcss from "rollup-plugin-postcss"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import copy from "rollup-plugin-copy"

const isDevelopment = process.env["NODE_ENV"] === "development"

export default defineConfig([
  {
    input: "sources/client/index.tsx",
    plugins: [
      copy({
        targets: [
          {
            src: "sources/client/public/*",
            dest: "build/client"
          }
        ]
      }),
      esbuild({
        jsx: "automatic",
        jsxImportSource: "preact"
      }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano()
        ]
      }),
      nodeResolve(),
      commonjs(),
      !isDevelopment && terser()
    ],
    output: {
      dir: "build/client",
      format: "esm"
    }
  },
  {
    input: "sources/server/index.tsx",
    external: [
      "preact/jsx-runtime",
      "preact-render-to-string",
      "preact-ssr-prepass",
      "express",
      "preact-page",
      "path",
      "preact",
      "preact/compat"
    ],
    plugins: [
      esbuild({
        jsx: "automatic",
        jsxImportSource: "preact"
      }),
      isDevelopment && run(),
      !isDevelopment && terser()
    ],
    output: {
      dir: "build/server",
      format: "esm"
    }
  }
])
