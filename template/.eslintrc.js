module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "semi-spacing": ["error", { before: false, after: true }],
    "@typescript-eslint/indent": ["error", 2],
    "comma-spacing": ["error", { before: false, after: true }],
    "object-curly-spacing": ["error", "always", { arraysInObjects: false }],
    "key-spacing": [
      "error",
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
      },
    ],
    "comma-dangle": [0, "always-multiline"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "no-multi-spaces": "error",
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
  }
};
