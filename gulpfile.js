var gulp = require('gulp');
//var uglify = require('gulp-uglify');
var less = require('gulp-less');
//var rename = require('gulp-rename');
var concat = require('gulp-concat');
//var templateCache = require('gulp-angular-templatecache');
//var htmlmin = require('gulp-htmlmin');
//var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var DEST = 'dist';

gulp.task('less', function() {
  return gulp.src('app/assets/less/main.less')
    .pipe(plumber(function(err) {
      // TODO: Add some error feedback
      this.emit('end');
    }))
    .pipe(less())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(notify('Less compiled!'));
});

gulp.task('js', function() {
  return gulp.src(['app/app.module.js', 'app/app.routes.js', 'app.models.js',
                   'app/shared/**/*.js', 'app/components/**/*.js'])
    .pipe(concat('app.js'))
    //.pipe(gulp.dest(DEST))
    //.pipe(uglify({mangle: false}))  // Consider using Google Closure Compiler instead
    //.pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(DEST));
});

//gulp.task('templates', function() {
//  return gulp.src(['app/shared/**/*.html', 'app/components/**/*.html'])
//    .pipe(templateCache())
//    .pipe(gulp.dest(DEST));
//});

//gulp.task('html', ['js', 'templates'], function() {
//  return gulp.src('app/index.html')
//    .pipe(inject(gulp.src(['dist/app.js', 'dist/templates.js'],
//                          {read: false}), {relateive: true}))
//    .pipe(gulp.dest(DEST))
//    .pipe(htmlmin({collapseWhitespace: true}))
//    .pipe(rename({extname: '.min.html'}))
//    .pipe(gulp.dest(DEST));
//});

gulp.task('bower', function() {
  return gulp.src('app/bower_components/**')
    .pipe(gulp.dest(DEST + '/bower_components'));
});

//gulp.task('libs', function() {
//  return gulp.src('app/libs/**')
//    .pipe(gulp.dest(DEST + '/libs'));
//});

//gulp.task('json', function() {
//  return gulp.src('app/**/*.json')
//    .pipe(gulp.dest(DEST));
//});

gulp.task('watch', function() {
  gulp.watch('app/assets/less/**/*.less', ['less']);
  //
  //  gulp.watch(['app/app.module.js', 'app/app.routes.js', 'app.models.js',
  //              'app/shared/**/*.js', 'app/components/**/*.js'],
  //              ['js']);
  //
  //  gulp.watch(['app/shared/**/*.html', 'app/components/**/*.html'],
  //             ['templates']);
  //
  //  gulp.watch('app/index.html', ['html']);
});

//gulp.task('default', ['bower', 'libs', 'less', 'js', 'templates', 'html']);
