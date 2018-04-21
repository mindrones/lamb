import {_curry2} from "../privates/currying";
import divide from "./divide";

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * var halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function divideBy
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
export default _curry2(divide, true);
