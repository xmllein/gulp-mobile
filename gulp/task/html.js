import gulp from 'gulp';
import minifyHtml from 'gulp-minify-html';
import fileinclude from 'gulp-ex-file-include';
import changed from 'gulp-changed';
import cachebust from 'gulp-cache-hyper-bust';
import cdnify from 'gulp-cdnify';
import gulpRemoveHtml from 'gulp-remove-html';

import config from '../config';



function html() {
  return gulp
    .src('./src/html/**/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file', //引用文件路径
      indent: true //保留文件的缩进
    }))
    // .pipe(changed('./dev'))
    .pipe(gulp.dest('./dev'))
}

gulp.task('html', html);

gulp.task('html:dev', () => {

  gulp.watch('./src/html/**/*.html', (event) =>{
    return html(event.path)
      .pipe(global.browserSync.reload({
        stream: true
      }))
  });

  return html();
});

gulp.task('html:dev2dist', () => {
  return gulp
    .src(['./dev/**/*.html','!./dev/common/**/*.html'])
    .pipe(cachebust({
      images: true,
      showLog: true,
      type: 'timestamp'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(minifyHtml(config.tasks.html.htmlmin))
    .pipe(cdnify({
      base: config.tasks.html.cdnUrl
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('html:prod', gulp.series('html', 'html:dev2dist'));