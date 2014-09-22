module.exports = (grunt) ->
  # custom task to embed css into the view
  grunt.registerTask 'embedcss', 'Embed CSS.', ->
    sqwish          = require('sqwish')

    src             = grunt.file.read("src/css/application.css")
    minified_css    = sqwish.minify(src)

    combined = "(function(SignatureChrome){" +
      "SignatureChrome.prototype._drawCss = function() {" +
        "this.css = '" + minified_css + "';" +
        "var style = document.createElement('style');" +
        "style.type = 'text/css';" +
        "if (style.styleSheet) {" +
          "style.styleSheet.cssText = this.css;" +
        "} else {" +
          "style.appendChild(document.createTextNode(this.css));" +
        "}" +
        "return document.body.appendChild(style);" +
      "};" +
    "}(SignatureChrome));"

    grunt.file.write("src/signature-chrome/css.js", combined)

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.name %>.js - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> - <%= pkg.author %> */\n"
    uglify:
      options:
        banner: "<%= banner %>"
      en:
        src: "build/signature-chrome.js"
        dest: "build/signature-chrome.min.js"
    concat:
      options:
        banner: "<%= banner %>"
        separator: '\n\n'
        stripBanners : true
      en:
        src: ["src/libs/microevent.js", "src/libs/fabric.js", "src/extensions/*.js", "src/signature-chrome.js", "src/signature-chrome/*.js"]
        dest: "build/signature-chrome.js"
    jshint:
      all: ['src/signature-chrome.js', 'src/signature-chrome/*.js']
    connect:
      server:
        options:
          hostname: "*"
          port: 3000,
          base: './public'
          keepalive: true
    simplemocha:
      all:
        src: 'test/*.js'


  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-simple-mocha"
  grunt.loadNpmTasks "grunt-contrib-jshint"

  grunt.registerTask "test", ["simplemocha", "jshint"]
  grunt.registerTask "default", ["embedcss", "jshint", "concat", "uglify", "connect"]

  # Some available commands
  # grunt
  # grunt test
  # grunt connect
