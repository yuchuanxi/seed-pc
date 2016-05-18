/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 16:46:56
 * @title       title
 * @description description
 */
'use strict';
const
  path = require('path'),
  fs = require('fs'),

  debug = require('debug')('F:webpack.config'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DedupePlugin = webpack.optimize.DedupePlugin,
  UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
  OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin,
  // [Easy dependency injection for node.js unit testing](https://github.com/jhnns/rewire-webpack)
  // RewirePlugin = require("rewire-webpack"),

  srcDir = path.resolve(process.cwd(), 'client'), // 前端源代码
  viewDir = path.resolve(process.cwd(), 'views'), // jade 模版文件
  devDir = 'dev', // 开发目录
  buildDir = 'dist/'; // 编译目录

/**
 * 获取entry文件列表
 * @return {[type]} [description]
 */
function genEntries () {
  const
    jsDir = srcDir,
    names = fs.readdirSync(jsDir);

  let
    map = {};

  names.forEach(function ( name ) {
    const
      m = name.match(/(.+)\.js$/),
      entry = m ? m[1] : '',
      entryPath = entry ? path.resolve(jsDir, name) : '';

    if ( entry ) {
      debug('entry list: '+ entry);
      map[entry] = entryPath;
    }
  });

  return map;
}

function makeConfig ( options ) {
  options || (options = {});
  var
    isDev = options.debug !== undefined ? options.debug : true,
    appConfig = require('./config.js')(__dirname, isDev),
    entries = genEntries(),
    publicPath = isDev ? '/'+ devDir +'/' : '',
    enrtyKeys = Object.keys(entries),
    // chunks = enrtyKeys,
    config;

  entries.vendors = appConfig.vendors.slice(0);
  entries.index = appConfig.index.concat(entries.index);
  if ( isDev ) {
    // entries.index.unshift('webpack-hot-middleware/client?reload=true');
    entries.vendors.unshift('webpack-hot-middleware/client?reload=true');
  }

  config = {
    entry: entries,
    // 定义了输出文件的位置及名字
    output: {
      // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存中
      path: path.resolve(isDev ? devDir : buildDir),
      filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
      // filename: '[name].js',
      chunkFilename: isDev ? 'chunks/[id].js' : 'chunks/[id].[chunkhash:8].js',
      // chunkFilename: 'chunks/[id].js',
      hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
      publicPath: publicPath,
      jsonpFunction: 'TD'
    },

    resolve: {
      root: [srcDir, path.resolve(process.cwd(), './node_modules')],
      alias: appConfig.aliasSourceMap
      // extensions: ['', '.js', '.css', '.less', '.jade', '.png', '.jpg']
    },
    // resolveLoader: {
    //   root: path.join(__dirname, 'node_modules')
    // },

    module: {
      // noParse: ['jquery', 'backbone', 'underscore'],
      loaders: [
        { test: /\.jade$/, loader: 'jade' },
        { test: /\.css$/, loader: 'style!css' },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!less')
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'image-webpack?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
            // url-loader更好用，小于10KB的图片会自动转成dataUrl，
            // 否则则调用file-loader，参数直接传入
            'url?limit=10000&name=img/[name].[hash:8].[ext]'
          ]
        },
        {
          test: /\.(woff|eot|ttf)$/i,
          loader: 'url?limit=10000&name=fonts/[name].[hash:8].[ext]'
        }
      ],
      preLoaders: [
        // {test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
      ]
    },

    plugins: [
      new CommonsChunkPlugin({
        name: 'vendors',
        filename: isDev ? 'js/common.js' : 'js/common.[hash:8].js',
        // create an async commons chunk
        // 异步共用块 http://webpack.github.io/docs/list-of-plugins.html
        // async: true,
        // minChunks: 1

        // with more entries,
        // this ensures that no other module goes into the vendor chunk.
        minChunks: Infinity
      }),
      // new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin( isDev ? '[name].css' : '[name].[hash:8].css', {
        // 当allChunks指定为false时，css loader必须指定怎么处理
        // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
        // 第一个参数`notExtractLoader`，一般是使用style-loader
        // @see https://github.com/webpack/extract-text-webpack-plugin
        allChunks: false
      }),
      // Automatically loaded modules.
      new webpack.ProvidePlugin({
        d3: 'd3',
        jquery: 'jquery'
      }),
      // Assign the module and chunk ids by occurrence count
      new OccurenceOrderPlugin()
    ],
    recordsPath: path.join(process.cwd(), 'cache', 'webpack.json'),

    devServer: {
      publicPath: publicPath,
      hot: true,
      noInfo: false,
      inline: true,
      stats: {
        cached: false,
        colors: true
      }
    },

    eslint: {
      emitError: false,
      emitWarning: false,
      failOnWarning: false
    }
  }

  // Use this, if you are writing a library and want to publish it as single file
  if ( options.library ) {
    config.output.library = options.library;
    config.output.libraryTarget = 'commonjs2';
  }

  if ( isDev ) {
    config.output.pathinfo = true;
    // config.debug = true;

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
    enrtyKeys.forEach(function ( entryPath ) {

      config.plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(viewDir, entryPath +'.jade'),
        inject: 'body',
        chunks: ['vendors', entryPath],
        filename: entryPath +'.html'
      }));
    });
  }
  else {
    // 自动生成入口文件，入口js名必须和入口文件名相同
    // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
    enrtyKeys.forEach(function ( entryPath ) {

      config.plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(viewDir, entryPath +'.jade'),
        // @see https://github.com/kangax/html-minifier
        minify: {
          collapseWhitespace: true,
          removeComments: true
        },
        inject: 'body',
        chunks: ['vendors', entryPath],
        filename: entryPath +'.html'
      }));
    });

    config.plugins.push(new DedupePlugin());
    config.plugins.push(new UglifyJsPlugin({
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true,
        warnings: true
      },
      output: {
        comments: false
      }
    }));
  }
  // 它会按引用频度来排序 ID，以便达到减少文件大小的效果。
  // config.plugins.push(new OccurenceOrderPlugin());

  return config;
}

module.exports = makeConfig;
