/**
 * Builds helper functions to extract portions of the arguments
 * object rather efficiently without having to write for loops
 * manually for each case.<br/>
 * The arguments object needs to be passed to the apply method
 * of the generated function.
 * @private
 * @param {Number} idx
 * @returns {Function}
 */
export function _argsToArrayFrom (idx) {
    return function () {
        var argsLen = arguments.length || idx;
        var len = argsLen - idx;
        var result = Array(len);

        for (var i = 0; i < len; i++) {
            result[i] = arguments[i + idx];
        }

        return result;
    };
}

/**
 * Builds an array with the received arguments excluding the first one.<br/>
 * To be used with the arguments object, which needs to be passed to the apply
 * method of this function.
 * @private
 * @function
 * @param {...*} value
 * @returns {Array}
 */
export const _argsTail = _argsToArrayFrom(1);
