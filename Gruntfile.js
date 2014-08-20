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
			}
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
		}
	});

	//Loading Grunt Plugins
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	//Register default task
	grunt.registerTask('default', ['watch']);

};