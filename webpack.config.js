const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
path.resolve(__dirname, 'src')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const { toWebpackAliases } = require('./tsconfig.paths.js')

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html',
  }),
  !isProd && new ReactRefreshWebpackPlugin(),
  isProd &&
    new MiniCssExtractPlugin({
      //Чтоб не кэшировался браузером
      filename: '[name]-[hash].css',
    }),
  new ForkTsCheckerPlugin(),
].filter(Boolean)

function getCSSLoaders(wModules = true) {
  let t = 'css-loader'
  if (wModules) {
    t = {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
        },
      },
    }
  }
  //Послед-ть важна. Применяются справа на лево
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    t,
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ]
}

module.exports = {
  devServer: {
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 9002,
  },
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getCSSLoaders(),
      },
      {
        exclude: /\.module\.s?css$/,
        test: /\.s?css$/,
        use: getCSSLoaders(true),
      },
      {
        test: /\.([jt])sx?$/,
        use: 'babel-loader',
      },
      {
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, //20kB
          },
        },
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
      },
      {
        test: /\.(woff2|woff|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins,
  resolve: {
    alias: toWebpackAliases(),
    extensions: ['.jsx', '.js', '.tsx', '.ts', 'scss'],
  },
  target: !isProd ? 'web' : 'browserslist',
}
