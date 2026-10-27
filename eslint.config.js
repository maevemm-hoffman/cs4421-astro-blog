import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      ".astro/**",
      "dist/**",
      "node_modules/**",
      "dist-static/**"
    ],
  },

  ...eslintPluginAstro.configs.recommended,

  {
    rules: {
      // your custom rules here
    },
  },
];