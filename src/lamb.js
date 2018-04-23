import {versionObj} from "@src/utils";

var lamb = Object.create(null);

export var _placeholder = lamb; // default value for public placeholder

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
    "@@lamb/version": versionObj
});

export default lamb;
