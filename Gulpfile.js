'use strict';

const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const nodemon = require('gulp-nodemon');
const changed = require('gulp-changed');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

const plugins = [
    ['css-in-js', {
        vendorPrefixes: true,
        bundleFile: 'dist/assets/bundle.css'
    }],
    './build/babelRelayPlugin'
];

let inst = browserify(Object.assign({}, watchify.args, {
    entries: './src/client.js',
    debug: true
}))
    .transform(babelify, {
        presets: ['es2015', 'stage-0', 'react'],
        plugins
    });

function bundle() {
    return inst.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

gulp.task('client', bundle);

gulp.task('watch', () => {
    inst = watchify(inst, {
        delay: 100,
        ignoreWatch: ['**/node_modules/**']
    });

    inst.on('update', bundle);
    inst.on('log', gutil.log);
});

gulp.task('babel', () =>
    gulp.src(['src/**/*.js', '!src/client.js'])
        .pipe(changed('./dist/'))
        .pipe(babel({
            presets: ['stage-0', 'react'],
            plugins: [
                'transform-es2015-destructuring',
                'transform-es2015-modules-commonjs',
                'transform-es2015-parameters',
                'transform-es2015-unicode-regex'
            ].concat(plugins)
        }))
        .pipe(gulp.dest('./dist/'))
);

gulp.task('server', ['babel'], () => {
    nodemon({
        script: 'dist/server.js',
        ext: 'js',
        ignore: ['dist/**/*', 'src/client.js', 'Gulpfile.js'],
        tasks: ['babel'],
        env: {
            PORT: 5000,
            NODE_ENV: 'development',
            BACKEND_URL: 'http://localhost:8888',
            CDN_URL: 'http://localhost:3000'
        }
    });
});

gulp.task('cdn', ['client'], () => {
    browserSync({
        proxy: 'localhost:5000',
        serveStatic: ['./dist/assets', './']
    });
});

gulp.task('default', ['cdn', 'server', 'watch']);
