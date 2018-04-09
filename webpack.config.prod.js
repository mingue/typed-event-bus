const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common,{
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.min.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist/bundle.min.js']),
        new webpack.NamedModulesPlugin()
      ],
});