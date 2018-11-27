const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

const devConfig = merge(baseConfig, {
  target: 'electron-renderer',

  mode: 'production',

  devtool: 'source-map',

  entry: [
    paths.appIndexJs
  ],

  output: {
    path: paths.appBuild,
    // publicPath: '',
    filename: 'renderer.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ]
});

module.exports = devConfig;
