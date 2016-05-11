module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            files: {
                src: ['*.js', 'test/*.js']
            }
        },
        watch: {
            lint: {
                files: '<%= jshint.files.src %>',
                tasks: 'jshint'
            },
            test: {
                files: ['test/unit/*.js'],
                tasks: ['jshint', 'mochaTest:unit']
            }
        },
        nodemon: {
            dev: {
                script: 'app/app.js',
                options: {
                    ext: 'js,json'
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/test-api2.js']
        },
        clean: {
            coverage: {
                src: ['test/coverage/']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('coverage', ['jshint', 'clean'])
};