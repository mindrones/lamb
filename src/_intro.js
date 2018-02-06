/**
 * @overview <%= pkg.name %> - <%= pkg.description %>
 * @author <%= pkg.author.name %> <<%= pkg.author.email %>>
 * @version <%= pkg.version %>
 * @module lamb
 * @license <%= pkg.license %>
 * @preserve
 */

export const lamb = Object.create(null);
export const _ = {}; // internal placeholder for partial application
export let _placeholder = lamb; // default value for public placeholder

Object.defineProperties(lamb, {
    /**
     * The object used as a placeholder in partial application. Its default value is
     * the <code>lamb</code> object itself.<br/>
     * The property is public so that you can make Lamb use your own placeholder, however
     * you can't change it at will or the partially applied functions you defined before the
     * change won't recognize the former placeholder.
     * @memberof module:lamb
     * @category Special properties
     * @alias @@lamb/placeholder
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
     * @see {@link module:lamb.asPartial|asPartial}
     * @since 0.53.0
     * @type Object
     */
    "@@lamb/placeholder": {
        get: function () {
            return _placeholder;
        },
        set: function (value) {
            _placeholder = value;
        }
    },

    /**
     * The current library version.
     * @memberof module:lamb
     * @category Special properties
     * @alias @@lamb/version
     * @readonly
     * @since 0.53.0
     * @type String
     */
    "@@lamb/version": {value: "<%= pkg.version %>"}
});

/**
 * Checks whether the given value is the internal or the public placeholder.
 * @private
 * @param {*} value
 * @returns {Boolean}
 */
export function _isPlaceholder (value) {
    return value === _ || value === _placeholder;
}

// prototype shortcuts
export const _objectProto = Object.prototype;
export const _stringProto = String.prototype;

// constants
export const MAX_ARRAY_LENGTH = 4294967295;
