var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var cssMinify = require('gulp-cssnano');
var replace = require('gulp-string-replace');

// Vendor jS and CSS *************************************************************************************
gulp.task('vendor-js', () => {
    return gulp.src([
            'src/scripts/lib/ga.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('vendorjs.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('vendor-css', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(replace('../fonts', 'fonts'))
        .pipe(concat('vendorcss.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css/'))
});