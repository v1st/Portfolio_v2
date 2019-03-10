const gulp = require('gulp');
const sass = require('gulp-sass');

function styles() {
  return (gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css')));
}

function watch() {
  gulp.watch('src/scss/**/*.scss', styles);
}

exports.watch = watch;
