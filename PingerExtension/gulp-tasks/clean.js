var gulp = require("gulp");
var clean = require('gulp-clean');

// Clean gulp build folders*********************************************************************

gulp.task('clean', function () {
    return gulp.src(['dist'], {
            read: false
        })
        .pipe(clean())
});