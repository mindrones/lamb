import list from "../array_basics/list";
import compose from "../core/compose";
import drop from "./drop";
import flatMapWith from "./flatMapWith";
import uniquesBy from "./uniquesBy";

/**
 * Using the provided iteratee, builds a function that will return an array of the unique elements
 * in the provided array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.union|union} if you don't need to transform the values.
 * @example
 * var unionByFloor = _.unionBy(Math.floor);
 *
 * unionByFloor([2.8, 3.2, 1.5], [3.5, 1.2, 4]) // => [2.8, 3.2, 1.5, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.union|union}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
export default function unionBy (iteratee) {
    return compose(uniquesBy(iteratee), flatMapWith(drop(0)), list);
}
