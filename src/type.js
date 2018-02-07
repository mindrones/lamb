import {_objectProto} from "./_intro";

/**
 * Accepts a constructor and builds a predicate expecting an object,
 * which will be tested to verify whether the prototype of the constructor
 * is in its prototype chain.<br/>
 * Wraps in a convenient way the native
 * [instanceof]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof} operator.
 * @example
 * function SomeObjA () {}
 *
 * var a = new SomeObjA();
 * var sObj = new String("foo");
 * var s = "foo";
 *
 * _.isInstanceOf(Object)(a) // => true
 * _.isInstanceOf(SomeObjA)(a) // => true
 *
 * _.isInstanceOf(Object)(sObj) // => true
 * _.isInstanceOf(String)(sObj) // => true
 *
 * _.isInstanceOf(Object)(s) // => false
 * _.isInstanceOf(String)(s) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.47.0
 * @param {*} constructor
 * @returns {Function}
 */
export function isInstanceOf (constructor) {
    return function (obj) {
        return obj instanceof constructor;
    };
}

/**
 * Builds a predicate that expects a value to check against the specified type.
 * @example
 * var isString = _.isType("String");
 *
 * isString("Hello") // => true
 * isString(new String("Hi")) // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.type|type}
 * @since 0.1.0
 * @param {String} typeName
 * @returns {Function}
 */
export function isType (typeName) {
    return function (value) {
        return type(value) === typeName;
    };
}

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

lamb.isInstanceOf = isInstanceOf;
lamb.isNil = isNil;
lamb.isNull = isNull;
lamb.isType = isType;
lamb.isUndefined = isUndefined;
lamb.type = type;
