import gulp from 'gulp'

gulp.task('dev',
  gulp.series(
    'clean:dev',
    gulp.parallel('html:dev', 'less:dev','scss:dev', 'js:dev'),
    'img:dev',
    'server'
  ))