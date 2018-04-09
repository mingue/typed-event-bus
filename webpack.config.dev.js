const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common,{
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
        new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
        new CleanWebpackPlugin(['dist/bundle.js']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ],
});