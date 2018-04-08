/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const { dependencies: externals } = require('../src/package.json');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.ts[x]?$/,
        loaders: ['react-hot-loader/webpack', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },

  plugins: [],

  externals: Object.keys(externals || {}),
};
