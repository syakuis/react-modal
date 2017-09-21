/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const base = require('./webpack.base.config');
const pkg = require('./package.json');
const { port, publicPath, dist, src, entry, filename, externals } = pkg.config;

console.log(src, dist);
module.exports = merge(base, {
  devtool: 'source-map',
  entry: './src/demo/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    port,
    contentBase: dist,
  },
});
