import {_isPlaceholder} from "../_intro";

/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * var f1 = _.partial(_.list, ["a", "b", "c"]);
 * var f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * var f1 = _.partial(_.list, ["a", _, _, "d"]);
 * var f2 = _.partialRight(_.list, ["a", _, _, "d"]);
 *
 * f1("b", "c", "e") // => ["a", "b", "c", "d", "e"]
 * f2("b", "c", "e") // => ["b", "a", "c", "e", "d"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.@@lamb/placeholder|@@lamb/placeholder}
 * @param {Function} fn
 * @param {Array} args
 * @since 0.52.0
 * @returns {Function}
 */
export default function partialRight (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = arguments.length - 1;
        var argsLen = args.length;
        var boundArgs = Array(argsLen);
        var newArgs = [];

        for (var i = argsLen - 1, boundArg; i > -1; i--) {
            boundArg = args[i];
            boundArgs[i] = _isPlaceholder(boundArg) ? arguments[lastIdx--] : boundArg;
        }

        for (i = 0; i <= lastIdx; i++) {
            newArgs[i] = arguments[i];
        }

        for (var j = 0; j < argsLen; j++) {
            newArgs[i++] = boundArgs[j];
        }

        return fn.apply(this, newArgs);
    };
}
