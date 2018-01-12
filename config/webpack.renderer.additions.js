const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },

  entry: [
    'react-hot-loader/patch',
    './src/renderer/index'
  ]
}