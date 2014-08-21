module.exports = function (grunt) {

	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch:{
			js: {
				files: ['Gruntfile.js', 'dist/*.js']
			},
			css: {
				files: ['css/core.css']
			},
			tasks:['jshint','csslint']
		},
		
		jshint: {
			options: {
				jshintrc: {
					"node":true,
					"curly":false,
					"indent":4,
					"quotmark":"single",
					"globals": {
						'jQuery':true
					}
				}
			},
			all: ['Gruntfile.js', 'dist/*.js']
		},

		csslint: {
  			strict: {
    			src: ['css/core.css']
  			},
  			lax: {
    			src: ['css/core.css']
  			}
		}
	});

	//Loading Grunt Plugins
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//Grunt Options
	grunt.option("force", true);

	//Register default task
	grunt.registerTask('default', ["csslint:strict"]);

};