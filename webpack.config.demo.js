/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env) => {
  const {
    port, publicPath, apiPath, proxyHost, vendors, output, src, elementId,
  } = Object.assign({}, pkg.config, env);

  return {

    entry: `./${src}/demo.js`,

    output: {
      path: path.join(__dirname, output),
      publicPath,
    },

    plugins: [
      new ExtractTextPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${src}/index.html`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: path.join(__dirname, src),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
            ],
          }),
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, src),
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-3'],
            plugins: [
              'lodash',
              'dynamic-import-webpack',
              'transform-object-assign',
            ],
          },
        },
      ],
    },

    resolve: {
      alias: {
        _resources: path.resolve(__dirname, `${src}/resources`),
        _commons: path.resolve(__dirname, `${src}/commons`),
        _components: path.resolve(__dirname, `${src}/components`),
      },
    },

    devServer: {
      historyApiFallback: true,
      port,
      contentBase: output,
    },
  };
};

