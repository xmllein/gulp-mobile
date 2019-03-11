import gulp from 'gulp';
import path from 'path';
import express from 'express';
import compress from 'compression';
const browserSync = require('browser-sync').create();


global.browserSync = browserSync;

const projectRoot = path.resolve(__dirname, '../../');

gulp.task('server',  () => {

  //mock基于fis-team的yog-devtools
  const app = express()
    .use(compress())
    .use(require('yog-devtools')({
      view_path: '', // 避免报错。
      rewrite_file: [path.join(projectRoot, './mock', 'server.conf')],
      data_path: [path.join(projectRoot, './mock')]
    }));
  
  browserSync.init({
    server: "./dev",
    middleware: [app]
  });

});