module.exports = function ( grunt ) {

    var options = {};

    /** 
    * Config.
    */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            notify_title: 'EXENTRIQ-MANAGEMENT-TOOLS',
            sass_root_file: 'app',
            sass_root_dir: 'sass',
            css_root_dir: 'app/client/stylesheets',
            lib_dir: 'app/lib',
            packages_dir: 'app/packages',
            server_dir: 'app/server',
            client_dir: 'app/client'
        },

        // CSS Sass
        sass: {
            dist: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    '<%= meta.css_root_dir %>/<%= meta.sass_root_file %>.css': '<%= meta.sass_root_dir %>/<%= meta.sass_root_file %>.scss'
                }
            }
        },

        // CSS autoprefixer
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    })
                ]
            },
            dist: {
                src: '<%= meta.css_root_dir %>/<%= meta.sass_root_file %>.css',
                dest: '<%= meta.css_root_dir %>/<%= meta.sass_root_file %>.css'
            }
        },

        // JS jshint
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                undef: false,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish')
                //ignores: [
                //    '<%= meta.client_dir %>/lib/exentriq-bootstrap-material-ui/**/*.js',
                //    '<%= meta.client_dir %>/lib/vendor/**/*.js'
                //]
            },
            app: [
                '<%= meta.client_dir %>/views/notifications/**/*.js'
            ]
        },

        // Copy
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/exentriq-bootstrap-material-ui/dist/fonts/',
                        src: ['**'],
                        dest: 'app/public/fonts'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/exentriq-bootstrap-material-ui/dist/js/',
                        src: [
                            'exentriq-bootstrap-material-ui.js',
                            'exentriq-bootstrap-material-ui.js.map'
                        ],
                        dest: 'app/client/lib/exentriq-bootstrap-material-ui'
                    }
                ]
            }
        },

        // Watch
        watch: {
            sass: {
                files: ['<%= meta.sass_root_dir %>/**/*.scss'],
                tasks: [
                    'sass_compile'
                ]
            }
        },

        // Concurrent
        concurrent: {
            watch: {
                tasks: ['watch:sass'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            }
        },

        // System Notifications
        notify: {
            sass_compile: {
                options: {
                    enabled: true,
                    message: 'Sass Compiled!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            },
            release_compile: {
                options: {
                    enabled: true,
                    message: 'Release Build Completed!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            }
        }

    });
    
    /** 
    * Load required Grunt tasks.
    */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-xgettext');
    grunt.loadNpmTasks('grunt-i18next-conv');

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');

    /**
     * Register Grunt tasks.
     */
    grunt.registerTask('default', ['concurrent:watch']);
    grunt.registerTask('watch', ['concurrent:watch']);

    // Sass
    grunt.registerTask('_sass_compile', ['sass:dist', 'postcss:dist']);
    grunt.registerTask('_sass_compile_lib', ['sass:lib', 'postcss:lib']);

    // Sass alias with notify
    grunt.registerTask('sass_compile', ['_sass_compile', 'notify:sass_compile']);

    // JS
    grunt.registerTask('_js_jshint_app', ['jshint:app']);

    // Build
    grunt.registerTask('Build', [
        '_js_jshint_app',
        '_sass_compile',
        'copy:fonts',
        'copy:js',
        'notify:release_compile'
    ]);

};
