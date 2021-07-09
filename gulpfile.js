const gulp = require('gulp'),
      sass = require('gulp-sass')(require('sass')),
      fileinclude = require('gulp-file-include'),
      browserSync = require('browser-sync');
      replace = require('gulp-replace');

gulp.task('copy:icons', function() {
        return gulp.src('./src/assets/icons/*')
        .pipe(gulp.dest('./dist/assets/icons'))
      });
      gulp.task('copy:images', function() {
        return gulp.src('./src/assets/img/*')
        .pipe(gulp.dest('./dist/assets/img'))
      });

gulp.task('sass', function(){
    return gulp.src("./src/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
gulp.task('fileinclude', function() {
    return gulp.src('./src/pages/homepage/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});
/*gulp.task('fileinclude', function() {
    return gulp.src('./src/pages/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});*/

gulp.task("watch", function(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            // replace current page
            index: "index.html"
        }
        
    })
    
    gulp.watch("./src/assets/scss/**/*.scss", gulp.series('sass'));
    //gulp.watch("./src/pages/*.html").on('change', gulp.series('fileinclude'));
    gulp.watch("./src/pages/**/*.html").on('change', gulp.series('fileinclude'));
    gulp.watch('./src/pages/homepage/index.html').on('change', browserSync.reload);
    //gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
    //gulp.watch('./assets/styles/menu.css').on('change', browserSync.reload);
    //gulp.watch('./assets/styles/mobile.css').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['sass', 'fileinclude', 'copy:images', 'copy:icons', 'watch']));