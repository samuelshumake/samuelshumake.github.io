var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function() {
    gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function(){
    gulp.src('src/js/custom.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
 });

gulp.task('watch',function() {
    gulp.watch(['src/scss/**/*.scss', 'src/js/*.js'], gulp.parallel('styles', 'scripts'));
});