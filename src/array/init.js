import partial from "../core/partial";
import { _internalPlaceholder as _ } from "../privates/_placeholder";
import slice from "../core/slice";

/**
 * Returns a copy of the given array-like object without the last element.
 * @example
 * _.init([1, 2, 3, 4]) // => [1, 2, 3]
 * _.init([1]) // => []
 * _.init([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.tail|tail}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var init = partial(slice, [_, 0, -1]);

export default init;
