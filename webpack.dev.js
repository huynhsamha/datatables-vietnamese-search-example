const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    /**
     * webpack-dev-server
     */
    contentBase: path.resolve(__dirname, './public'),
    port: 4200, // client running on port 4200
    open: true,
    proxy: {
      /**
       * Server running on port 3000
       * use as proxy for route /api
       */
      '/api': 'http://localhost:3000'
    }
  }
});
