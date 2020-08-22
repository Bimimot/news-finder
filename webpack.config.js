const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'; // флаг для режима разработки

module.exports = {
  entry: { main: './src/index.js' },  // источник для js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // точка выхода для js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), // для режима разработки MiniCss не загружаем
               'css-loader',
               'postcss-loader'
             ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
            'file-loader?name=./images/[name].[ext]', // папка выхода для изображений
            {
                loader: 'image-webpack-loader',
                options: {}
            },
        ]
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',  // точка выхода для css
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',  // источник для сборки html
      filename: 'index.html'        // точка выхода для html
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/articles.html',  // источник для сборки доп страницы html
      filename: 'articles.html'        // точка выхода для html
    }),
    new WebpackMd5Hash()
  ]
};