const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./public/css'))
})

// for the browser-sync people
gulp.task('browserSync', () => {
  browserSync.init(['./public'], {
    server: {
      baseDir: './public'
    }
  })
})

// for the gulp-connect people
// const connect = require('gulp-connect')
gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./scss/**/*.scss', ['scss'])
})

gulp.task('default', ['scss', 'watch']);