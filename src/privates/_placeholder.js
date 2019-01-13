/**
 * The placeholder.
 * (public, TODO remove @private)
 * @type {Object}
 * @private
 */
export var _placeholder = {};

/**
 * Gets the current public placeholder.
 * (public, TODO remove @private)
 * @private
 * @returns {*}
 */
export function _getPlaceholder () {
    return _placeholder;
}

/**
 * Sets the current public placeholder.
 * (public, TODO remove @private)
 * @private
 * @param {*} value
 * @returns {*}
 */
export function _setPlaceholder (value) {
    _placeholder = value;

    return _placeholder;
}

/**
 * Checks whether the given value is the internal or the public placeholder.
 * @private
 * @param {*} value
 * @returns {Boolean}
 */
export function _isPlaceholder (value) {
    return value === _placeholder;
}

export function _hasPlaceholder (value) {
    return value
        && value._getPlaceholder !== undefined
        && _isPlaceholder(value._getPlaceholder());
}
