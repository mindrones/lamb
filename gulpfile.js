var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var rollup = require('rollup');
var rollupAlias = require('rollup-plugin-alias');
var rollupJSON = require('rollup-plugin-json');
var istanbul = require("gulp-istanbul");
var jasmine = require("gulp-jasmine");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

/* lint */

var lint = function (paths) {
    return function () {
        // isolated because of shelljs, again
        var eslint = require("gulp-eslint");

        return gulp.src(paths)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
};

var lintAll = lint(["./src/**", "./dist/lamb.js", "./test/**"]);

gulp.task("lint_src", lint(["./src/**"]));
gulp.task("lint_dist", lint(["./dist/lamb.js"]));
gulp.task("lint_test", lint(["./test/**"]));

gulp.task("lint", ["build"], lintAll);

/* build */

var makeAliases = function (aliases) {
    var rootDir = path.resolve(__dirname);
    var pathsMap = {};

    for (var alias in aliases) {
        pathsMap[alias] = path.join(rootDir, aliases[alias]);
    }

    return pathsMap;
};

gulp.task("build", function () {
    var aliases = makeAliases({
        "@accessors": "src/accessors",
        "@array": "src/array",
        "@array_basics": "src/array_basics",
        "@core": "src/core",
        "@function": "src/function",
        "@grouping": "src/grouping",
        "@logic": "src/logic",
        "@math": "src/math",
        "@object": "src/object",
        "@object_checking": "src/object_checking",
        "@privates": "src/privates",
        "@sort": "src/sort",
        "@src": "src",
        "@string": "src/string",
        "@type": "src/type"
    });
    var footer = fs.readFileSync("./src/footer.js", "utf8");
    var header = require('./src/header');

    return rollup.rollup({
        input: "index.js",
        plugins: [
            rollupAlias(aliases),
            rollupJSON({indent: "    "}) // 4 spaces indentation
        ]
    }).then(function (bundle) {
        return bundle.write({
            banner: header,
            file: "dist/lamb.js",
            footer: footer,
            format: "umd",
            name: "lamb",
            strict: false,
            sourcemap: true
        });
    });
});

/* minify */

gulp.task("minify", ["build"], function () {
    return gulp.src("./dist/lamb.js")
        .pipe(sourcemaps.init())
        .pipe(uglify({ output: {comments: "some"} }))
        .pipe(rename({extname: ".min.js"}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist/"));
});

/* test */

gulp.task("test", ["build"], function () {
    return gulp.src("./test/spec/*.js")
        .pipe(jasmine({ includeStackTrace: true }));
});

gulp.task("test-verbose", ["build"], function () {
    return gulp.src("./test/spec/*.js")
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});

/* quality */

// analysis (FIXME update paths)

var scripts = [
    "./src/core.js",
    "./src/privates.js",
    "./src/array_basics.js",
    "./src/logic.js",
    "./src/math.js",
    "./src/type.js",
    "./src/accessors.js",
    "./src/array.js",
    "./src/grouping.js",
    "./src/sort.js",
    "./src/function.js",
    "./src/object.js",
    "./src/object_checking.js",
    "./src/string.js"
];

gulp.task("analysis", function (done) {
    // required here in an isolated task as plato loads jshint,
    // which uses shelljs that pollutes the String.prototype
    require("plato")
        .inspect(scripts, "./plato_report", {title: "Lamb Analysis"}, function () {});
});

// coverage

gulp.task("coverage", ["build"], function (cb) {
    gulp.src("./dist/lamb.js")
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on("finish", function () {
            gulp.src("./test/spec/*.js")
                .pipe(jasmine())
                .pipe(istanbul.writeReports())
                .on("end", cb);
        });
});

// travis

gulp.task("travis", ["build", "minify", "test"], lintAll);

/* default */

gulp.task("default", ["build", "minify", "coverage"], lintAll);
