const { gulp, src, dest, series, parallel, watch } = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
// const babel = require("gulp-babel");
const sourcemap = require("gulp-sourcemaps");
const htmllint = require("gulp-htmllint");
const imagemin = require("gulp-imagemin");

// HTML tasks
function minifyHtml() {
  return src("src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist/"));
}

function cpyHtml() {
  return src("src/index.html").pipe(htmllint()).pipe(dest("dist"));
}

// CSS tasks
function sassCompile() {
  return src("src/scss/*.scss")
    .pipe(sourcemap.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["last 2 version"],
        }),
      ])
    )
    .pipe(sourcemap.write())
    .pipe(dest("./dist"));
}

function sassCompileMinify() {
  return src("src/scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ["last 1 version"] })]))
    .pipe(dest("./dist"));
}

function jqueryJs() {
  return src("src/app.js").pipe(dest("dist"));
}
function jqueryJsMinify() {
  return src("src/app.js").pipe(uglify()).pipe(dest("dist"));
}

// Images and icons task
function imageMin() {
  return src("src/images/*").pipe(imagemin()).pipe(dest("dist/images"));
}

function cpyImages() {
  return src("src/images/*").pipe(dest("dist/images"));
}

// Clean Task
function cleandist() {
  return src("dist/*", { read: false }).pipe(clean());
}

// watch tasks
function watchHtml() {
  watch("src/index.html", cpyHtml);
}

function watchCss() {
  watch("src/scss/*.scss", sassCompile);
}

function watchJs() {
  watch("src/app.js", jqueryJs);
}

function watchImages() {
  watch("src/images/*", cpyImages);
}

// Tasks exports
exports.compilesass = sassCompile;
exports.minifysass = sassCompileMinify;
exports.copyImages = cpyImages;
exports.copyHtml = cpyHtml;
exports.cleandist = cleandist;
exports.minifyhtml = minifyHtml;
exports.minifyjs = jqueryJsMinify;
exports.imagemin = imageMin;

exports.debug = parallel(
  watchImages,
  watchHtml,
  watchCss,
  watchJs,
  watchImages
);

exports.release = series(
  cleandist,
  imageMin,
  minifyHtml,
  sassCompileMinify,
  jqueryJsMinify
);
