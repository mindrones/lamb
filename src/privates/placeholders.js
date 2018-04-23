import {_placeholder} from "@src/lamb";

export const _ = {}; // internal placeholder for partial application

/**
 * Checks whether the given value is the internal or the public placeholder.
 * @private
 * @param {*} value
 * @returns {Boolean}
 */
export function _isPlaceholder (value) {
    return value === _ || value === _placeholder;
}
