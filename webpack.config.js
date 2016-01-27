var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './webpack.entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'cms-components.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.html$/,
      loader: 'ngtemplate',
      query: {
        module: 'cmsComponents.templates',
        relativeTo: __dirname + '/'
      }
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.png$/,
      loader: 'file',
      query:{
        name: '[name].[ext]'
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin('cms-components.css')
  ],
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './styles'),
      path.resolve(__dirname, 'bower_components')
    ]
  }
};
