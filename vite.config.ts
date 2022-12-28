import { defineConfig } from "vite"
import { preact } from "vite-plugin-preact"

export default defineConfig({
  plugins: [
    preact()
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: "sources/index.tsx",
      name: "preact-page",
      fileName: "index"
    },
    rollupOptions: {
      external: [
        "preact",
        "preact/hooks",
        "preact/compat"
      ],
      output: {
        globals: {
          "preact": "preact",
          "preact/hooks": "preact/hooks",
          "preact/compat": "preact/compat"
        }
      }
    }
  }
})
