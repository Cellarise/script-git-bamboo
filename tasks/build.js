/* jslint node: true */
"use strict";
var GulpDustCompileRender = require("gulp-dust-compile-render");
var fs = require('fs');
var rename = require("gulp-rename");

module.exports = function(gulp) {

    gulp.task('build', ['docs'], function() {
    });

    gulp.task("docs", function(cb){
        var dest = "";
        var context = JSON.parse(fs.readFileSync('package.json'));

        gulp.src(['doc_templates/**/*.dust.md'])
            .pipe(new GulpDustCompileRender(context))
            .pipe(rename(function (path) {
                path.basename = path.basename.replace('.dust','');
            }))
            .pipe(gulp.dest(dest))
            .on('end', cb);
    });

};
