import isNull from "./isNull";
import isUndefined from "./isUndefined";

/**
 * Verifies if a value is <code>null</code> or <code>undefined</code>.
 * @example
 * _.isNil(NaN) // => false
 * _.isNil({}) // => false
 * _.isNil(null) // => true
 * _.isNil(void 0) // => true
 * _.isNil() // => true
 *
 * @memberof module:lamb
 * @category Type
 * @since 0.1.0
 * @see {@link module:lamb.isNull|isNull}
 * @see {@link module:lamb.isUndefined|isUndefined}
 * @param {*} value
 * @returns {Boolean}
 */
export default function isNil (value) {
    return isNull(value) || isUndefined(value);
}
