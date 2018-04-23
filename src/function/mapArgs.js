import apply from "@function/apply";
import list from "@array_basics/list";
import compose from "@core/compose";
import mapWith from "@array_basics/mapWith";

/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * var sumArray = _.reduceWith(_.sum);
 * var sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * var square = _.partial(Math.pow, [_, 2]);
 * var sumSquares = _.mapArgs(sumArgs, square);
 *
 * sumSquares(1, 2, 3, 4, 5) // => 55
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.tapArgs|tapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {ListIteratorCallback} mapper
 * @returns {Function}
 */
export default function mapArgs (fn, mapper) {
    return compose(apply(fn), mapWith(mapper), list);
}
