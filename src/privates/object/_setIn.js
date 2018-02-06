/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
export default function _setIn (source, key, value) {
    var result = {};

    for (var prop in source) {
        result[prop] = source[prop];
    }

    result[key] = value;

    return result;
}
