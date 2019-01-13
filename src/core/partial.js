import { _hasPlaceholder, _isPlaceholder } from "../privates/_placeholder";

/**
 * Builds a partially applied function. The <code>lamb</code> object itself can be
 * used as a placeholder argument and it's useful to alias it with a short symbol
 * such as <code>_</code>.<br/>
 * You can use a custom placeholder by setting the
 * {@link module:lamb.@@lamb/placeholder|@@lamb/placeholder} property.
 * @example
 * var users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * var isKeyTrue = _.partial(_.hasKeyValue, [_, true]);
 * var isActive = isKeyTrue("active");
 * var hasConfirmedMail = isKeyTrue("confirmedMail");
 *
 * _.map(users, isActive) // => [true, true, false]
 * _.map(users, hasConfirmedMail) // => [true, false, false]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.@@lamb/placeholder|@@lamb/placeholder}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Array} args
 * @returns {Function}
 */
function partial (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = 0;
        var newArgs = [];
        var argsLen = args.length;

        for (var i = 0, boundArg; i < argsLen; i++) {
            boundArg = args[i];
            newArgs[i] = (_isPlaceholder(boundArg) || _hasPlaceholder(boundArg))
                ? arguments[lastIdx++]
                : boundArg;
        }

        for (var len = arguments.length; lastIdx < len; lastIdx++) {
            newArgs[i++] = arguments[lastIdx];
        }

        return fn.apply(this, newArgs);
    };
}

export default partial;
