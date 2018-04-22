import isUndefined from "../type/isUndefined";
import list from "../array_basics/list";

/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in sinergy with {@link module:lamb.case|case} and
 * {@link module:lamb.invoker|invoker}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var filterString = _.compose(_.invoker("join", ""), _.filter);
 * var filterAdapter = _.adapter(
 *     _.invoker("filter"),
 *     _.case(_.isType("String"), filterString)
 * );
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // obviously it's composable
 * var filterWithDefault = _.adapter(filterAdapter, _.always("Not implemented"));
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.case|case}
 * @see {@link module:lamb.invoker|invoker}
 * @since 0.6.0
 * @param {...Function} fn
 * @returns {Function}
 */
export default function adapter () {
    var functions = list.apply(null, arguments);

    return function () {
        var len = functions.length;
        var result;

        for (var i = 0; i < len; i++) {
            result = functions[i].apply(this, arguments);

            if (!isUndefined(result)) {
                break;
            }
        }

        return result;
    };
}