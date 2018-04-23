import slice from "@array_basics/slice";
import clamp from "@math/clamp";
import {MAX_ARRAY_LENGTH} from "@src/utils";
import {_curry2} from "./currying";
import {_toInteger} from "./number";
import {_isEnumerable} from "./object";

/**
 * Flattens an array.
 * @private
 * @param {Array} array - The source array
 * @param {Boolean} isDeep - Whether to perform a deep flattening or not
 * @param {Array} output - An array to collect the result
 * @param {Number} idx - The next index to be filled in the output
 * @returns {Array} The output array filled with the results
 */
export function _flatten (array, isDeep, output, idx) {
    for (var i = 0, len = array.length, value, j, vLen; i < len; i++) {
        value = array[i];

        if (!Array.isArray(value)) {
            output[idx++] = value;
        } else if (isDeep) {
            _flatten(value, true, output, idx);
            idx = output.length;
        } else {
            vLen = value.length;
            output.length += vLen;

            for (j = 0; j < vLen; j++) {
                output[idx++] = value[j];
            }
        }
    }

    return output;
}

/**
 * Establishes at which index an element should be inserted in a sorted array to respect
 * the array order. Needs the comparer used to sort the array.
 * @private
 * @param {Array} array
 * @param {*} element
 * @param {Function} comparer
 * @param {Number} start
 * @param {Number} end
 * @returns {Number}
 */
export function _getInsertionIndex (array, element, comparer, start, end) {
    if (array.length === 0) {
        return 0;
    }

    var pivot = (start + end) >> 1;
    var result = comparer(
        {value: element, index: pivot},
        {value: array[pivot], index: pivot}
    );

    if (end - start <= 1) {
        return result < 0 ? pivot : pivot + 1;
    } else if (result < 0) {
        return _getInsertionIndex(array, element, comparer, start, pivot);
    } else if (result === 0) {
        return pivot + 1;
    } else {
        return _getInsertionIndex(array, element, comparer, pivot, end);
    }
}

/**
 * Gets the number of consecutive elements satisfying a predicate in an array-like object.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
export function _getNumConsecutiveHits (arrayLike, predicate) {
    var idx = 0;
    var len = arrayLike.length;

    while (idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
        idx++;
    }

    return idx;
}

/**
 * Builds a "grouping function" for an array-like object.
 * @private
 * @param {Function} makeValue
 * @returns {Function}
 */
export function _groupWith (makeValue) {
    return function (arrayLike, iteratee) {
        var result = {};
        var len = arrayLike.length;

        for (var i = 0, element, key; i < len; i++) {
            element = arrayLike[i];
            key = iteratee(element, i, arrayLike);
            result[key] = makeValue(result[key], element);
        }

        return result;
    };
}

/**
 * Accepts a target object and a key name and verifies that the target is an array and that
 * the key is an existing index.
 * @private
 * @param {Object} target
 * @param {String|Number} key
 * @returns {Boolean}
 */
export function _isArrayIndex (target, key) {
    var n = +key;

    return Array.isArray(target) && n % 1 === 0 && !(n < 0 && _isEnumerable(target, key));
}

/**
 * Helper to build the {@link module:lamb.everyIn|everyIn} or the
 * {@link module:lamb.someIn|someIn} function.
 * @private
 * @param {Boolean} defaultResult
 * @returns {Function}
 */
export function _makeArrayChecker (defaultResult) {
    return function (arrayLike, predicate) {
        for (var i = 0, len = arrayLike.length; i < len; i++) {
            if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
                return !defaultResult;
            }
        }

        return defaultResult;
    };
}

/**
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function
 * @param {Boolean} isDeep
 * @returns {Function}
 */
export const _makeArrayFlattener = _curry2(function (isDeep, array) {
    return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});

/**
 * Builds a reduce function. The <code>step</code> parameter must be <code>1</code>
 * to build  {@link module:lamb.reduce|reduce} and <code>-1</code> to build
 * {@link module:lamb.reduceRight|reduceRight}.
 * @private
 * @param {Number} step
 * @returns {Function}
 */
export function _makeReducer (step) {
    return function (arrayLike, accumulator, initialValue) {
        var len = _toArrayLength(arrayLike.length);
        var idx = step === 1 ? 0 : len - 1;
        var nCalls;
        var result;

        if (arguments.length === 3) {
            nCalls = len;
            result = initialValue;
        } else {
            if (len === 0) {
                throw new TypeError("Reduce of empty array-like with no initial value");
            }

            result = arrayLike[idx];
            idx += step;
            nCalls = len - 1;
        }

        for (; nCalls--; idx += step) {
            result = accumulator(result, arrayLike[idx], idx, arrayLike);
        }

        return result;
    };
}

/**
 * Sets an index in an array-like object.<br/>
 * If provided with an updater function it will use it to update the current value,
 * otherwise sets the index to the specified value.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {Number} idx
 * @param {*} [value]
 * @param {Function} [updater]
 * @returns {Array}
 */
export function _setIndex (arrayLike, idx, value, updater) {
    var result = slice(arrayLike, 0, arrayLike.length);
    var n = _toNaturalIndex(idx, result.length);

    if (n === n) { // eslint-disable-line no-self-compare
        result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
    }

    return result;
}

/**
 * Converts a value to a valid array length, thus an integer within
 * <code>0</code> and <code>2<sup>32</sup> - 1</code> (both included).
 * @private
 * @param {*} value
 * @returns {Number}
 */
export function _toArrayLength (value) {
    return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}

/**
 * Checks if the given number, even negative, represents an array-like index
 * within the provided length. If so returns its natural number equivalent.<br/>
 * Returns <code>NaN<code> otherwise.
 * @private
 * @param {Number} idx
 * @param {Number} len
 * @returns {Number}
 */
export function _toNaturalIndex (idx, len) {
    idx = _toInteger(idx);

    return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
}
