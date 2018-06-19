// 引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var sequence = require('gulp-sequence');
// 引入内置模块
var url = require('url');
var fs = require('fs');
var path = require('path');
// 引入json
var json = require('./data/data.json');

// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(json));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
});

// gulp.task('watch', function() {
//     gulp.watch('src/sass/*.scss', [])
// })

// sass编译 压缩 打包
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('build/css'))
});

// // js压缩 打包
gulp.task('uglify', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});
gulp.task('copyJs', function() {
    return gulp.src(['src/js/main.js', 'src/js/**/*.js', 'src/js/app/*.js'])
        .pipe(gulp.dest('build/js'))
});

// // html
gulp.task('htmlmin', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('build'))
});

gulp.task('build', function(cb) {
    sequence('sass', 'uglify', 'copyJs', 'htmlmin', cb);
})