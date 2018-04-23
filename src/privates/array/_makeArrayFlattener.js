import slice from "@array_basics/slice";
import {_curry2} from "../currying";
import _flatten from "./_flatten";

/**
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function _makeArrayFlattener
 * @param {Boolean} isDeep
 * @returns {Function}
 */
export default _curry2(function (isDeep, array) {
    return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});
