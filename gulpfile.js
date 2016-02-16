var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var haml = require('gulp-haml');
var watch = require('gulp-watch');
var s3 = require("gulp-s3");
var del = require('del');
var fs = require('fs');

// Helper method
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

gulp.task('clean', function () {
  return del('dist/**/*');
});



gulp.task('haml', ['clean'], function() {
  debugger;
    gulp.src('./src/**/*.haml')
        .pipe(haml())
        .pipe(gulp.dest('./dist'))
});

gulp.task('scss', ['clean'], function() {
  return sass('src/assets/styles/')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('copy_other', ['clean'], function() {
  gulp.src([
    './src/**/*',
    '!./src/**/*.scss',
    '!./src/**/*.haml'
  ]).pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['clean'], function() {
  gulp.watch('./src/**/*', 'build');
});


gulp.task('build', ['haml', 'scss', 'copy_other']);
gulp.task('default', ['clean', 'build', 'watch']);

gulp.task("deploy", function() {
  var aws_path = "./aws.json";
  if (!fileExists(aws_path)) {
    console.log("File does not exist at " + aws_path);
    process.exit(1);
  }
  var aws = JSON.parse(fs.readFileSync(aws_path));
  gulp.src('./dist/**')
    .pipe(s3(aws));
});
