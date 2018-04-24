import map from "@array_basics/map";
import _curry2 from "@privates/currying/_curry2";
import _keyToPairIn from "./_keyToPairIn";

/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function _pairsFrom
 * @param {Function} getKeys
 * @returns {Function}
 */
export default _curry2(function (getKeys, obj) {
    return map(getKeys(obj), _keyToPairIn(obj));
});
