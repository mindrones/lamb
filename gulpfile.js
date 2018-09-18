/* eslint-disable require-jsdoc */

var fs = require("fs");
var gulp = require("gulp");
var eslint = require("gulp-eslint");
var filesize = require("rollup-plugin-filesize");
var jest = require("gulp-jest").default;
var rename = require("gulp-rename");
var rollup = require("rollup");
var rollupJSON = require("rollup-plugin-json");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

var jestBaseConfig = require("./jest.config");
var pkg = require("./package.json");

var intro = [
    "/**",
    "* @overview " + pkg.name + " - " + pkg.description,
    "* @author " + pkg.author.name + " <" + pkg.author.email + ">",
    "* @version " + pkg.version,
    "* @module lamb",
    "* @license " + pkg.license,
    "* @preserve",
    "*/"
].join("\n");

/* build */

gulp.task("build", function () {
    var outro = fs.readFileSync("src/outro.js", "utf8");

    return rollup.rollup({
        input: "src/index.js",
        plugins: [
            filesize(),
            rollupJSON()
        ]
    }).then(function (bundle) {
        return bundle.write({
            banner: intro,
            exports: "default",
            file: "dist/lamb.js",
            format: "umd",
            freeze: false,
            name: "lamb",
            footer: outro,
            sourcemap: false,
            strict: true
        });
    });
});

gulp.task("minify", gulp.series(
    "build",
    function () {
        return gulp.src("dist/lamb.js")
            .pipe(sourcemaps.init())
            .pipe(uglify({ output: { comments: "some" } }))
            .pipe(rename({ extname: ".min.js" }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("dist"));
    }
));

/* lint */

function lintWith (settings) {
    return function () {
        return gulp.src(settings.inputs)
            .pipe(eslint(settings.configPath))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
}

gulp.task("lint:code", lintWith({
    configPath: ".eslintrc.json",
    inputs: ["./*.js", "./src/**/*.js", "!./src/**/__{tests,mocks}__/**"]
}));

gulp.task("lint:tests", lintWith({
    configPath: ".eslintrc.test.json",
    inputs: "./src/**/__{tests,mocks}__/**/*.js"
}));

gulp.task("lint", gulp.series("lint:code", "lint:tests"));

/* test */

gulp.task("test", function () {
    return gulp.src("./src").pipe(jest(jestBaseConfig));
});

gulp.task("test:coverage", function () {
    return gulp.src("./src").pipe(
        jest(Object.assign({}, jestBaseConfig, { collectCoverage: true }))
    );
});

gulp.task("test:verbose", function () {
    return gulp.src("./src").pipe(jest(Object.assign({}, jestBaseConfig, { verbose: true })));
});

gulp.task("test:watch", function () {
    return gulp.src("./src").pipe(jest(Object.assign({}, jestBaseConfig, { watch: true })));
});

/* travis */

gulp.task("travis", gulp.series("lint", "test", "minify"));

/* default */

gulp.task("default", gulp.series("lint", "test:coverage"));
