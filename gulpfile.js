'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('dist_src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  gulp.src('dist_src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "dist"
    });

    gulp.watch('dist_src/sass/**/*.scss', ['sass']);
    gulp.watch('dist_src/jade/**/*.jade', ['jade']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'jade', 'serve']);

// preview
// beauty
