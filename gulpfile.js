/**
 * Created by niya on 15-01-30.
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var haml = require('gulp-haml');
var watch = require('gulp-watch');
var s3 = require("gulp-s3");
var fs = require('fs');

// Helper method
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

gulp.task('default', function() {
    gulp.task('scss', function() {
        return sass('src/styles/')
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(gulp.dest('dist/styles'));
    });
    gulp.task('haml', function() {
        gulp.src('./src/**/*.haml')
            .pipe(haml())
            .pipe(gulp.dest('./dist'))
    });

    gulp.task('default', function() {
        gulp.run('haml', 'scss');
        gulp.watch('./src/**/*.haml', ['haml']);
        gulp.watch('./src/styles/*.scss', ['scss']);
    });
});

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
