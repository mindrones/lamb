import {_objectProto} from "@src/utils";
import getIn from "@accessors/getIn";
import forEach from "@array_basics/forEach";
import map from "@array_basics/map";
import reduce from "@array_basics/reduce";
import slice from "@array_basics/slice";
import compose from "@core/compose";
import generic from "@core/generic";
import partial from "@core/partial";
import isNil from "@type/isNil";
import isNull from "@type/isNull";
import isUndefined from "@type/isUndefined";
import {_argsTail} from "./args";
import {_isArrayIndex, _setIndex} from "./array";
import {_curry2} from "./currying";
import {_makeTypeErrorFor} from "./type";

/**
 * Checks whether the specified key is an enumerable property of the given object or not.
 * @private
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
export function _isEnumerable (obj, key) {
    return key in Object(obj) && (_isOwnEnumerable(obj, key) || ~_safeEnumerables(obj).indexOf(key));
}

/**
 * Checks if a path is valid in the given object and retrieves the path target.
 * @private
 * @param {Object} obj
 * @param {String[]} parts
 * @param {Boolean} walkNonEnumerables
 * @returns {Object}
 */
export function _getPathInfo (obj, parts, walkNonEnumerables) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    var target = obj;
    var i = -1;
    var len = parts.length;
    var key;

    while (++i < len) {
        key = _getPathKey(target, parts[i], walkNonEnumerables);

        if (isUndefined(key)) {
            break;
        }

        target = target[key];
    }

    return i === len ? {isValid: true, target: target} : {isValid: false, target: void 0};
}

/**
 * Helper to retrieve the correct key while evaluating a path.
 * @private
 * @param {Object} target
 * @param {String} key
 * @param {Boolean} includeNonEnumerables
 * @returns {String|Number|Undefined}
 */
export function _getPathKey (target, key, includeNonEnumerables) {
    if (includeNonEnumerables && key in Object(target) || _isEnumerable(target, key)) {
        return key;
    }

    var n = +key;
    var len = target && target.length;

    return n >= -len && n < len ? n < 0 ? n + len : n : void 0;
}

/**
 * Makes an object immutable by recursively calling <code>Object.freeze</code>
 * on its members.
 * @private
 * @param {Object} obj
 * @param {Array} seen
 * @returns {Object} The obj parameter itself, not a copy.
 */
export function _immutable (obj, seen) {
    if (seen.indexOf(obj) === -1) {
        seen.push(Object.freeze(obj));

        forEach(Object.getOwnPropertyNames(obj), function (key) {
            var value = obj[key];

            if (typeof value === "object" && !isNull(value)) {
                _immutable(value, seen);
            }
        });
    }

    return obj;
}

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * optionally received by {@link module:lamb.invoker|invoker}, with the final set of, also
 * optional, <code>args</code>.
 * @private
 * @param {Array} boundArgs
 * @param {String} methodName
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */
export function _invoker (boundArgs, methodName, target) {
    var method = target[methodName];

    if (typeof method !== "function") {
        return void 0;
    }

    var boundArgsLen = boundArgs.length;
    var ofs = 3 - boundArgsLen;
    var len = arguments.length - ofs;
    var args = Array(len);

    for (var i = 0; i < boundArgsLen; i++) {
        args[i] = boundArgs[i];
    }

    for (; i < len; i++) {
        args[i] = arguments[i + ofs];
    }

    return method.apply(target, args);
}

/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
export var _isOwnEnumerable = generic(_objectProto.propertyIsEnumerable);

/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function
 * @param {Object} obj
 * @returns {Function}
 */
export var _keyToPairIn = _curry2(function (obj, key) {
    return [key, obj[key]];
});

/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {...Object} source
 * @returns {Object}
 */
export function _merge (getKeys) {
    return reduce(_argsTail.apply(null, arguments), function (result, source) {
        forEach(getKeys(source), function (key) {
            result[key] = source[key];
        });

        return result;
    }, {});
}

/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
export var _pairsFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), _keyToPairIn(obj));
});

/**
 * Builds a list of the enumerable properties of an object.
 * The function is null-safe, unlike the public one.
 * @private
 * @param {Object} obj
 * @returns {String[]}
 */
export function _safeEnumerables (obj) {
    var result = [];

    for (var key in obj) {
        result.push(key);
    }

    return result;
}

/**
 * A null-safe version of <code>Object.keys</code>.
 * @private
 * @function
 * @param {Object} obj
 * @returns {String[]}
 */
export var _safeKeys = compose(Object.keys, Object);

/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
export function _setIn (source, key, value) {
    var result = {};

    for (var prop in source) {
        result[prop] = source[prop];
    }

    result[key] = value;

    return result;
}

/**
 * Sets the object's property targeted by the given path to the desired value.<br/>
 * Works with arrays and is able to set their indexes, even negative ones.
 * @private
 * @param {Object|Array} obj
 * @param {String[]} parts
 * @param {*} value
 * @returns {Object|Array}
 */
export function _setPathIn (obj, parts, value) {
    var key = parts[0];
    var partsLen = parts.length;
    var v;

    if (partsLen === 1) {
        v = value;
    } else {
        var targetKey = _getPathKey(obj, key, false);

        v = _setPathIn(
            isUndefined(targetKey) ? targetKey : obj[targetKey],
            slice(parts, 1, partsLen),
            value
        );
    }

    return _isArrayIndex(obj, key) ? _setIndex(obj, key, v) : _setIn(obj, key, v);
}

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create an array containing a list
 * of the keys in its first index and the corresponding list of values
 * in the second one.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
export var _tearFrom = _curry2(function (getKeys, obj) {
    return reduce(getKeys(obj), function (result, key) {
        result[0].push(key);
        result[1].push(obj[key]);

        return result;
    }, [[], []]);
});

/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
export var _unsafeKeyListFrom = _curry2(function (getKeys, obj) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    return getKeys(obj);
});

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
export var _valuesFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), partial(getIn, [obj]));
});
