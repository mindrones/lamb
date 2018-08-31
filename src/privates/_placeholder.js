var _placeholder = {};

/**
 * Gets the current public placeholder.
 * @private
 * @returns {*}
 */
export function _getPlaceholder () {
    return _placeholder;
}

/**
 * Sets the current public placeholder.
 * @private
 * @param {*} value
 * @returns {*}
 */
export function _setPlaceholder (value) {
    _placeholder = value;

    return _placeholder;
}

/**
 * The internal placeholder.
 * @type {Object}
 * @private
 */
export var _internalPlaceholder = {};
