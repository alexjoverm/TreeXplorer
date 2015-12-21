/**
 * Created by alejandrojovermorales on 28/03/15.
 */
var gulp   = require('gulp'),
os         = require('os'),
connect    = require('gulp-connect'),
watch      = require('gulp-watch'),
open       = require('gulp-open'),
compass    = require('gulp-compass'),
browserify = require('browserify'),
watchify   = require('watchify'),
source     = require('vinyl-source-stream'),
notify     = require("gulp-notify"),
debug = require('gulp-debug'),
gutil = require('gulp-util');


// HELPER vars and fuctions

var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));

var scriptsDir = './js';
var buildDir = './build';

function buildScript(file, watch) {
    var props = {entries: [scriptsDir + '/' + file], debug: true};
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest(buildDir + '/'))
            .pipe(connect.reload());
    }

    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title  : "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}


// GULP tasks

gulp.task('webserver', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('open', function () {
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:8080'}));
});

function runCompass(){
    gulp.src('./sass/*.scss')
        .pipe(debug())
        .pipe(compass({css: './css'}))
        .pipe(gulp.dest('./css'));
}

gulp.task('compass', runCompass);

gulp.task('watchify', function(){
    return buildScript('app.js', true);
});

gulp.task('watch', function () {
    watch(['./*.html', './js/*.js', './lib/*.js']).pipe(connect.reload());
    watch('./sass/**/*.scss', runCompass);
});

gulp.task('default', ['webserver', 'compass', 'open', 'watchify', 'watch']);