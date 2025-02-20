const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

function styles(){

    return gulp.src([
        './node_modules/bootstrap/scss/bootstrap.scss', // Bootstrap SCSS
        './src/styles/*.scss' // Seus estilos personalizados
    ])
        .pipe(sass({ quietDeps: true }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
}
function scripts() {
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // Bootstrap JS
        './src/js/main.js' // Seus scripts personalizados
    ])
        .pipe(concat('scripts.js')) // Concatena os arquivos em um único arquivo
        .pipe(gulp.dest('./dist/js')); // Salva o arquivo na pasta de destino
}
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

exports.default = gulp.parallel(styles, images, scripts);

exports.watch = function (){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/js/*.js', gulp.parallel(scripts));
}