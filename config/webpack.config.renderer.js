const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const PORT = process.env.PORT || 3080;

const devConfig = merge(baseConfig, {
  target: 'electron-renderer',

  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    port: PORT,
    historyApiFallback: true,
    stats: {
      colors: true,
    }
  },

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}/`,
    // dev-server: 遇到错误会重新刷新浏览器
    // only-dev-server: 遇到错误不会重新刷新浏览器，React App推荐使用。因为不会重置状态
    'webpack/hot/only-dev-server',
    './renderer/index',
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: `http://localhost:${PORT}/`,
    filename: 'renderer.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    // dev only
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './renderer/index.html',
    }),
  ]
});

module.exports = devConfig;
