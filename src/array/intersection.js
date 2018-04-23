import contains from "@array_basics/contains";
import everyIn from "@array_basics/everyIn";
import filter from "@array_basics/filter";
import {_argsTail} from "@privates/args";
import uniques from "./uniques";

/**
 * Returns an array of every unique item that is included in all given arrays or array-like objects.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var a1 = [1, 2, 3, 4];
 * var a2 = [2, 5, 4, 2, 6];
 * var a3 = [5, 6, 7];
 *
 * _.intersection(a1, a2) // => [2, 4]
 * _.intersection(a2, a3) // => [5, 6]
 * _.intersection(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.5.0
 * @param {...ArrayLike} arrayLike
 * @returns {Array}
 */
export default function intersection () {
    if (arguments.length === 0) {
        return [];
    }

    var rest = _argsTail.apply(null, arguments);

    return filter(uniques(arguments[0]), function (item) {
        return everyIn(rest, contains(item));
    });
}
