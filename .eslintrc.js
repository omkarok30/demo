module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@antfu',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: ['error', 'always'],
    curly: ['error', 'all'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/consistent-type-imports': 0,
    'quote-props': ['error', 'as-needed'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    }],
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
};
