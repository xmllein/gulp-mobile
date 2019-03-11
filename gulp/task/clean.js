import gulp from 'gulp';
import del from 'del';


gulp.task('clean:dev',  () => {
  return del('./dev');
})

gulp.task('clean:prod', () => {
  return del('./dist');
})

gulp.task('clean', gulp.parallel('clean:prod', 'clean:dev'));