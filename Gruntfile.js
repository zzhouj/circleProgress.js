module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            src: ['circleProgress.min.js']
        },
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'circleProgress.js',
                dest: 'circleProgress.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean', 'uglify']);

};