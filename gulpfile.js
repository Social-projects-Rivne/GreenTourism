var gulp = require('gulp');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var clean = require('gulp-clean');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');

// Code quality
var beautify = require('gulp-beautify');
var csscomb = require('gulp-csscomb');
var eslint = require('gulp-eslint');

// Minification
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
// var templateCache = require('gulp-angular-templatecache');

var DEST = 'dist/';  // Destination folder

var IGNORE = [
  '!./node_modules/**',
  '!./client/bower_components/**',
  '!./gulpfile.js'
];

var HTML_PATH = IGNORE.concat([
  './**/*.html'
]);

var CSS_PATH = IGNORE.concat([
  './**/*.css',
  './**/*.less'
]);

var JAVASCRIPT_PATH = IGNORE.concat([
  './**/*.js'
]);

// Error notification
var onError = function(err) {
  notify.onError({
    message: 'Error: <%= error.message %>'
  })(err);

  this.emit('end');
};

// Check if linter fixed problems
function isFixed(file) {
  return file.eslint !== null && file.eslint.fixed;
}

// Lint files with ESLint
gulp.task('lint', function() {
  return gulp.src(JAVASCRIPT_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(notify({message: 'Linting done!', onLast: true}));
});

// Fix linting errors if possible
gulp.task('lint-fix', function() {
  return gulp.src(JAVASCRIPT_PATH)
    .pipe(eslint({fix: true, rules: {'spaced-comment': 0}}))
    .pipe(gulpif(isFixed, gulp.dest('./')))
    .pipe(notify({message: 'Possible lint errors fixed!', onLast: true}));
});

// Beautify javascript files
gulp.task('js-beautify', function() {
  return gulp.src(JAVASCRIPT_PATH)
    .pipe(beautify())
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'Javascript beautification done!', onLast: true}));
});

// Beautify html files
gulp.task('html-beautify', function() {
  return gulp.src(HTML_PATH)
    .pipe(beautify())
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'HTML beautification done!', onLast: true}));
});

// Beautify css files
gulp.task('css-beautify', function() {
  return gulp.src(CSS_PATH)
    .pipe(csscomb())
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'CSS beautification done!', onLast: true}));
});

// Add AngularJS dependency injection annotations
gulp.task('ng-annotate', function() {
  return gulp.src(JAVASCRIPT_PATH)
    .pipe(ngAnnotate({single_quotes: true})) // eslint-disable-line camelcase
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'Angular files annotated!', onLast: true}));
});

// Compile less files
gulp.task('less', function() {
  return gulp.src('client/assets/less/main.less')
    .pipe(plumber({errorHandler: onError}))
    .pipe(less())
    .pipe(gulp.dest('client/assets/css'))
    .pipe(notify('Less compiled!'));
});

// Add bower deps to index.ejs
gulp.task('bower', function() {
  return gulp.src('client/index.ejs')
    .pipe(plumber({errorHandler: onError}))
    .pipe(wiredep())
    .pipe(gulp.dest('client/'))
    .pipe(notify('Bower dependencies injected!'));
});

// Clean destinaton folder
gulp.task('clean', function() {
  return gulp.src(DEST, {read: false})
    .pipe(clean())
    .pipe(notify('Destination folder deleted!'));
});

// Build index.html, css, js
gulp.task('build-assets', ['bower', 'less'], function() {
  return gulp.src('client/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', ngAnnotate()))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', autoprefixer({browsers: ['last 2 versions'],
                                          cascade: false})))
      .pipe(gulpif('*.css', cleanCSS({keepSpecialComments: 0})))
      .pipe(gulp.dest(DEST))
      .pipe(notify({message: 'Assets builded!', onLast: true}));
});

// Copy all images and minify them
gulp.task('copy-images', function() {
  return gulp.src('client/assets/img/**/*', {base: 'client'})
    .pipe(imagemin())
    .pipe(gulp.dest(DEST))
    .pipe(notify({message: 'Images copied!', onLast: true}));
});

// Copy all angular templates and minify them
gulp.task('copy-templates', function() {
  return gulp.src(['client/components/**/*.html', 'client/shared/**/*.html'],
                  {base: 'client'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST))
    .pipe(notify({message: 'Templates copied!', onLast: true}));
});

// Copy all JSON fixtures
gulp.task('copy-JSON', function() {
  return gulp.src(['client/components/**/*.json', 'client/shared/**/*.json'],
                   {base: 'client'})
    .pipe(gulp.dest(DEST))
    .pipe(notify({message: 'JSON files copied!', onLast: true}));
});

// Copy all fonts and icons
gulp.task('copy-fonts', function() {
  return gulp.src(['client/bower_components/bootstrap/dist/fonts/*',
                   'client/bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest(DEST + 'fonts/'))
    .pipe(notify({message: 'Fonts and icons copied!', onLast: true}));
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
  gulp.watch('client/assets/less/**/*.less', ['less']);
  gulp.watch('bower.json', ['bower']);
});
