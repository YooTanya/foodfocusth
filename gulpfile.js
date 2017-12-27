var gulp = require('gulp'),
  connect = require('gulp-connect'),
  copy = require('gulp-contrib-copy'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  csslint = require('gulp-csslint'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  concat = require("gulp-concat");

var config = {
  views: 'app/views/',
  components: 'app/views/components',
  /*componentTemplates: 'app/views/component-templates',*/
  styles: 'app/styles/',
  scripts: 'app/scripts/',
  assets: 'app/assets/',
  build: 'static/'
};

// build jade

gulp.task('jade', function(){
  gulp.src(config.views + '/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.build));

  gulp.src(config.components + '/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.build + '/components/'))/*;

  gulp.src(config.componentTemplates + '/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.build + '/component-templates/'))*/
});

// build connect
gulp.task('connect', function(){
  connect.server({
    root: config.build,
    livereload: true,
    port: 3000
  });
});

// concat js libs
gulp.task('js:libs', function() {
  return gulp.src([
    config.scripts +'libs/jquery-2.1.4.js',
    config.scripts +'libs/jquery-ui.min.js',
    config.scripts +'libs/jquery.ui.touch-punch.min.js',
    config.scripts +'libs/handlebars-v4.0.5.js',
    config.scripts +'libs/gmap3.min.js',
    config.scripts +'libs/inputmask.js',
    config.scripts +'libs/inputmask.extensions.js',
    config.scripts +'libs/inputmask.date.extensions.js',
    config.scripts +'libs/jquery.inputmask.js',
    config.scripts +'libs/plugins/*.js'])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(config.build + '/js'));
});

// concat js script
gulp.task('js:script', function() {
  return gulp.src([config.scripts +'site.js', config.scripts +'plugins/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest(config.build + '/js'));
});

// concat moderniz
gulp.task('js:moderniz', function(){
  return gulp.src([config.scripts +'/libs/modernizr.2.8.3.js', config.scripts +'/libs/detectizr.js'])
    .pipe(concat('modernizr.js'))
    .pipe(gulp.dest(config.build + '/js'))
});

// js hint
gulp.task('js:lint', function() {
  return gulp.src([config.scripts +'site.js', config.scripts +'l10n.js', config.scripts +'plugins/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// copy fonts
gulp.task('fonts', function(){
  return gulp.src(config.assets + '/fonts/**')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/fonts'))
});

// copy image
gulp.task('image', function(){
  return gulp.src(config.assets + '/images/**')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/images'))
});

// copy favicon
gulp.task('favicon', function(){
  return gulp.src(config.assets + '/icons/**')
    .pipe(copy())
    .pipe(gulp.dest(config.build))
});

// copy data
gulp.task('data', function(){
  return gulp.src(config.views + '/data/**')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/data'))
});

// copy components
/*gulp.task('components', function(){
  return gulp.src(config.views + '/components/*.html')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/components'))
});
*/
// copy component templates
/*gulp.task('componentTemplates', function(){
  return gulp.src(config.views + '/component-templates/*.html')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/component-templates'))
});*/

// copy l10n
gulp.task('l10n', function(){
  return gulp.src(config.scripts +'l10n.js')
    .pipe(copy())
    .pipe(gulp.dest(config.build + '/js'))
});

// css
gulp.task('less:styles', function () {
  return gulp.src(config.styles + '/style.less')
    .pipe(less())
    .pipe(gulp.dest(config.build + '/css'));
});
gulp.task('less:libs', function () {
  return gulp.src(config.styles + '/libs/libs.less')
    .pipe(less())
    .pipe(gulp.dest(config.build + '/css'));
});

gulp.task('csslint', function() {
  gulp.src(config.build + '/css/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter());
});

// watch
gulp.task('watch', function(){

  gulp.watch(config.styles + '/**/*.less', ['css']);
  gulp.watch(config.scripts + '/**/*.js', ['js:script']);
});


//concat
gulp.task('concat', ['js:lint', 'js:script', 'js:libs','l10n']);
// css
gulp.task('css', ['less:libs', 'less:styles', 'csslint']);
// copy
gulp.task('copy', ['js:moderniz', 'fonts', 'image', 'favicon', 'data']);
// default
gulp.task('default', ['jade', 'copy', 'concat', 'css', 'connect', 'watch']);