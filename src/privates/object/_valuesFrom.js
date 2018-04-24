import getIn from "@accessors/getIn";
import map from "@array_basics/map";
import partial from "@core/partial";
import _curry2 from "@privates/currying/_curry2";

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function _valuesFrom
 * @param {Function} getKeys
 * @returns {Function}
 */
export default _curry2(function (getKeys, obj) {
    return map(getKeys(obj), partial(getIn, [obj]));
});
