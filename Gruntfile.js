module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            files: ['frontend/*.js', "frontend/**/*.js"]
        },
        clean: {
            build: {
                src: ['./public/javascripts/app-bundle.js', './public/stylesheets/app-bundle.css', 'public/index.html']
            }
        },
        copy: {
          main: {
            files: [
                {expand: true, src: ['index.html'], dest: 'public/', filter: 'isFile'},
                {expand: true, flatten: true,src: ['node_modules/font-awesome/fonts/*'], dest: 'public/fonts/', filter: 'isFile'},
            ]
          },
        },
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                options: {
                    transform: [require('grunt-react').browserify, require('brfs')],
                    extensions: ['.jsx'],
                    browserifyOptions: {
                        debug: true,
                    },
                },
                src: ['frontend/main.js'],
                dest: './public/javascripts/app-bundle.js'
            }
        },
        cssmin: {
            concatDist: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                files: {
                    './public/stylesheets/app-bundle.css': [
                        'frontend/*.css',
                        'frontend/**/*.css',
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/font-awesome/css/font-awesome.css'
                    ]
                }
            },
            minifyDist: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                files: {
                    './public/stylesheets/app-bundle.css': [
                        './public/stylesheets/app-bundle.css'
                    ]
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [
                        '.pen',
                        '.in',
                        '.bs.carousel',
                        '.slid.bs.carousel',
                        '.slide.bs.carousel',
                        /\.active/,
                        /\.modal/,
                        /\.has-error/,
                        '.fade',
                        '.fade.in',
                        '.collapse',
                        '.collapse.in',
                        '.collapsing',
                        '.alert-danger',
                        '.logged-in .navbar-default',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next.left',
                        '.carousel-inner > .prev.right',
                        '.carousel-inner > .active.left',
                        '.carousel-inner > .active.right',
                        '.bot-visibility',
                        '.bot-invisible .bot-visibility']
                },
                files: {
                    'public/stylesheets/app-bundle.css': ['public/index.html', "frontend/*.html", "frontend/**/*.html"]
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'app.js',
                    'grunt.js',
                    'database/*.js',
                    'routes/*.js',
                    'frontend/*.js',
                    'frontend/*.jsx',
                    'frontend/**/*.js',
                    'frontend/**/*.jsx',
                    'frontend/*.css',
                    'frontend/**/*.css',
                    'frontend/*.html',
                    'frontend/**/*.html',
                     'index.html'],
                tasks: ['jshint', 'clean', 'copy', 'browserify', 'cssmin', 'uncss', 'express'],
                options: {
                    spawn: false
                },
            },
        },
        express: {
            dev: {
                options: {
                    script: './app.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: './public/javascripts/app-bundle.js',
                dest: './public/javascripts/app-bundle.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('rebuild-dev', ['jshint', 'clean', 'copy', 'browserify', 'cssmin:concatDist', 'uncss']);
    grunt.registerTask('rebuild-prod', ['jshint', 'clean', 'copy', 'browserify', 'cssmin:concatDist', 'uncss', 'uglify', 'cssmin:minifyDist']);
    grunt.registerTask('dev', ['express', 'rebuild-dev', 'watch']);
};
