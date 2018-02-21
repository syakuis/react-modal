/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');

const pkg = require('./package.json');

const {
  src, port, output,
} = pkg.config;

module.exports = merge(base(), {
  devtool: 'cheap-module-eval-source-map',
  entry: `./${src}/demo/index.js`,
  output: {
    pathinfo: true,
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  devServer: {
    port,
    contentBase: output,
    // 아래의 두 옵션으로 외부에서도 접속할 수 있게 한다.
    disableHostCheck: true,
    host: '0.0.0.0',
    historyApiFallback: true, // router 용 history
  },
});
