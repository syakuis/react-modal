/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./webpack.base.config');

module.exports = merge(base(), {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});