import list from "../array_basics/list";

/**
 * Accepts a series of predicates and builds a new one that returns true if they are all satisfied
 * by the same arguments. The functions in the series will be applied one at a time until a
 * <code>false</code> value is produced, which is returned immediately.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var isPositiveEven = _.allOf(isEven, _.isGT(0));
 *
 * isPositiveEven(-2) // => false
 * isPositiveEven(11) // => false
 * isPositiveEven(6) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.anyOf|anyOf}
 * @since 0.1.0
 * @param {...Function} predicate
 * @returns {Function}
 */
export default function allOf () {
    var predicates = list.apply(null, arguments);

    return function () {
        for (var i = 0, len = predicates.length; i < len; i++) {
            if (!predicates[i].apply(this, arguments)) {
                return false;
            }
        }

        return true;
    };
}
