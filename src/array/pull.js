import {_curry2} from "@privates/currying";
import pullFrom from "./pullFrom";

/**
 * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
 * a list of values to build a function waiting for an array-like object.<br/>
 * The new function will create an array copy of the array-like without
 * the specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var scores = [40, 20, 30, 10];
 * var newScores = [30, 10];
 * var pullNewScores = _.pull(newScores);
 *
 * pullNewScores(scores) // => [40, 20]
 *
 * @memberof module:lamb
 * @category Array
 * @function pull
 * @see {@link module:lamb.pullFrom|pullFrom}
 * @since 0.45.0
 * @param {ArrayLike} values
 * @returns {Function}
 */
export default _curry2(pullFrom, true);
