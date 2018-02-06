import list from "@array_basics/list";
import map from "@array_basics/map";
import applyTo from "@function/applyTo";

/**
 * Accepts a series of functions and builds a new function. The functions in the series
 * will then be applied, in order, with the values received by the function built with
 * <code>collect</code>.<br/>
 * The collected results will be returned in an array.
 * @example
 * var user = {
 *     id: "jdoe",
 *     name: "John",
 *     surname: "Doe",
 *     scores: [2, 4, 7]
 * };
 * var getIDAndLastScore = _.collect(_.getKey("id"), _.getPath("scores.-1"));
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * var minAndMax = _.collect(Math.min, Math.max);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {...Function} fn
 * @returns {Function}
 */
export default function collect () {
    var functions = list.apply(null, arguments);

    return function () {
        return map(functions, applyTo(arguments));
    };
}
