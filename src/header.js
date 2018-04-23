const pkg = require("../package.json");

module.exports =
`/**
 * @overview ${pkg.name} - ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @version ${pkg.version}
 * @module lamb
 * @license ${pkg.license}
 * @preserve
 */`;
