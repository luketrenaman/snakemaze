var gulp = require('gulp');
var browserSync = require('browser-sync')
    .create();
var argv = require('yargs')
    .argv;
var webpack = require('gulp-webpack');
var ptype = argv.project != undefined ? argv.project : "javascript";
var cwd = argv.a != undefined ? argv.a : ""
cwd = cwd[cwd.length-1] != "/" ? cwd + "/":cwd;
gulp.task('browserSync', function() {
    browserSync.init({
        "server": {
            "baseDir": cwd
        },
        "ui":{
            "port":3000
        },
        "open": false,
        "notify": false
    });
});
gulp.task('webpack',function(){
    return gulp.src("")
    .pipe(webpack(require('./webpack.js')(cwd,ptype)))
    .pipe(gulp.dest(""))
    .pipe(browserSync.stream());
})

gulp.task('default',["browserSync"], function(callback) {
            browserSync.reload()
                gulp.watch(cwd + 'scripts/**/*',["webpack"])
                gulp.watch(cwd + '**/*.html', browserSync.reload); //reload
                gulp.watch(cwd + '**/*.css', browserSync.reload); //reload
                gulp.watch(cwd + '**/*.glsl', ["webpack"]); //reload
        // Other stoof
});
