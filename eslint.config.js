import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "'typescript-eslint";

export default [
  {
    ignores: [
      ".astro/**",
      "dist/**",
      "node_modules/**",
    ],
  },

  ...eslintPluginAstro.configs.recommended,

  {
    rules: {
      // your custom rules here
    },
  },
];