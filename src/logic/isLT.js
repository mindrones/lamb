import {_curry2} from "@privates/currying";
import lt from "./lt";

/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * var isLessThan5 = _.isLT(5);
 *
 * isLessThan5(7) // => false
 * isLessThan5(5) // => false
 * isLessThan5(3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function isLT
 * @see {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
export default _curry2(lt, true);
