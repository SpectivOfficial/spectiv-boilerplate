const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: [
    path.join(__dirname, 'client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/production.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
};
