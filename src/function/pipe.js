import compose from "@core/compose";
import flip from "./flip";

/**
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * var square = _.partial(Math.pow, [_, 2]);
 * var getMaxAndSquare = _.pipe(Math.max, square);
 *
 * getMaxAndSquare(3, 5) // => 25
 *
 * @memberof module:lamb
 * @category Function
 * @function pipe
 * @see {@link module:lamb.compose|compose}
 * @since 0.1.0
 * @param {...Function} fn
 * @returns {Function}
 */
export default flip(compose);
