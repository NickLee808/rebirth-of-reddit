/*jshint esversion:6*/

const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
  .pipe(scss())
  .pipe(gulp.dest('./public/css'));
});