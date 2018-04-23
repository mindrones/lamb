import _curry2 from "@privates/currying/_curry2";
import find from "./find";

/**
 * A curried version of {@link module:lamb.find|find} expecting the array-like object
 * to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEven = _.findWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 7]) // => 4
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function findWhere
 * @see {@link module:lamb.find|find}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
export default _curry2(find, true);
