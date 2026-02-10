const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    ignores: ["lib/**/*", "generated/**/*", "*.config.js"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.dev.json"],
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "writable",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "import": importPlugin,
    },
    rules: {
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "import/no-unresolved": 0,
      ...typescriptEslint.configs.recommended.rules,
    },
  },
];
