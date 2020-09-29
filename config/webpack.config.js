const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.resolve(__dirname + './../src/index.js'),
  output: {
    path: path.resolve(__dirname + './../dist'),
    filename: 'multi-select.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}