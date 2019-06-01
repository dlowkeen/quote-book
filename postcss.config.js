const autoprefixer = require('autoprefixer');
const uiVars = require('./ui-vars');

module.exports = {
  plugins: [
    require('stylelint')({}), // stylelint recommends this happen before any transformations
    require('postcss-import'), // should be first transformation applied
    require('postcss-mixins')({
      mixinsDir: __dirname + '/src/styles/mixins',
    }),
    require('postcss-simple-vars')({
      // return object of variables that should be accessible in your stylesheets
      variables: function() {
        return uiVars;
      },
    }),
    require('postcss-functions')({
      // define functions for transforming CSS which can be called from within stylesheets
      functions: {
        // sets font sizes, can be used elsewhere for consistent element spacing and the like.
        fontSize: function(degree, strand) {
          if (strand == 2) {
            var base = uiVars.base2;
            var ratio = uiVars.ratio2;
          } else {
            var base = uiVars.base1;
            var ratio = uiVars.ratio1;
          }
          return `${base * Math.pow(ratio, degree)}rem`;
        },
        // returns a breakpoint -- must request a breakpoint defined in ui-vars.js -- pass "false" as the second argument if you want "max-width" instead of "min-width" (shouldn't unless there's a very compelling reason)
        getBreakpoint: function(bp, min) {
          var min = min == 'false' ? false : true; // dirty. converting to boolean as postcss-functions seems to treat all arguments as a string. if undefined, treat as true, as we want to enforce mobile-first as much as possible
          if (min) {
            return `(min-width: ${uiVars[bp]}px)`;
          } else {
            return `(max-width: ${uiVars[bp]}px)`;
          }
        },
        // returns a percentage width -- TODO - this is pretty simplistic, how can I expand to make it more useful?
        getWidth(dividend, divisor) {
          return `${(dividend / divisor) * 100}%`;
        },
      },
    }),
    require('postcss-nested'),
    require('postcss-flexbugs-fixes'),
    require('postcss-flexbox'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};
