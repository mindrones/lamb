import forEach from "@array_basics/forEach";
import reduce from "@array_basics/reduce";
import _argsTail from "@privates/args/_argsTail";

/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {...Object} source
 * @returns {Object}
 */
export default function _merge (getKeys) {
    return reduce(_argsTail.apply(null, arguments), function (result, source) {
        forEach(getKeys(source), function (key) {
            result[key] = source[key];
        });

        return result;
    }, {});
}
