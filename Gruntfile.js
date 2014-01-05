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
    },

    // Optimize images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['images/*.{png,jpg,gif}'],
          dest: 'public/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
};