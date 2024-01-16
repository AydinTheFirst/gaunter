module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};

const rules = {
  "@typescript-eslint/quotes": ["error", "double"],
  "@typescript-eslint/semi": ["error", "always"],
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/comma-dangle": "off",
  "@typescript-eslint/no-misused-promises": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/strict-boolean-expressions": "off",
};
