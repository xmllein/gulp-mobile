import gulp from 'gulp';
import gulpLess from 'gulp-less';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import md5 from 'gulp-md5-plus';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import cdnify from 'gulp-cdnify';

import imgCachebust from 'gulp-css-img-cachebust';
import px2rem from "gulp-px4rem";
import config from '../config';


let devServer = false;

function less() {
  // let timestamp = +new Date();
  return gulp
    .src('./src/static/css/**/*.less')
    .pipe(gulpif(devServer, sourcemaps.init()))
    .pipe(gulpLess())
    .pipe(autoprefixer())
    .pipe(gulpif(devServer, sourcemaps.write()))
    // .pipe(changed('./dev/css'))
    .pipe(px2rem({
      baseDpr: 2, // base device pixel ratio (default: 2)
      threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
      remVersion: false, // whether to generate rem version (default: true)
      remUnit: 100, // rem unit value (default: 75)
      remPrecision: 6 // rem precision (default: 6)
    }))
    .pipe(gulp.dest('./dev/css'));
}

gulp.task('less', less)

gulp.task('less:dev', () => {
  devServer = true
  gulp.watch(['./src/static/css/**/*.less'], (event) => {
    return less(event.path).pipe(global.browserSync.reload({
      stream: true
    }));
  });
  return less();
});

gulp.task('less:dev2dist', () => {
  return gulp.src('./dev/css/less/**/*.css')
    .pipe(imgCachebust())
    .pipe(csso())
    .pipe(md5(6, ['./dist/**/*.html']))
    .pipe(cdnify({
      base: config.tasks.scss.cdnUrl,
      files: ['**/*.{gif,png,jpg,jpeg}']
    }))
    .pipe(gulp.dest('./dist/css/less'));
})

gulp.task('less:prod', gulp.series('less', 'less:dev2dist'));