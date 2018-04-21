import {_curry2} from "../privates/currying";
import subtract from "./subtract";

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * var deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function deduct
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
export default _curry2(subtract, true);
