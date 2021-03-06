﻿var webpack = require('webpack');
var path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
var HappyPack = require('happypack');//多线程loader 加快编译速度
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '.', 'mapbox_main.js'),//已多次提及的唯一入口文件
  output: {
    path: path.join(__dirname, '.', 'output'),//打包后的文件存放的地方
    filename: "webclient-mapboxgl-framework.min.js" //打包后输出文件的文件名
  },
  module: {
    rules: [{
      test: /(\.js)$/,
      use: 'happypack/loader?id=js',
      exclude: [/node_modules/, /leaflet/, /openlayers/]
    }]
    // rules: [
    //     {
    //         test: /(\.js)$/,
    //         use: {
    //             loader: "babel-loader",
    //             options: {
    //                presets: ['es2015'],
    //                plugins: ['transform-runtime']
    //             }
    //         },
    //         exclude:  [/node_modules/,/mapgislayerForLeaf/,/clientThemeLeaf/]
    //     }
    // ]
  },
  externals: {
    // 'mapbox-gl': 'mapboxgl',
    'mapv': "function(){try{return mapv}catch(e){return {}}}()",
    'echarts': 'function(){try{return echarts}catch(e){return {}}}()'
  },
  // devtool: 'cheap-module-source-map',
  plugins: [
    new HappyPack({
      id: 'js',
      // threads: 4,
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
        }
      }]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //NODE_ENV: JSON.stringify("production") 
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()

  ],
  optimization: {
    minimizer: [new uglify({ uglifyOptions: { compress: false } })]
  }
}