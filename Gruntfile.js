module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      options: {
        timeout: 500,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'dot'
      },
      all: { src: 'test/*.js' }
    },
    uglify: {
      options: {
        banner: '/*! \n * Name: <%= pkg.name %>\n * Version: <%= pkg.version %>\n * License: MIT\n * URL: <%= pkg.repository.url %>\n */\n',
        report: 'gzip'
      },
      dist: {
        src:  'password.js',
        dest: 'password.min.js'
      }
    },
    jshint: {
      lib:     ['password.js'],
      tests:   ['test/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        forin:    true,
        noarg:    true,
        noempty:  true,
        bitwise:  false,
        eqeqeq:   false,
        strict:   true,
        undef:    true,
        browser:  true,
        trailing: true,
        regexp:   true,
        expr:     true,
        indent:   2,
        globals: {
          it: true,
          module: true,
          require: true,
          describe: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['simplemocha', 'uglify']);
  grunt.registerTask('ci', ['simplemocha', 'jshint']);
};
