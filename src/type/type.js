import {_objectProto} from "../_intro";

/**
 * Retrieves the "type tag" from the given value.
 * @example
 * var x = 5;
 * var y = new Number(5);
 *
 * typeof x // => "number"
 * typeof y // => "object"
 * _.type(x) // => "Number"
 * _.type(y) // => "Number"
 *
 * _.type(Object.prototype.toString) // => "Function"
 * _.type(/a/) // => "RegExp"
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.9.0
 * @param {*} value
 * @returns {String}
 */
export function type (value) {
    return _objectProto.toString.call(value).slice(8, -1);
}
