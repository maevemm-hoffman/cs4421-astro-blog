import eslintPluginAstro from "eslint-plugin-astro";

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