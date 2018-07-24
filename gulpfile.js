"use strict";

let gulp = require("gulp");
let imagemin = require("gulp-imagemin");
let sass = require("gulp-sass");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let server = require("browser-sync");
let mqpacker = require("css-mqpacker");
let minify = require("gulp-csso");
let rename = require("gulp-rename");
let svgstore = require("gulp-svgstore");
let svgmin = require("gulp-svgmin");
let run = require("run-sequence");
let del = require("del");

gulp.task("style", function(){
	gulp.src("scss/style.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 1 version",
				"last 2 Chrome versions",
				"last 2 Firefox versions",
				"last 2 Opera versions",
				"last 2 Edge versions"
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest("css"))
		//.pipe(minify())
		//.pipe(rename("style.min.css"))
		//.pipe(gulp.dest("css"))
		.pipe(server.reload({stream: true}));
});

gulp.task("minify", function () {
  gulp.src("scss/style.scss")
		.pipe(minify())
		.pipe(rename("style.min.css"))
  		.pipe(gulp.dest("build/css"))
});

gulp.task("images", function(){
	return gulp.src("build/images/*.{png,jpg,gif}")
		.pipe(imagemin([
			imagemin.optipng({optimizationlevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest("build/images"));
});

gulp.task("symbols", function(){
	return gulp.src("images/svg_true/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest("images"));
});

gulp.task("serve", function(){
	server.init({
		server: "."
	});
    gulp.watch("scss/style.scss", ["style"]);
    gulp.watch("scss/mixins.scss", ["style"]);
    gulp.watch("scss/blocks/*.scss", ["style"]);
	gulp.watch("*.html")
		.on("change", server.reload);
});

gulp.task("build", function(fn){
	run("clean", "copy", "minify", "images", "symbols", fn);
});

gulp.task("copy", function(){
	return gulp.src([
		"images/**",
		"*.html"
		], {
			base: "."
		})
		.pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
	return del("build");
});