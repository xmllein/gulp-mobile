import gulp from 'gulp';
import tinypngFree from 'gulp-tinypng-free';
import md5 from 'gulp-md5-plus';
import image from 'gulp-image';
import svgSymbols from 'gulp-svg-symbols';


function img() {
  return gulp
    .src(['./src/static/images/**/*.{png,gif,svg,jpg,jpeg}', '!src/images/sprite/**/*'])
    .pipe(gulp.dest('./dev/images'))
}

gulp.task('img', img);

// 图片开发模式
gulp.task('img:dev', () => {

  gulp.watch('./src/static/images/*.{png,gif,svg,jpg,jpeg}', (event) => {
    return img(event.path)
      .pipe(global.browserSync.reload({
        stream: true
      }))
  });

  return img();
});

// gulp-tinypng-free 压缩处理 png,jpg,jpeg
function tinypng() { //png,jpg,jpeg
  return gulp
    .src('./dev/images/**/*.{png,jpg,jpeg}')
    .pipe(tinypngFree({
      force: false
    }))
    .pipe(gulp.dest('./cacheImage'))
}

gulp.task('tinypng', tinypng);


// gulp-image 压缩处理 gif svg
function OptimizeGifSvg() {
  return gulp
    .src('./dev/images/**/*.{svg,gif}')
    .pipe(image({
      svgo: true,
      gifsicle: true
    }))
    .pipe(gulp.dest('./cacheImage'))
}

gulp.task('OptimizeGifSvg', OptimizeGifSvg);

// svg 图片生成 雪碧图
gulp.task('svgsprites', function () {
  return gulp.src('./src/static/images/svg/**/*.svg')
    .pipe(svgSymbols({
      svgAttrs: {
        class: 'svg-icon-lib',
      },
      templates: [`default-svg`, `default-css`]
    }))
    .pipe(gulp.dest('./dev/images'))
});

//图片打包模式
gulp.task('img:dev2dist', () => {
  return gulp
    .src('./cacheImage/**/*.{png,gif,svg,jpg,jpeg}')
    .pipe(md5(6, ['./dist/*.html', './dist/css/**/*.css', './dist/js/**/*.js']))
    .pipe(gulp.dest('./dist/images'))

})

gulp.task('img:prod', gulp.series('img', 'tinypng', 'OptimizeGifSvg',
  'img:dev2dist'));