'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');


var $ = require('gulp-load-plugins')();


function webpackWrapper(watch, test, callback) {
  var webpackOptions = {
    quiet: true,
    context: __dirname + "/..",
    resolve: {
      extensions: ['', '.ts','.js'],
      modulesDirectories: ['node_modules', 'bower_components',"vendor-components"],
      alias: {jquery: "jquery/src/jquery"}
    },
    watch: watch,
    module: {
/*      preLoaders: [{test: /\.ts$/, exclude: /node_modules/, loader: 'tslint-loader'}],*/
      loaders: [{test: /\.ts$/, exclude: /node_modules|bower_components|cli.d.ts/, loaders: ['ng-annotate', 'ts-loader?ignoreWarnings=true']},
        {test: /\.css$/, loader: "style-loader!css-loader?-url"},
        {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap','resolve-url','sass?sourceMap'], //the resolve-url loader is important
        },]
    },
    tslint: {
      emitErrors: true,
    },
    // entry: {
    //   console: "./src/app/index.module",
    //   chatter: "./src/app/chatter-async.module"
    // },
    output: {filename: "[name].module.js", publicPath: "http://localhost:3000/app/"}
  };


  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function (err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if (watch) {
      watch = false;
      callback();
    }
  };


  var sources = [path.join(conf.paths.src, '/app/chatter-async.module.ts')];

  // var sources = [path.join(conf.paths.src, '/app/index.module.ts'),path.join(conf.paths.src, '/app/chatter-async.module.ts')];

  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.ts'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}


gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function () {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
  return webpackWrapper(true, true, callback);
});



