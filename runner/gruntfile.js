module.exports = function(grunt) {

    var continuousIntegrationMode = grunt.option('ci') || false;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                options: {
                    browsers: ['Chrome']
                },
                configFile: 'karma.conf.js',
                singleRun: continuousIntegrationMode,
                reporters: continuousIntegrationMode ? ['teamcity'] : ['progress']
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma']);
};