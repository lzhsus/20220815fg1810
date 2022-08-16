'use strict'
var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    rename = require('gulp-rename'),
    del = require('del'),
    // del = require('delete'),
    pump = require('pump'),
    gaze = require('gaze');
var config = require('./webpack.config');
var flash=require('./flash');

/** 
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['/dist/**/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});


/** 
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    flash.format();
    webpack(config, cb)
});

/** 
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('../dist/style.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('../dist'));
});

/** 
 *  压缩js文件
 */
gulp.task('script',function(){
    console.log('压缩js');
    gulp.src('../dist/*/*.js')
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../dist'));
});

gulp.task('default', ['webpack'], function() {
    console.log(process.env.NODE_ENV);
    gulp.start('style','script')
})
