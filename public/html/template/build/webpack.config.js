'use strict'
var fs = require('fs')

var webpack = require('webpack')
var path = require('path')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var glob = require('glob')

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')
var utils = require('./utils')
var config = require('./config')
var isProduction = function () {
  return process.env.NODE_ENV == 'production'
}
var isDevelopment = function () {
  return process.env.NODE_ENV == 'development'
}

function getEntry () {
  var entry = {}
  var fsRes = fs.readdirSync(path.resolve(__dirname, '../src/pages'))
  var dir = fsRes.join(',')
  if(fsRes.length==1){
    var  reg=__dirname + '/../src/pages/*/' + dir + '.js';
  }else{
    var  reg=__dirname + '/../src/pages/*/{' + dir + '}.js';
  }

  glob.sync(reg).forEach(function (name) {
      var n = name.match(/([^/]+?)\.js/)[1]
      if (isProduction()||isDevelopment()) {
        entry[n] = ['../src/pages/' + n + '/' + n + '.js']
        if(isProduction()){
          var distHtml=config.bladePath + '/' + n + '.blade.php';
          var template=path.resolve(__dirname, '../template/index.blade.php');
        }
        if(isDevelopment()){
          var distHtml=path.resolve(__dirname, '../'+n + '.html');
          var template=path.resolve(__dirname, '../template/index.html');
        }

        plugins.push(
          new HtmlWebpackPlugin({
            filename: distHtml, // 生成的html存放路径，相对于path
            template: template, // html模板路径
            inject: 'body', // js插入的位置，true/'head'/'body'/false
            hash: true, // 为静态资源生成hash值
            chunks: ['common', n], // 需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
              // 压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: false, // 删除空白符与换行符
              removeAttributeQuotes: true
            }
          })
        )
      } else {
        entry[n] = ['./src/pages/' + n + '/' + n + '.js']
        plugins.push(
          new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../'+n + '.html'), // 生成的html存放路径，相对于path
            template: path.resolve(__dirname, '../template/index.html'), // html模板路径
            inject: 'body', // js插入的位置，true/'head'/'body'/false
            hash: true, // 为静态资源生成hash值
            chunks: ['common', n], // 需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
              // 压缩HTML文件
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
          })
        )
      }
    })

  return entry
}
// webpack插件
var plugins = [
  new webpack.optimize.CommonsChunkPlugin('common'),
  // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: 'jquery',
    createjs: 'src/vendor/createjs/createjs.min.js',
    tracking: 'src/vendor/tracking/tracking',
    vueApp: 'src/app'
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true
  })
]

var entry = [],
  cdnPrefix = '',
  buildPath = '/../dist/',
  publishPath = cdnPrefix + 'dist/'

//
if (isProduction()||isDevelopment()) {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      TEST: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: true
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ])
} else {
  (cdnPrefix = ''),
  (buildPath = '/../dist/'),
  (publishPath = cdnPrefix + '/dist/')

  plugins = plugins.concat([
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      TEST: true
    })
  ])
}

var enterys = getEntry()
// //
var rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    exclude: /(node_modules|static\/flash|createjs.min)/,
    loader: 'babel-loader'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000,
      name: 'images/[name].[ext]?[hash:10]',
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  }
]
if (isProduction()||isDevelopment()) {
  rules = rules.concat(
    utils.styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    })
  )
} else {
  rules = rules.concat(
    utils.styleLoaders({ sourceMap: true, usePostCSS: true })
  )
}

// 编译输出路径
module.exports = {
  entry: enterys,
  output: {
    path: __dirname + buildPath,
    filename: 'js/[name].js',
    publicPath: publishPath,
    chunkFilename: 'js/[id].build.js?[chunkhash]'
  },
  module: {
    rules: rules
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../'),
      pages: path.resolve(__dirname, '../src/pages'),
      static: path.resolve(__dirname, '../static'),
      images: path.resolve(__dirname, '../static/images'),
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
      vendor: path.resolve(__dirname, '../src/vendor')
    },
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: plugins
}

if (!isProduction()||isDevelopment()) {
  module.exports.devtool = '#source-map'
}
