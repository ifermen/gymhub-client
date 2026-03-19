export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'responsive', 'screen'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.css'],
      customSyntax: 'postcss-html',
    },
  ],
}
