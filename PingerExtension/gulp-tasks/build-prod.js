var gulp = require("gulp");
var runSequence = require('run-sequence');

// Copy jS and CSS *************************************************************************************

gulp.task('copy-html', function () {
    return gulp.src('productionfiles/pinger.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-manifest', function () {
    return gulp.src('productionfiles/manifest.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-images', function () {
    return gulp.src('src/images/**')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('node_modules/bootstrap/dist/fonts/**')
        .pipe(gulp.dest('dist/css/fonts'));
});

// Default task *************************************************************************************

gulp.task('build-prod', function (done) {
    runSequence('clean', 'vendor-js', 'vendor-css', 'mainscript-js', 'background-js', 'common-js', 'main-css',
        'copy-html', 'copy-manifest', 'copy-images', 'copy-fonts', done);
});