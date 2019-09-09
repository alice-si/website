const gulp = require('gulp'),
      gulpDel = require('del'),
      sass = require('gulp-sass'),
      cwebp = require('gulp-cwebp'),
      uglify = require('gulp-uglify'),
      gulpWebp = require('gulp-webp'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename'),
      plumber = require('gulp-plumber'),
      postcss = require('gulp-postcss'),
      posthtml = require('gulp-posthtml'),
      imagemin = require('gulp-imagemin'),
      svgstore = require('gulp-svgstore'),
      cleancss = require('gulp-clean-css'),
      include = require('posthtml-include'),
      concatination = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      browsersync = require('browser-sync').create(),
      purgecss = require('gulp-purgecss'),
      htmlmin = require('gulp-htmlmin'),
      mediaQueries = require('gulp-group-css-media-queries');

//----------------------copy/del------------------------

function copy() {
  return gulp.src([
    'source/**/fonts/**/*.{woff,woff2}',
    'source/**/*.html',
    'source/**/css/**/*.css',
    'source/**/img/**/*.{jpg,png,gif}',
    'source/**/js/**/*.js',
    'source/**/svg/**/*.svg'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
};

function del() {
  return gulpDel('build')
};

//-------------------------style------------------------

function style() {
  return gulp.src('./source/sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    /*  - // Popup Windows Notifications
    .pipe(sass().on('error', notify.onError({
      message: "<%= error.message %>",
      title : "Sass Error!"
    })))
    */
    .pipe(gulp.dest('./build/css'))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browsersync.stream());
};

//--------------------PRODUCTION---------------

function prod() {
  return gulp.src(['./build/css/*.css', '!./build/css/lib/*.css'])
    .pipe(
       purgecss({
         content: ['build/*.html']
       })
    )
    .pipe(mediaQueries())
    .pipe(autoprefixer({cascade: true}))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    //.pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(gulp.dest('./build/css/prod'))
};

function preprod() {
  return gulp.src(['./build/css/*.css', '!./build/css/lib/*.css'])
    .pipe(
       purgecss({
         content: ['build/*.html']
       })
    )
    .pipe(mediaQueries())
    .pipe(autoprefixer({cascade: true}))
    //.pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(gulp.dest('./build/css/preprod'))
};


//-----------------------autoprefix-----------------------

function autopref() {
  return gulp.src('./source/css/*.css')
    .pipe(autoprefixer({cascade: true}))
    .pipe(gulp.dest('./build/css/'))
};

//------------------------uglify-js-----------------------

function ugly() {
  return gulp.src('./source/js/**/*.js')
    .pipe(gulp.dest('./build/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(gulp.dest('./build/js/'))
};

function htmlminify() {
  return gulp.src('./source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    //.pipe(uglify())
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(gulp.dest('./build/'))
};

//------------------------concat-js-----------------------

function concat() {
  return gulp.src('./source/js/**/*.js')
    .pipe(concatination())
    .pipe(rename({ suffix: '.concat', prefix : '' }))
    .pipe(gulp.dest('./build/js/'))
};

//-----------------------imagemin-------------------------

function imagerastr() {
  return gulp.src('./source/img/**/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
    ]))
  .pipe(gulp.dest('./build/img/'))
};

function image() {
  imagerastr()
  return gulp.src('./source/svg/**/*')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: true},
          {removeDimensions: false},
        ]
      })
    ]))
  .pipe(gulp.dest('./build/svg/'))
};

function svgo() {
  return gulp.src('./source/svg/**/*')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {addAttributesToSVGElement: {attribute: 'preserveAspectRatio="xMinYMid"'}},
          {removeAttrs: {attrs: 'preserveAspectRatio'}}, // remove (fix) ^^^ duplet
          {removeViewBox: false},
          {cleanupIDs: true},
          {removeDimensions: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/svg/'))
};

// ------------------------------------------------------

// function image() {
//   return gulp.src('./source/img/**/*.{jpg,png,gif}')
//     .pipe(imagemin([
//       imagemin.gifsicle({interlaced: true}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.svgo({
//         plugins: [
//             {removeViewBox: true},
//             {cleanupIDs: false}
//         ]
//       })
//     ]))

//     .pipe(gulp.dest('./build/img/'))
// };

//--------------------------webp-------------------------

function webp() {
  return gulp.src('./source/img/**/*.{png,jpg,jpeg}')
    .pipe(gulpWebp({quality: 80}))
    .pipe(gulp.dest('./build/img/'))
};

//------------------------SVG-Store----------------------

function svgsprite() {
  return gulp.src('./source/svg/icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))

  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('./build/svg/sprite/'))
}

//---------------------post-html-include-----------------

function html() {
  return gulp.src('./source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'))
}

//---------------------------watch-----------------------

function watch() {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
      port: 3000,
      notify: false
  });
  gulp.watch('./source/sass/**/*.scss', style);
  gulp.watch('./source/*.html').on('change', gulp.series(html, browsersync.reload));
  gulp.watch('./source/js/**/*.js').on('change', gulp.series(ugly, browsersync.reload));
  gulp.watch('./source/svg/**/*.svg').on('change', gulp.series(svgo, browsersync.reload));
};

//                          //--------------//                      //
//-------------------------//--Gulp tasks--//-----------------------//
//                        //--------------//                        //

exports.copy = copy;
exports.style = style;
exports.del = del;
exports.autopref = autopref;
exports.ugly = ugly;
exports.concat = concat;
exports.preprod = preprod;
exports.prod = prod;
exports.htmlminify = htmlminify;
exports.imagerastr = imagerastr;
exports.image = image;
exports.svgo = svgo;
exports.webp = webp;
exports.svg = svgsprite;
exports.html = html;
exports.watch = watch;

exports.build = gulp.series(copy, style, prod, image);