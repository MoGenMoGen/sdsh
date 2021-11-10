"use strict";

var gulp = require('gulp');
var scp2 = require('gulp-scp2');
var sequence = require('run-sequence');

gulp.task('dev', function(){
    return gulp.src('buildDist/**')
        .pipe(scp2({
            // host: '223.4.74.201',
            host: '223.4.75.8',
            // host:'223.4.73.41', //测试
            username: 'root',
            // password: 'jlink_2019@#11',
            password: '%OJgzT0LKh3$',
            dest: '/usr/local/tomcat/zjfzol/sys-admin/zjfzol'
            // dest: '/usr/local/tomcat/zjfzb/pc'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('default', function(done){
    sequence(
        'dev',
        done
    )
});
