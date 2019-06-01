// These settings are used only for the node build
// The browser build settings are specified in webpack.config.js

module.exports = {
  presets: [
    '@babel/react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    'dynamic-import-node',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'css-modules-transform',
      {
        camelCase: true,
        devMode: false,
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css'],
      },
    ],
    [
      'import-static-files',
      {
        baseDir: '/',
        srcDir: '',
        outDir: '/public',
        hash: true
      }
    ],
    'file-loader',
  ],
};
