var gulp = require('gulp');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var clean = require('gulp-clean');
//var templateCache = require('gulp-angular-templatecache');
//var htmlmin = require('gulp-htmlmin');

var DEST = 'dist/';

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

gulp.task('bower', function() {
  return gulp.src('app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/'))
    .pipe(notify('Bower dependencies injected!'));
});

gulp.task('clean', function() {
  return gulp.src(DEST, {read: false})
    .pipe(clean())
    .pipe(notify('Destination folder cleared!'));
});

gulp.task('build-assets', ['bower', 'less'], function() {
  return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify({mangle: false})))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest(DEST))
      .pipe(notify('Assets builded!'));
});

gulp.task('copy-images', function() {
  return gulp.src('app/assets/img/**/*', {base: 'app'})
    .pipe(gulp.dest(DEST))
    .pipe(notify('Images copied!'));
});

gulp.task('copy-templates', function() {
  return gulp.src(['app/components/**/*.html', 'app/shared/**/*.html'],
                  {base: 'app'})
    .pipe(gulp.dest(DEST))
    .pipe(notify('Templates copied!'));
});

gulp.task('copy-JSON', function() {
  return gulp.src(['app/components/**/*.json', 'app/shared/**/*.json'],
                   {base: 'app'})
    .pipe(gulp.dest(DEST))
    .pipe(notify('JSON files copied!'));
});

gulp.task('build-copy', function(cb) {
  return runSequence('copy-images', 'copy-templates', 'copy-JSON', cb);
});

gulp.task('build', function(cb) {
  return runSequence('clean', 'build-copy', 'build-assets', cb);
});

gulp.task('watch', function() {
  gulp.watch('app/assets/less/**/*.less', ['less']);
  gulp.watch('bower.json', ['bower']);
});

//gulp.task('js', function() {
//  return gulp.src(['app/app.module.js', 'app/app.routes.js', 'app.models.js',
//                   'app/shared/**/*.js', 'app/components/**/*.js'])
//    .pipe(concat('app.js'))
//    //.pipe(gulp.dest(DEST))
//    //.pipe(uglify({mangle: false}))  // Consider using Google Closure Compiler instead
//    //.pipe(rename({extname: '.min.js'}))
//    .pipe(gulp.dest(DEST));
//});

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

//gulp.task('bower', function() {
//  return gulp.src('app/bower_components/**')
//    .pipe(gulp.dest(DEST + 'bower_components/'));
//});

//gulp.task('libs', function() {
//  return gulp.src('app/libs/**')
//    .pipe(gulp.dest(DEST + '/libs'));
//});

//gulp.task('json', function() {
//  return gulp.src('app/**/*.json')
//    .pipe(gulp.dest(DEST));
//});
