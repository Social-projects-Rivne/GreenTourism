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
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
//var templateCache = require('gulp-angular-templatecache');

var DEST = 'dist/';  // Destination folder

// Compile less files
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

// Add bower deps to index.html
gulp.task('bower', function() {
  return gulp.src('app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/'))
    .pipe(notify('Bower dependencies injected!'));
});

// Clean destinaton folder
gulp.task('clean', function() {
  return gulp.src(DEST, {read: false})
    .pipe(clean())
    .pipe(notify('Destination folder cleared!'));
});

// Build index.html, css, js
gulp.task('build-assets', ['bower', 'less'], function() {
  return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify({mangle: false}))) // Consider using Google Closure Compiler instead
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest(DEST))
      .pipe(notify('Assets builded!'));
});

// Copy all images and minify them
gulp.task('copy-images', function() {
  return gulp.src('app/assets/img/**/*', {base: 'app'})
    .pipe(imagemin())
    .pipe(gulp.dest(DEST))
    .pipe(notify('Images copied!'));
});

// Copy all angular templates and minify them
gulp.task('copy-templates', function() {
  return gulp.src(['app/components/**/*.html', 'app/shared/**/*.html'],
                  {base: 'app'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST))
    .pipe(notify('Templates copied!'));
});

// Copy all JSON fixtures
gulp.task('copy-JSON', function() {
  return gulp.src(['app/components/**/*.json', 'app/shared/**/*.json'],
                   {base: 'app'})
    .pipe(gulp.dest(DEST))
    .pipe(notify('JSON files copied!'));
});

// Copy all fonts and icons
gulp.task('copy-fonts', function() {
  return gulp.src(['app/bower_components/bootstrap/dist/fonts/*',
                   'app/bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest(DEST + 'fonts/'))
    .pipe(notify('Fonts and icons copied!'));
});

// Copy all necessary files
gulp.task('build-copy', function(cb) {
  return runSequence('copy-images', 'copy-templates', 'copy-JSON',
                     'copy-fonts', cb);
});

// Build project
gulp.task('build', function(cb) {
  return runSequence('clean', 'build-copy', 'build-assets', cb);
});

// Automatically recompile less and index.html
gulp.task('watch', function() {
  gulp.watch('app/assets/less/**/*.less', ['less']);
  gulp.watch('bower.json', ['bower']);
});
