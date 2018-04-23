import {_makeArrayFlattener} from "@privates/array";

/**
 * Flattens the "first level" of an array.
 * @example <caption>Showing the difference with <code>flatten</code>:</caption>
 * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function shallowFlatten
 * @see {@link module:lamb.flatten|flatten}
 * @since 0.9.0
 * @param {Array} array
 * @returns {Array}
 */
export default _makeArrayFlattener(false);
