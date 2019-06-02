const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    port: 5288,
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:61386'
    }
  },
  entry: [
    <%_ if (server) { -%>
      path.resolve(__dirname, 'src/client/index')
    <%_ } if (!server) { -%>
      path.resolve(__dirname, 'src/index')
    <%_ } -%>
  ],
  target: 'web',
  output: {
    path: <%_ if (server) { -%> path.resolve(__dirname, 'dist/client') <%_ } else { -%> path.resolve(__dirname, 'dist')<%_ } -%>,
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Title here',
      template: <%_ if (server) { -%> './src/client/index.html' <%_ } else { -%> './src/index.html' <%_ } -%>
    }),
    new CopyPlugin([
      <%_ if (server) { -%>
      { from: './src/server', to: path.resolve(__dirname, 'dist') }
      <%_ } -%>
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['babel-loader' <%_ if (lint) { -%>, 'eslint-loader' <%_ } -%>] 
      },
      {
        test: /\.(html)$/,
        use: [
          'html-loader'
        ]
      }
    ]
  }
}
