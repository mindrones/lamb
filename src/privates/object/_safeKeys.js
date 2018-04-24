import compose from "@core/compose";

/**
 * A null-safe version of <code>Object.keys</code>.
 * @private
 * @function _safeKeys
 * @param {Object} obj
 * @returns {String[]}
 */
export default compose(Object.keys, Object);
