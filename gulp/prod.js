import gulp from 'gulp';

gulp.task('prod',
  gulp.series(
    'clean',
    'html:prod',
    gulp.parallel('less:prod','scss:prod', 'js:prod', 'favicon:dist'),
    'img:prod'
  ))