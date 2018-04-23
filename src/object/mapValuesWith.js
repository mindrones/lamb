import {_curry2} from "@privates/currying";
import mapValues from "./mapValues";

/**
 * A curried version of {@link module:lamb.mapValues|mapValues}.<br/>
 * Expects a mapping function to build a new function waiting for the
 * object to act upon.
 * @example
 * var incValues = _.mapValuesWith(_.add(1));
 * var results = {
 *     first: 10,
 *     second: 5,
 *     third: 3
 * };
 *
 * incValues(results) // => {first: 11, second: 6, third: 4}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValues|mapValues}
 * @since 0.54.0
 * @function mapValuesWith
 * @param {Function} fn
 * @returns {Function}
 */
export default _curry2(mapValues, true);
