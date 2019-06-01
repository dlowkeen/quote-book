///////// stylelint config
// helpful links:
// config - https://stylelint.io/user-guide/configuration/
// rules - https://stylelint.io/user-guide/rules/
// basic preset (installed via npm) - https://github.com/stylelint/stylelint-config-standard
// primer on our preset - https://www.npmjs.com/package/stylelint-config-primer?activeTab=readm

module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    // customize here
    indentation: 'tab',
    'at-rule-no-unknown': [
      true,
      {
        // necessary for postcss-mixins plugin -- remove if that goes away
        ignoreAtRules: ['mixin', 'define-mixin'],
      },
    ],
    'declaration-block-semicolon-newline-after': [
      null, // TODO - this might be a good rule to have, but I (DWM) just so love to do width/height side-by-side (also top/right/bottom/left for positioning)
    ],
    'max-empty-lines': 2,
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        // css-modules uses "composes" to share styles between components
        ignoreProperties: ['composes'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        // :local and :global are used by css-modules for scoping classes
        ignorePseudoClasses: ['local', 'global'],
      },
    ],
  },
};
