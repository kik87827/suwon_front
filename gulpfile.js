
var gulp = require("gulp"),
	fileinclude = require('gulp-file-include'),
	webserver = require('gulp-webserver'),
	connect = require('gulp-connect'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	scss = require('gulp-sass')(require('sass')),
	beautify = require('gulp-beautify'),
	htmlbeautify = require('gulp-html-beautify');

gulp.task('default', ['scss','fileinclude','beautify','watch','connect']);

gulp.task('scss', function () {
	gulp.src('./src/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(scss().on('error', scss.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('connect', function() {
	connect.server({
	  root: 'dist',
	  port: 8001,
	  livereload: true
	});
  });


gulp.task('beautify',function(){
	gulp.src('./src/**/*.js')
	.pipe(beautify.js({indent_size: 2}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('fileinclude',function(){
	gulp.src(['./src/**/*.html',"!./src/**/include/**"])
	.pipe(fileinclude({
		prefix : '@@',
		basepath : '@file'
	}).on('error', function(){ console.log('path error')}))
	// .pipe(removeEmptyLines())
	.pipe(htmlbeautify({indent_with_tabs : true}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('webserver',function(){
	gulp.src('./dist/')
	.pipe(webserver({
		livereload : true,
		open : true,
		port : 7474
	}));
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ["fileinclude"]);
	gulp.watch(['./src/**/*.scss'], ["scss"]);
	gulp.watch(['./src/**/*.js'], ["beautify"]);
});