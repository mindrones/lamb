import {_toPathParts} from "../privates/string";
import {_getPathInfo, _merge, _setPathIn} from "../privates/object";
import enumerables from "../object/enumerables";
import slice from "../array_basics/slice";

/**
 * Allows to change a nested value in a copy of the given object by applying the provided
 * function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * var user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * var inc = _.add(1);
 *
 * _.updatePathIn(user, "status.visits", inc) // => {id: 1, status: {scores: [2, 4, 6]}, visits: 1}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.updatePathIn(user, "status.scores.0", inc) // => {id: 1, status: {scores: [3, 4, 6], visits: 0}}
 *
 * // you can use negative indexes as well
 * _.updatePathIn(user, "status.scores.-1", inc) // => {id: 1, status: {scores: [2, 4, 7], visits: 0}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * var user = {id: 1, scores: [
 *     {value: 2, year: "2000"},
 *     {value: 4, year: "2001"},
 *     {value: 6, year: "2002"}
 * ]};
 *
 * var newUser = _.updatePathIn(user, "scores.0.value", increment);
 * // "newUser" holds:
 * // {id: 1, scores: [
 * //     {value: 3, year: "2000"},
 * //     {value: 4, year: "2001"},
 * //     {value: 6, year: "2002"}
 * // ]}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePath|updatePath}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */
export default function updatePathIn (source, path, updater, separator) {
    var parts = _toPathParts(path, separator);
    var pathInfo = _getPathInfo(source, parts, false);

    if (pathInfo.isValid) {
        return _setPathIn(source, parts, updater(pathInfo.target));
    } else {
        return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source);
    }
}