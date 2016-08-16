var gulp =          require("gulp"),
    sass =          require("gulp-sass"),
    autoprefixer =  require("gulp-autoprefixer");
    // concat =        require("gulp-concat"),
    // uglify =        require("gulp-uglify"),
    // preprocess =    require("gulp-preprocess"),
    // prompt =        require("gulp-prompt"),
    // merge =         require("merge-stream");
    
var basePath = {
    src: "src/",
    dist: "dist/"
};

var folderPath = {
    css: "assets/css/",
    scss: "assets/scss/",
    js: "assets/js/",
    fonts: "assets/fonts/",
    images: "assets/images/",
    bower: "bower_components/",
    app: "app/",
    php: "php/"
};

// SCSS compile
function scssCompile(fileName) {
    return gulp.src(basePath.src + folderPath.scss + fileName + ".scss")
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ie >= 9"],
            cascade: false
        }))
        .pipe(gulp.dest(basePath.src + folderPath.css));
}

// CSS concatenation
function cssConcat(cssFiles) {
    return gulp.src(cssFiles)
        .pipe(concat("build.css"))
        .pipe(gulp.dest(basePath.src + folderPath.css));
}

// Minify CSS
function cssMin(destFolder, fileName) {
    return gulp.src(basePath.src + folderName.css + fileName + ".css")
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest(destFolder + folderPath.css));
}

// JS library concatenation
function jsLibConcat(jsFiles) {
    return gulp.src(jsFiles)
        .pipe(concat("lib.js"))
        .pipe(gulp.dest(basePath.src + folderPath.scss));
}

// Minify JS
function jsMin(destFolder, jsLibFiles) {
    // Library
    var libStream = function() {
        return gulp.src(jsLibFiles)
            .pipe(uglify())
            .pipe(gulp.dest(destFolder + folderPath.js + "libs/"));
    };

    // Modernizr
    var modernizrStream = function() {
        return gulp.src(basePath.src + folderPath.bower + "modernizr/index.js")
            .pipe(uglify())
            .pipe(gulp.dest(destFolder + folderPath.js + "libs/modernizr/"));
    };

    // App
    var appStream = function() {
        return gulp.src(basePath.src + folderPath.app + "build.js")
            .pipe(uglify())
            .pipe(gulp.dest(destFolder + folderPath.app));
    };

    return merge(libStream(), modernizrStream(), appStream());
}

// Copy files
function copyFiles(destFolder) {
    var fontStream = function() {
        return gulp.src(basePath.src + folderPath.fonts + "**/*")
            .pipe(gulp.dest(destFolder + folderPath.fonts));
    };

    var favIconStream = function() {
        return gulp.src(basePath.src + "favicon.ico")
            .pipe(gulp.dest(destFolder));
    };

    return merge(fontStream(), favIconStream());
}

// Copy image files
function copyImageFiles(destFolder) {
    return gulp.src([
        // All images
        basePath.src + folderPath.images + "**/*",

        // Ignore design directory
        "!" + basePath.src + folderPath.images + "{designs,designs/**,designs/**/*}"
    ])
    .pipe(gulp.dest(destFolder + folderPath.images));
}

// Preprocess HTML/PHP templates
function preprocessTpl(destFolder, mode) {
    return gulp.src([
        basePath.src + "**/*.html",
        basePath.src + "**/*.php",
    ])
    .pipe(preprocess({
        context: {
            mode: mode
        },
        extension: ".html"
    }))
    .pipe(gulp.dest(destFolder));
}



/* ------------ Development tasks ------------ */
// Compile SCSS
gulp
    .task("scssCompileAboveFold", function() {
        return scssCompile("above-fold");
    })
    .task("scssCompile", function() {
        return scssCompile("index");
    })
    .task("scssCompileAll", ["scssCompileAboveFold", "scssCompile"]);

// JS library concat
gulp.task("jsLibConcat", function() {
    return jsLibConcat([
        /* Files here */
    ]);
});

// Watch task
gulp.task("scssWatch", function() {
    gulp.watch(basePath.src + folderPath.scss + "**/*.scss", ["scssCompile"]);
});


/* ------------ Production tasks ------------ */
// CSS concat
gulp.task("cssConcat", ["scssCompile", "scssCompileAboveFold"], function() {
    return cssConcat(basePath.dist);
});

// CSS minify
gulp.task("cssMin", ["cssConcat"], function() {
    return cssMin(basePath.dist, "build");
    // return merge(cssMin("dist", "above-fold"), cssMin("dist", "build"));
});

// Minify JS
gulp.task("jsMin", ["jsLibConcat"], function() {
    return jsMin(basePath.dist, [
        /* Files here */
    ]);
});

// Copy non-image files
gulp.task("copyFiles", function() {
    return copyFiles(basePath.dist);
});

// Copy image files
gulp.task("copyImageFiles", function() {
    return copyImageFiles(basePath.dist);
});

// Preprocess HTMl/PHP templates
gulp.task("preprocessTpl", function() {
    return preprocess(basePath.dist, "prod");
});


/* ------------ Group tasks ------------ */
gulp.task("distProd", ["cssMin", "jsMin", "copyFiles", "preprocessTpl"]);

gulp.task("default", ["scssWatch"]);
