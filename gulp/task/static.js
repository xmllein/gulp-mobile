import gulp from 'gulp';
gulp.task('favicon:dev', () => {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest('./dev'));
});

gulp.task('favicon:dist', () => {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest('./dist'));
});