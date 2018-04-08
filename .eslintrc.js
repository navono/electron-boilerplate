module.exports = {
  extends: [
    // "eslint:recommended",
    // "plugin:react/recommended",
    // "plugin:jsx-a11y/recommended",
    // "plugin:prettier/recommended"
    // "plugin:jest/recommended"
  ],
  root: true,
  env: {
    es6: true,
    browser: true
  },
  parser: "typescript-eslint-parser",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["typescript", "react", "import", "jsx-a11y", "prettier", "jest"],
  // 全局变量
  globals: {
    process: false,
    window: false,
    module: false,
    require: false,
    __dirname: false
  },
  rules: {
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 将规则视为一个警告
    // "error" 或 2 - 将规则视为一个错误

    "prettier/prettier": "error",
    
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-console": 1,
    "no-unused-vars": 1,
    "react/no-render-return-value": 0
  }
};
