const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {}
  if (isProd) {
    config.minimize = true
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        exclude: [/\/customizer/, /\/navigation/, /\/skip-link-focus-fix/]
      })
    ]
  }
  return config
}

const cssLoaders = (loaderType, options) => {
  const loaders = [{
      loader: MiniCssExtractPlugin.loader,
      options: {

      },
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "postcss-preset-env",
              {
                browsers: 'last 2 versions'
              },
            ],
            [
              "autoprefixer",
              {
                overrideBrowserslist: ['ie >= 10', 'last 4 version']
              },
            ]
          ],
        },
      },
    }
  ];

  if (loaderType) {
    if (options) {
      loaders.push({
        loader: loaderType,
        options
      })
    } else {
      loaders.push(loaderType)
    }
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: { import: './scripts/index.js', filename: 'js/index.js' },
    auxillary: { import: './scripts/auxillary.js', filename: 'js/auxillary.js' }
  },
  output: {
    path: path.resolve(__dirname, '../assets')
  },
  optimization: optimization(),
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '../style.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './scripts/wordpress', to: path.resolve(__dirname, '../assets/js') }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[a|c]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        type:'asset/resource',
        include: [
          path.resolve(__dirname, 'src/fonts')
        ],
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type:'asset',
        exclude: [
          path.resolve(__dirname, 'src/fonts')
        ],
        generator: {
          filename: 'images/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1024
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  targets: {
                    ie: 10,
                    chrome: 59,
                    edge: 13,
                    firefox: 50,
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
}