import identity from "../core/identity";
import unionBy from "./unionBy";

/**
 * Returns a list of every unique element present in the given array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.unionBy|unionBy} if you need to transform the values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.union([1, 2, 3, 2], [3, 4], [1, 5]) // => [1, 2, 3, 4, 5]
 * _.union("abc", "bcd", "cde") // => ["a", "b", "c", "d", "e"]
 *
 * @memberof module:lamb
 * @category Array
 * @function union
 * @see {@link module:lamb.unionBy|unionBy}
 * @since 0.5.0
 * @param {...ArrayLike} arrayLike
 * @returns {Array}
 */
export default unionBy(identity);
