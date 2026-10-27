import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist/**", "node_modules/**", "src/papaparse.js"] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
