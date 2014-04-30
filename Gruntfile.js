'use strict';

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   coffeescript: _src
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Configurable paths
        path: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            compass: {
                files: ['<%= path.app %>/assets/_scss/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer:server']
            },
            autoprefixer: {
                files: ['<%= path.app %>/assets/css/**/*.css'],
                tasks: ['copy:stageCss', 'autoprefixer:server']
            },
            styleguide: {
                files: ['<%= path.app %>/assets/_scss/**/*.{scss,sass}'],
                tasks: ['styleguide:server']
            },
            coffee: {
                files: ['<%= path.app %>/assets/_src/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/**/*.coffee'],
                tasks: ['coffee:test']
            },
            jekyll: {
                files: [
                    '<%= path.app %>/**/*.{html,yml,md,mkd,markdown}',
                    '!<%= path.app %>/doc/**/*',
                    '!<%= path.app %>/assets/_bower_components/**/*'
                ],
                tasks: ['jekyll:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.html',
                    '.tmp/assets/css/**/*.css',
                    '{.tmp,<%= path.app %>}/assets/<%= js %>/**/*.js',
                    '<%= path.app %>/assets/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '.jekyll',
                        '<%= path.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: [
                        '<%= path.dist %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        '.jekyll',
                        'test',
                        '<%= path.app %>'
                    ]
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= path.dist %>/*',
                        // Running Jekyll also cleans the target directory.  Exclude any
                        // non-standard `keep_files` here (e.g., the generated files
                        // directory from Jekyll Picture Tag).
                        '!<%= path.dist %>/.git*'
                    ]
                }]
            },
            server: [
                '.tmp',
                '.jekyll'
            ]
        },
        compass: {
            options: {
                // If you're using global Sass gems, require them here.
                require: ['singularity', 'jacket'],
                bundleExec: false,
                sassDir: '<%= path.app %>/assets/_scss',
                cssDir: '.tmp/assets/css',
                imagesDir: '<%= path.app %>/assets/img',
                javascriptsDir: '<%= path.app %>/assets/js',
                relativeAssets: false,
                httpImagesPath: '/assets/img',
                httpGeneratedImagesPath: '/assets/img/generated',
                outputStyle: 'expanded',
                raw: 'extensions_dir = "<%= path.app %>/assets/_bower_components"\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= path.dist %>/assets/img/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false,
                    generatedImagesDir: '.tmp/assets/img/generated'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>/assets/css',
                    src: '**/*.css',
                    dest: '<%= path.dist %>/assets/css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/css',
                    src: '**/*.css',
                    dest: '.tmp/assets/css'
                }]
            }
        },
        styleguide: {
            options: {
                framework: {
                    name: 'styledocco'
                },
                name: 'howtohp Style Guide',
                template: {
                    include: ['plugin.css', 'app.js']
                }
            },
            server: {
                files: {
                    '.jekyll/docs/style': ['<%= path.app %>/assets/_scss/**/*.{scss,sass}']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.app %>/assets/_src',
                    src: '**/*.coffee',
                    dest: '.tmp/assets/js',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '**/*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        jekyll: {
            options: {
                bundleExec: true,
                config: '_config.yml,_config.build.yml',
                src: '<%= path.app %>'
            },
            dist: {
                options: {
                    dest: '<%= path.dist %>',
                }
            },
            server: {
                options: {
                    config: '_config.yml',
                    dest: '.jekyll'
                }
            },
            check: {
                options: {
                    doctor: true
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= path.dist %>'
            },
            html: '<%= path.dist %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: '<%= path.dist %>',
            },
            html: ['<%= path.dist %>/**/*.html'],
            css: ['<%= path.dist %>/assets/css/**/*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>',
                    src: '**/*.html',
                    dest: '<%= path.dist %>'
                }]
            }
        },
        // Usemin adds files to concat
        concat: {},
        // Usemin adds files to uglify
        uglify: {},
        // Usemin adds files to cssmin
        cssmin: {
            dist: {
                options: {
                    check: 'gzip'
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>',
                    src: '**/*.{jpg,jpeg,png}',
                    dest: '<%= path.dist %>'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>',
                    src: '**/*.svg',
                    dest: '<%= path.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.app %>/assets/',
                    src: [
                        // Jekyll processes and moves HTML and text files.
                        // Usemin moves CSS and javascript inside of Usemin blocks.
                        // Copy moves asset files and directories.
                        'img/**/*',
                        'fonts/**/*',
                        // Like Jekyll, exclude files & folders prefixed with an underscore.
                        '!**/_*{,/**}'
                        // Explicitly add any files your site needs for distribution here.
                        //'_bower_components/jquery/jquery.js',
                        //'favicon.ico',
                        //'apple-touch*.png'
                    ],
                    dest: '<%= path.dist %>/assets/'
                }]
            },
            // Copy CSS into .tmp directory for Autoprefixer processing
            stageCss: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.app %>/assets/css',
                    src: '**/*.css',
                    dest: '.tmp/assets/css'
                }]
            }
        },
        filerev: {
            options: {
                length: 4
            },
            dist: {
                files: [{
                    src: [
                        '<%= path.dist %>/assets/js/**/*.js',
                        '<%= path.dist %>/assets/css/**/*.css',
                        '<%= path.dist %>/assets/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
                        '<%= path.dist %>/assets/fonts/**/*.{eot*,otf,svg,ttf,woff}'
                    ]
                }]
            }
        },
        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:kymmt/kymmt.github.io.git',
                    branch: 'master'
                }
            }
        },
        coffeelint: {
            options: {
                'max_line_length': {
                    'level': 'ignore'
                }
            },
            check: ['<%= path.app %>/assets/_src/*.coffee']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= path.app %>/assets/js/**/*.js',
                'test/spec/**/*.js'
            ]
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            check: {
                src: [
                    '<%= path.app %>/assets/css/**/*.css'
                ]
            }
        },
        concurrent: {
            server: [
                'compass:server',
                'coffee:dist',
                'copy:stageCss',
                'jekyll:server'
            ],
            dist: [
                'compass:dist',
                'coffee:dist',
                'copy:dist'
            ]
        }
    });

    // Define Tasks
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer:server',
            'styleguide:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    // No real tests yet. Add your own.
    grunt.registerTask('test', [
        //   'clean:server',
        //   'concurrent:test',
        //   'connect:test'
    ]);

    grunt.registerTask('check', [
        'clean:server',
        'jekyll:check',
        'compass:server',
        'coffeelint:check',
        'coffee:dist',
        'jshint:all',
        'csslint:check'
    ]);

    grunt.registerTask('build', [
        'clean',
        // Jekyll cleans files from the target directory, so must run first
        'jekyll:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'autoprefixer:dist',
        'cssmin',
        'uglify',
        'imagemin',
        'svgmin',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'check',
        'test',
        'build',
        'buildcontrol'
    ]);

    grunt.registerTask('default', [
        'check',
        'test',
        'build'
    ]);
};
