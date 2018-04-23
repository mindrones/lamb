var fs = require("fs");
const path = require("path");
var gulp = require("gulp");
const rollup = require('rollup');
const alias = require('rollup-plugin-alias');
const json = require('rollup-plugin-json');
var istanbul = require("gulp-istanbul");
var jasmine = require("gulp-jasmine");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

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

function lint () {
    // isolated because of shelljs, again
    var eslint = require("gulp-eslint");

    return gulp.src(["./dist2/lamb.js", "./test/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

gulp.task("analysis", function (done) {
    // required here in an isolated task as plato loads jshint,
    // which uses shelljs that pollutes the String.prototype
    require("plato").inspect(scripts, "./plato_report", {title: "Lamb Analysis"}, function () {});
});

/* build */

const makeAliases = aliases => {
    const rootDir = path.resolve(__dirname);
    const pathsMap = {};

    for (const alias in aliases) {
        pathsMap[alias] = path.join(rootDir, aliases[alias]);
    }

    return pathsMap;
}

gulp.task("build", () => {
    const aliases = makeAliases({
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
    const footer = fs.readFileSync("./src/footer.js", "utf8");
    const header = require('./src/header');

    return rollup.rollup({
        input: "index.js",
        plugins: [
            alias(aliases),
            json({
                indent: '    ' // 4 spaces indentation
            })
        ]
    }).then(bundle => {
        return bundle.write({
            banner: header,
            file: "dist2/lamb.js",
            footer: footer,
            format: "umd",
            name: "lamb",
            sourcemap: true
        });
    });
});

gulp.task("coverage", ["build"], function (cb) {
    gulp.src("./dist2/lamb.js")
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on("finish", function () {
            gulp.src("./test/spec/*.js")
                .pipe(jasmine())
                .pipe(istanbul.writeReports())
                .on("end", cb);
        });
});

gulp.task("lint", ["build"], lint);

gulp.task("minify", ["build"], function () {
    return gulp.src("./dist2/lamb.js")
        .pipe(sourcemaps.init())
        .pipe(uglify({
            output: {comments: "some"}
        }))
        .pipe(rename({extname: ".min.js"}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist2/"));
});

gulp.task("test", ["build"], function () {
    return gulp.src("./test/spec/*.js")
        .pipe(jasmine({
            includeStackTrace: true
        }));
});

gulp.task("travis", ["build", "minify", "test"], lint);

gulp.task("test-verbose", ["build"], function () {
    return gulp.src("./test/spec/*.js")
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});

gulp.task("default", ["build", "minify", "coverage"], lint);
