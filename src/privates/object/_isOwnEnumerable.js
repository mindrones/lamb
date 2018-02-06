import {_objectProto} from "@src/utils";
import generic from "@core/generic";

/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function _isOwnEnumerable
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
export default generic(_objectProto.propertyIsEnumerable);
