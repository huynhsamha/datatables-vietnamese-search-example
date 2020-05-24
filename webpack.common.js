const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { Pages } = require('./webpack.config');

const dist = path.resolve(__dirname, 'dist');

const htmlLoader = path => `!!html-loader?interpolate&attrs=img:data-src!${path}`;

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    publicPath: '', // prefix path should be '/', for github page please use empty path
    path: dist,
    filename: 'js/[name].bundle.js' // in directory ./dist/js/
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // split css to files, not use style-loader
          'css-loader',
          /**
           * postcss-loader
           * Use it after css-loader and style-loader,
           * but before other preprocessor loaders
           * like e.g sass|less|stylus-loader.
           *
           * Config file: postcss.config.js
           */
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:data-src'],
            minimize: false,
            removeComments: false,
            collapseWhitespace: false,
            interpolate: true
          }
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      publicPath: '', // prefix path should be '/', for github page please use empty path
      path: dist,
      filename: 'css/[name].[hash].css', // in directory ./dist/css/
      chunkFilename: 'css/[name].[hash].css' // in directory ./dist/css/
    }),

    new CleanWebpackPlugin([dist]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './public'),
      to: dist
    }]),

    ...Pages.map(({ template, filename, js }) => new HtmlWebpackPlugin({
      template: htmlLoader(template),
      filename,
      chunks: ['runtime', 'vendors', ...js],
      hash: true
    }))

  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
