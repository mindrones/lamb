import _curry2 from "@privates/currying/_curry2";

/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function _keyToPairIn
 * @param {Object} obj
 * @returns {Function}
 */
export default _curry2(function (obj, key) {
    return [key, obj[key]];
});
