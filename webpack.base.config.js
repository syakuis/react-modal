/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('./package.json');

const base = (args) => {
  const config = Object.assign(pkg.config, args);
  const { port, publicPath, dist, src, entry, filename, externals } = config;

  return {
    entry,

    output: {
      path: path.join(__dirname, dist),
      publicPath,
      filename: `${filename}.js`,
      libraryTarget: 'umd',
      library: 'ReactModal',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'SOURCE_TARGET': JSON.stringify(process.env.SOURCE_TARGET),
        },
      }),
      new ExtractTextPlugin({
        filename: `${filename}.css`,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${src}/index.html`,
      }),
      new webpack.HotModuleReplacementPlugin(),
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
          exclude: /\.module\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: process.env.NODE_ENV === 'production',
                  importLoaders: 1,
                },
              },
            ],
          }),
        },
        {
          test: /\.module\.css$/,
          include: path.join(__dirname, src),
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: process.env.NODE_ENV === 'production',
                  camelCase: true,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                },
              },
            ],
          }),
        },
        // {
        //   test: /\.(png|jpg|gif)$/,
        //   use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
        // },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
        },
        // 폰트를 제대로 불러오지 못함.
        {
          test: /\.(png)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000, // 10kb
            },
          },
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, src),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
        },
      ],
    },

    resolve: {
      alias: {
        _resources: path.resolve(__dirname, `${src}/resources`),
        _commons: path.resolve(__dirname, `${src}/commons`),
        _contatiners: path.resolve(__dirname, `${src}/contatiners`),
        _components: path.resolve(__dirname, `${src}/components`),
      },
    },

    devServer: {
      port,
      contentBase: dist,
      disableHostCheck: true,
      host: '0.0.0.0',
    },
  };
};

module.exports = base;
