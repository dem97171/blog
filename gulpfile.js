"use strict";

const gulp = require("gulp");
// const plumber = require("gulp-plumber");
// const concat = require("gulp-concat");
// const autoprefixer = require("gulp-autoprefixer");
// const rename = require("gulp-rename");
// const htmlEscape = require('gulp-html-escape');
const browser = require("browser-sync").create();  //live reload
// const uglifycss = require('gulp-uglifycss');


const srcDirScss = 'src/style/scss/src';
const compileDirScss = 'src/style/scss/compile';
const dstDirCss = 'src/skin';

gulp.task("compile", ["sanitize"], () => {
    gulp.src("./src/entrypoint.swig")
        .pipe( swig() )
        .pipe( rename("theme.xhtml") )
        .pipe( gulp.dest("./") );
});

gulp.task("sanitize", () => {
    return gulp.src("./src/sanitize/src/*")
        .pipe(htmlEscape())
        .pipe( gulp.dest("./src/sanitize/dest/") )
});

gulp.task('scssConcat', () => {
    return gulp.src([
        // srcDirScss + '/*scss',
        srcDirScss + '/vendor/*css',
        srcDirScss + '/setting/*scss',
        srcDirScss + '/tool/*scss',
        srcDirScss + '/base/*scss',
        srcDirScss + '/layout/*scss',
        srcDirScss + '/module/*scss',
        srcDirScss + '/state/*scss',
        srcDirScss + '/theme/*scss'
    ])
    .pipe( plumber() )
    .pipe( concat('style.scss') )
    .pipe( gulp.dest( compileDirScss ) );
});

gulp.task('sass', ['scssConcat'], () => {
    return gulp.src(compileDirScss + "/*.scss")
        // .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(dstDirCss))
        .pipe(uglifycss({
            "uglyComments": false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(dstDirCss))
});

// browser sync
gulp.task("server", () => {
    browser.init(null,{
        proxy: {
            target: "http://127.0.0.1"
        },
        open: false
    });
});

gulp.task("watch", function() {
    // var jstargets = [
    //     srcDirJs + '/*.js',
    //     srcDirJs + '/**/*.js',
    //     srcDirJs + '/**/**/*.js'
    // ];
    // gulp.watch(jstargets, ["mithrilCompile"]);

    var csstargets = [
        srcDirScss + '/**/*.scss'
    ];
    gulp.watch(csstargets, ["sass"]);
});
