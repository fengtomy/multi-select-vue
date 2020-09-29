const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname + './../src/index.js'),
  output: {
    path: path.resolve(__dirname + './../dist'),
    filename: 'multi-select.min.js'
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
  mode: "production",
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        warning: "verbose",
        ecma: 6,
        beautify: false,
        compress: true,
        comments: false,
        mangle: false,
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}