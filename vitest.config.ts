import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Vitest compiles JSX itself; no React plugin needed.
  esbuild: { jsx: "automatic" },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
});
