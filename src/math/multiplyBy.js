import _curry2 from "@privates/currying/_curry2";
import multiply from "./multiply";

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * var double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function multiplyBy
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
export default _curry2(multiply, true);
