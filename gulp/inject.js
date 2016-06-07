'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')();

var fs = require('fs')

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

/*

//This gulp task is meant to produce dynamic dependencies that will be used to load all required files when the app is bootstrapped from inside OBIEE
gulp.task('inject-async', function () {

  var wireDepDataJS = require('wiredep')(conf.wiredep)

  //Log wiredep data
  fs.writeFileSync(path.join(conf.paths.tmp, '/wiredep.json'), JSON.stringify(wireDepDataJS), 'utf8');

});
*/


gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});



gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
