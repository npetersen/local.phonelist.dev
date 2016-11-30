// http://www.sitepoint.com/writing-awesome-build-script-grunt/

module.exports = function(grunt) {

    var jsBowerDependencies = [
        'angular/angular.min.js',
        'angular-route/angular-route.min.js',
        'angular-resource/angular-resource.min.js',
        'angular-bootstrap/ui-bootstrap-tpls.min.js',
        'angular-img-fallback/angular.dcb-img-fallback.min.js',
        'jquery-backstretch/jquery.backstretch.min.js',
        'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js'

    ];

    var cssBowerDependencies = [

        'html5-boilerplate/css/normalize.css',
        'html5-boilerplate/css/main.css'
    ];

    var buildDir = 'dist';

    // configure the tasks
    grunt.initConfig({

        clean: {
            build: {
                src: [ 'dist' ]
            },
        },

        copy: {
            build: {
                files: [
                    {
                        cwd: 'app',
                        src: [ '**', '!bower_components/**' ],
                        dest: buildDir,
                        expand: true,
                    },
                    {
                        cwd: './app/bower_components',
                        expand: true,
                        src: jsBowerDependencies,
                        dest: buildDir + '/assets/js/vendor'
                    },
                    {
                        cwd: './app/bower_components',
                        expand: true,
                        src: cssBowerDependencies,
                        dest: buildDir + '/assets/css/vendor'
                    }
                ]
            },

        },

        cssmin: {
            dist: {
                files: {
                    'dist/assets/css/app.css' : ['dist/assets/css/app.css']
                }
            }
        },

        /* cdnify: {
            release: {
                options: {
                    rewriter: function (url) {
                        if (url.indexOf('bower_components') === 0)
                            if (url.indexOf('js') > -1)
                                var distPath = url.replace('bower\_components', 'assets\/js\/vendor');
                            else if (url.indexOf('css') > -1)
                                var distPath = url.replace('bower\_components', 'assets\/css\/vendor');
                        return distPath;
                    }
                },
                files: [{
                    expand: true,
                    cwd: buildDir,
                    src: 'index.html',
                    dest: buildDir
                }]
            }
        }, */

        targethtml: {
            tst: {
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            },
            prod: {
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },



    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-cdnify');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // define the tasks
    grunt.registerTask(
        'buildDev',
        'Build a dev environment distribution',
        [ 'clean', 'copy', 'cssmin', 'targethtml:dev' ]
    );

    grunt.registerTask(
        'buildTst',
        'Build a test environment distribution',
        [ 'clean', 'copy', 'cssmin', 'targethtml:tst' ]
        // [ 'clean', 'copy', 'cssmin', 'cdnify', 'targethtml:tst' ]

    );

    grunt.registerTask(
        'buildProd',
        'Build a prod environment distribution',
        [ 'clean', 'copy', 'cssmin', 'targethtml:prod' ]
        // [ 'clean', 'copy', 'cssmin', 'cdnify', 'targethtml:prod' ]

    );

};