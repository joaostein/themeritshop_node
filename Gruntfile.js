module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concatenate files
    concat: {
      dist: {
        src: ['public/javascripts/*.js'],
        dest: 'public/javascripts/application.js'
      }
    },

    // Minify files
    uglify: {
      build: {
        src: 'public/javascripts/application.js',
        dest: 'public/javascripts/application.min.js'
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
    },

    // Compass
    compass: {
      dist: {
        options: {
          sassDir: 'public/stylesheets/sass',
          cssDir: 'public/stylesheets/css'
        }
      }
    },

    // Watch for changes and run tasks
    watch: {
      options: {
        livereload: true,
      },

      scripts: {
        files: ['public/javascripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },

      css: {
        files: ['public/stylesheets/sass/*.sass'],
        tasks: ['compass'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
  grunt.registerTask('dev', ['watch']);
};









