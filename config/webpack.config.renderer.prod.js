const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const devConfig = merge(baseConfig, {
  target: 'electron-renderer',

  mode: 'production',

  devtool: 'source-map',

  entry: [
    './renderer/index'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: '',
    filename: 'renderer.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './renderer/index.html',
    }),
  ]
});

module.exports = devConfig;
