module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			folders: [
				'dist/'
			]
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'src/typeright.js'
			],
			options: {
				browser: true,
				globals: {
					define: true
				}
			}
		},
		copy: {
			dist: {
				files: [
					{
						src: ['src/typeright.js'],
						dest: 'dist/typeright.js'
					}
				]
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'vendor/eventEmitter/EventEmitter.js',
					'src/typeright.js'
				],
				dest: 'dist/typeright.pkgd.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> | version <%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) | author: <%= pkg.author.name %> | license: <%= pkg.license.type %> (<%= pkg.license.url %>) */\n'
			},
			dist: {
				files: {
					'dist/typeright.min.js': ['src/typeright.js'],
					'dist/typeright.pkgd.min.js': ['dist/typeright.pkgd.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concat', 'uglify']);
};
