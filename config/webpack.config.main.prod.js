const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  target: 'electron-main',

  mode: 'production',

  devtool: 'source-map',

  entry: ['./main/index'],

  output: {
    path: paths.appBuild,
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
});
