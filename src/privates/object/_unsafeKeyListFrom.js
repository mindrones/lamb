import isNil from "@type/isNil";
import _curry2 from "@privates/currying/_curry2";
import {_makeTypeErrorFor} from "@privates/type";

/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function _unsafeKeyListFrom
 * @param {Function} getKeys
 * @returns {Function}
 */
export default _curry2(function (getKeys, obj) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    return getKeys(obj);
});
