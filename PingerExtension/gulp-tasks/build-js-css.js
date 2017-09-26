var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var cssMinify = require('gulp-cssnano');

// Vendor jS and CSS *************************************************************************************
gulp.task('common-js', () => {
    return gulp.src([
            "src/scripts/config.js",
            "src/scripts/notificationutility.js",
            "src/scripts/localstorageutility.js",
            "src/scripts/settingsutility.js",
            "src/scripts/validationutility.js",
            "src/scripts/APIutility.js",
            "src/scripts/helperutility.js",
            "src/scripts/UIutility.js",
        ])
        .pipe(concat('common.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('background-js', () => {
    return gulp.src([
            "src/scripts/backgroundutility.js"
        ])
        .pipe(concat('background.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('mainscript-js', () => {
    return gulp.src([
            "src/scripts/mainscript.js"
        ])
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('main-css', () => {
    return gulp.src([
            'src/css/main.css'
        ])
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css/'))
});