const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } }, // optional, nếu bạn vẫn muốn
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "operator-linebreak": ["error", "before"],
      "quotes": ["error", "double"],
      "no-process-env": "off",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unsafe-optional-chaining": "error",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off"
    }
  }
];
