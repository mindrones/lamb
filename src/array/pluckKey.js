import getKey from "../accessors/getKey";
import mapWith from "../array_basics/mapWith";
import compose from "../core/compose";

/**
 * A curried version of {@link module:lamb.pluck|pluck} expecting the key to retrieve to
 * build a function waiting for the array-like object to act upon.
 * @example
 * var persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 * var getAges = _.pluckKey("age");
 *
 * getAges(persons) // => [12, 40, 18, 15]
 *
 * @memberof module:lamb
 * @category Array
 * @function pluckKey
 * @see {@link module:lamb.pluck|pluck}
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */
export default compose(mapWith, getKey);
