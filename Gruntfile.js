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
		},
		replace: {
			docs: {
				src: ['docs/README.md'],
				dest: 'README.md',
				replacements: [{
					from: '%version%',
					to: '<%= pkg.version %>'
				}, {
					from: '%date%',
					to: '<%= grunt.template.today("mm/dd/yy") %>'
				}]
			}
		},
		markdown: {
			all: {
				files: [
					{
						expand: true,
						src: '*.md',
						dest: 'docs/',
						ext: '.html'
					}
				],
				options: {
					template: 'docs/template.tpl',
					markdownOptions: {
						highlight: 'auto'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concat', 'uglify']);
	grunt.registerTask('docs', ['replace', 'markdown']);
};
