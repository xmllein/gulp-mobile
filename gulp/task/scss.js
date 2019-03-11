import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import md5 from 'gulp-md5-plus';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import cdnify from 'gulp-cdnify';

import imgCachebust from 'gulp-css-img-cachebust';
import px2rem from "gulp-px4rem";
import config from '../config';


let devServer = false;

function scss() {
  let timestamp = +new Date();
  return gulp
    .src('./src/static/css/**/*.scss')
    .pipe(gulpif(devServer, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(devServer, sourcemaps.write()))
    .pipe(changed('./dev/css'))
    .pipe(px2rem({
      baseDpr: 2, // base device pixel ratio (default: 2)
      threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
      remVersion: false, // whether to generate rem version (default: true)
      remUnit: 100, // rem unit value (default: 75)
      remPrecision: 6 // rem precision (default: 6)
    }))
    .pipe(gulp.dest('./dev/css'));
}

gulp.task('scss', scss)

gulp.task('scss:dev', () => {
  devServer = true
  gulp.watch(['./src/static/css/*.scss'], (event) => {
    return scss(event.path).pipe(global.browserSync.reload({
      stream: true
    }));
  });
  return scss();
});

gulp.task('scss:dev2dist', () => {
  return gulp.src('./dev/css/*.css')
    .pipe(imgCachebust())
    .pipe(cleanCSS())
    .pipe(md5(6, ['./dist/*.html']))
    .pipe(cdnify({
      base: config.tasks.scss.cdnUrl,
      files: ['**/*.{gif,png,jpg,jpeg}']
    }))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('scss:prod', gulp.series('scss', 'scss:dev2dist'));