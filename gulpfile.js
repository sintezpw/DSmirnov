'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var browserSync = require('browser-sync');
var server = require("browser-sync").create();
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var webp = require('gulp-webp');
var runSequinces = require('run-sequence');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('build', function(done){
    run(
        'style', 'normalize', 'sprite', 'html' 
    );
});

gulp.task('sass', function(){
  return gulp.src('style.scss')
   .pipe(sass())
   .pipe(gulp.dest('style.css'))
   .pipe(browserSync.stream());
});

gulp.task('sass:watch', function(){
    gulp.watch('./sass/style.scss', ['sass']);
});

gulp.task('style', function(){
    gulp.src('sass/style/.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('normalize', function(){
    gulp.src('sass/normalize.scss')
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest('build.css'))
    .pipe(minify())
    .pipe(rename('style/normalize.min.css'))
    .pipe(gulp('build.css'));
});

gulp.watch('sass/**/*.scss', [style]);
gulp.watch('img/*.svg', [svgUpdate]).on('change', server.reload);
gulp.watch('*.html', ['html']).on('change', server.reload);
gulp.watch('js/*.js', ['js-watch']);

gulp.task('sprite', function() {
    return gulp.src('img/*.svg')
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(build/img));
});

gulp.task('svgUpdate', function(done){
    run('sprite', 'html', done);
});

gulp.task('html', function(){
    return gulp.src('*.html')
    .pipe(posthtml([
        include()
    ]))
    .pipe(gulp.dest('build'));

});
galp.task('browser-sync', function(){
    browserSync.init({
        proxy: yourlocal.dev

    });
});
gulp.task('serve', function(){
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
});
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./style"
    });

});
gulp.task('js', function(){
    return gulp.src('js/*.js')
    .pipe(browserserfy())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('js-watch', [js], function(done){
    browserSync.reload();
    done();
});
gulp.task('default', [js], function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});