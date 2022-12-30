import { defineConfig } from "vite"
import { preact } from "vite-plugin-preact"

export default defineConfig({
  plugins: [
    preact()
  ],
  root: "sources"
})
