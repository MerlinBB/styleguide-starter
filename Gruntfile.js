module.exports = function (grunt) {

    "use strict";

    // this saves us having to load each plugin individually
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        less: {
            styleguide: {
                options: {
                    strictMath: true,
                    strictUnits: true,
                    cleancss: true,
                    sourceMap: true,
                    sourceMapFilename: "style.map"
                },
                files: {
                    "styleguide.css": "styles/styleguide.less"
                }
            },
            library: {
                options: {
                    strictMath: true,
                    strictUnits: true,
                    cleancss: true,
                    sourceMap: true,
                    sourceMapFilename: "style.map"
                },
                files: {
                    "style.css": "styles/style.less"
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 2 version"]
                },
                src: "style.css",
                dest: "style.css"
            },
        },

        csslint: {
            options: {
                csslintrc: ".csslintrc"
            },
            strict: {
                src: ["style.css"]
            }
        },

        cssmin: {
            minify: {
                src: "style.css",
                dest: "style.css"
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                ".jshintrc",
                "Gruntfile.js",
                "js/project.js"
            ]
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "img/",
                    src: ["*.{png,jpg,gif}", "favicons/*.{png,jpg,gif}"],
                    dest: "img/"
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            images: {
                files: ["img/**/*.{png,jpg,jpeg,gif}"],
                tasks: "buildimg"
            },
            css: {
                files: "styles/**/*.less",
                tasks: "buildcss"
            },
            html: {
                files: "templates/**/*.html",
                tasks: "shell"
            },
        },

        compress: {
            main: {
                options: {
                    archive: "buildpack.zip"
                },
                files: [
                    { src: ["style.css"], dest: "buildpack", filter: "isFile"},
                    { src: ["js/chosen.js"], dest: "buildpack", filter: "isFile"},
                    { src: ["js/list.js"], dest: "buildpack", filter: "isFile"},
                    { src: ["js/bootstrap-datepicker.js"], dest: "buildpack", filter: "isFile"},
                    { src: ["js/bootstrap-timepicker.js"], dest: "buildpack", filter: "isFile"},
                    { src: ["js/widgets.js"], dest: "buildpack", filter: "isFile"},
                    { src: ["fonts/icons.eot"], dest: "buildpack", filter: "isFile" },
                    { src: ["fonts/icons.svg"], dest: "buildpack", filter: "isFile" },
                    { src: ["fonts/icons.ttf"], dest: "buildpack", filter: "isFile" },
                    { src: ["fonts/icons.woff"], dest: "buildpack", filter: "isFile" },
                    { src: ["img/icon-search.png"], dest: "buildpack", filter: "isFile" },
                ]
            }
        },

        notify: {
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5,
                }
            },
            less: {
                options: {
                    title: "Cashback!",
                    message: "LESS build successful!"
                }
            },
            img: {
                options: {
                    title: "Jurassic Park!",
                    message: "Image minify successful!"
                }
            },
            build: {
                options: {
                    title: "LYNNNNNNN",
                    message: "Build successful!"
                }
            }
        }

    });

    // List of available tasks
    grunt.registerTask("default",  []);
    grunt.registerTask("buildcss", ["less", "autoprefixer", "csslint", "cssmin", "notify:less"]);
    grunt.registerTask("buildimg", ["imagemin", "notify:img"]);
    grunt.registerTask("build",    ["buildcss", "buildimg", "compress", "notify:build"]);

};
