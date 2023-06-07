module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ["error", "always"],
    'semi-style': ["error", "last"],
    'indent': ["error", 2],
    'quotes': ["error", "double"],
    'comma-dangle': ["error", "always-multiline"],
    'no-trailing-spaces': ["error", { "skipBlankLines": true }],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    'no-multi-spaces': ["error", { "ignoreEOLComments": true }]
    
  },
};
