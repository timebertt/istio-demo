const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.md$/,
        loader: 'file-loader',
        options: {
          name: '[name].md?[hash]'
        }
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Istio Demo',
      hash: true,
      template: 'index.webpack.html',
      // meta: {
      //   'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      // }
    })
  ]
};
