const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const terser = require("gulp-terser");
const del = require("del");
const cheerio = require("gulp-cheerio");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(terser())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Optimize Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.svgo()

    ]))
    .pipe(gulp.dest("build/img"));
}

exports.optimizeImages = optimizeImages;

// Copy Images

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"));
}

exports.copyImages = copyImages;

const createWebP = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png}",
    "!source/img/icons/*.png"
  ])
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
}

exports.createWebP = createWebP;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/pic/*.svg")
  .pipe(cheerio({
    run: function ($) {
      $("[fill]").removeAttr("fill");
      $("[opacity]").removeAttr("opacity");
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(replace("&gt;", ">"))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build"));
}

exports.sprite = sprite;

// Copy Files

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico",
    "source/manifest.webmanifest"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const clean = (done) => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/script.js", gulp.series("scripts"))
  // gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/*.html", gulp.series("html", sync.reload));
}

// Build

exports.build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebP
  )
)

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebP
  ),
  gulp.series(
    server,
    watcher
  )
);

// exports.default = gulp.series(
//   styles, server, watcher
// );
