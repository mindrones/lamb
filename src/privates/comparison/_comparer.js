import areSVZ from "@logic/areSVZ";

/**
 * The default comparer for sorting functions.<br/>
 * If the given values are of different types they
 * will be both converted to strings.<br/>
 * Uses the SameValueZero comparison.
 * @private
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1 | 0 | 1
 */
export default function _comparer (a, b) {
    var result = 0;

    if (typeof a !== typeof b) {
        a = String(a);
        b = String(b);
    }

    /* eslint-disable no-self-compare */

    if (!areSVZ(a, b)) {
        if (a > b || a !== a) {
            result = 1;
        } else if (a < b || b !== b) {
            result = -1;
        }
    }

    /* eslint-enable no-self-compare */

    return result;
}
