/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */
export function _forceToNumber (value) {
    var n = +value;

    return n === n ? n : 0; // eslint-disable-line no-self-compare
}

/**
 * Converts a value to an integer.
 * @private
 * @param {*} value
 * @returns {Number}
 */
export function _toInteger (value) {
    var n = +value;

    if (n !== n) { // eslint-disable-line no-self-compare
        return 0;
    } else if (n % 1 === 0) {
        return n;
    } else {
        return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
    }
}
