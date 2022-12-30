import { defineConfig } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import run from "@rollup/plugin-run"

const isDevelopment = process.env["NODE_ENV"] === "development"

export default defineConfig([
  {
    input: "sources/client/index.tsx",
    plugins: [
      esbuild({
        jsx: "automatic",
        jsxImportSource: "preact"
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
