import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      outDir: "./dist",
      include: "./lib",
    }),
  ],
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "PureRender",
      fileName: "cl-pure-render"
    },
  }
})

