import { defineConfig } from "vite"
import { preact } from "vite-plugin-preact"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    preact()
  ],
  root: "sources"
})
