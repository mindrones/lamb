import {_merge} from "../privates/object";
import partial from "../core/partial";
import enumerables from "../object/enumerables";

/**
 * Merges the enumerable properties of the provided sources into a new object.<br/>
 * In case of key homonymy each source has precedence over the previous one.
 * @example
 * _.merge({a: 1}, {b: 3, c: 4}, {b: 5}) // => {a: 1, b: 5, c: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.merge({a: 2}, 99, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
 * @since 0.10.0
 * @function merge
 * @param {...Object} source
 * @returns {Object}
 */
export default partial(_merge, [enumerables]);
