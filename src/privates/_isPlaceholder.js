import { _getPlaceholder, _internalPlaceholder as _ } from "./_placeholder";

/**
 * Checks whether the given value is the internal or the public placeholder.
 * @private
 * @param {*} value
 * @returns {Boolean}
 */
function _isPlaceholder (value) {
    return value === _ || value === _getPlaceholder();
}

export default _isPlaceholder;
