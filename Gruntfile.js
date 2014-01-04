module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concatenate files
    concat: {
      dist: {
        src: ['public/javascripts/*.js'],
        dest: 'public/production/application.js'
      }
    },

    // Minify files
    uglify: {
      build: {
        src: 'public/production/application.js',
        dest: 'public/production/application.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
};