var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var path = {
    scripts: ['./dev/*.js'],
    styles: ['./dev/*.scss']
};

gulp.task('script', function(){
    return gulp.src(path.scripts)
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(concat('ionicToast.min.js'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('style', function(){
    return gulp.src(path.styles)
            .pipe(concat('ionicToast.scss'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['script', 'style']);
gulp.task('default', ['build']);
