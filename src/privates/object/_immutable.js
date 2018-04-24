import forEach from "@array_basics/forEach";
import isNull from "@type/isNull";

/**
 * Makes an object immutable by recursively calling <code>Object.freeze</code>
 * on its members.
 * @private
 * @param {Object} obj
 * @param {Array} seen
 * @returns {Object} The obj parameter itself, not a copy.
 */
export default function _immutable (obj, seen) {
    if (seen.indexOf(obj) === -1) {
        seen.push(Object.freeze(obj));

        forEach(Object.getOwnPropertyNames(obj), function (key) {
            var value = obj[key];

            if (typeof value === "object" && !isNull(value)) {
                _immutable(value, seen);
            }
        });
    }

    return obj;
}
