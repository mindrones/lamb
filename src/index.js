import { _getPlaceholder, _setPlaceholder } from "./privates/_placeholder";
import * as exports from "./exports";
import { version } from "../package.json";

var lamb = Object.create(null);

_setPlaceholder(lamb);

Object.defineProperties(lamb, {
    /**
     * The object used as a placeholder in partial application. Its default value is
     * the <code>lamb</code> object itself.<br/>
     * The property is public so that you can make Lamb use your own placeholder, however
     * you can't change it at will or the partially applied functions you defined before the
     * change won't recognize the former placeholder.
     * @alias module:lamb.@@lamb/placeholder
     * @category Special properties
     * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
     * @see {@link module:lamb.asPartial|asPartial}
     * @since 0.53.0
     * @type Object
     */
    "@@lamb/placeholder": {
        get: _getPlaceholder,
        set: _setPlaceholder
    },

    /**
     * The current library version.
     * @alias module:lamb.@@lamb/version
     * @category Special properties
     * @readonly
     * @since 0.53.0
     * @type String
     */
    "@@lamb/version": { value: version }
});

for (var prop in exports) {
    lamb[prop] = exports[prop];
}

export default lamb;
