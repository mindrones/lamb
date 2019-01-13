import { _hasPlaceholder } from "./_placeholder";

/**
 * Keeps building a partial application of the received function as long
 * as it's called with placeholders; applies the original function to
 * the collected parameters otherwise.<br/>
 * The function checks only the public placeholder to gain a little performance
 * as no function in Lamb is built with {@link module:lamb.asPartial|asPartial}.
 * @private
 * @param {Function} fn
 * @param {Array} argsHolder
 * @returns {Function|*}
 */
function _asPartial (fn, argsHolder) {
    return function () { // eslint-disable-line max-statements
        var argsLen = arguments.length;
        var lastIdx = 0;
        var newArgs = [];

        for (var i = 0, len = argsHolder.length, boundArg; i < len; i++) {
            boundArg = argsHolder[i];
            newArgs[i] = _hasPlaceholder(boundArg) && lastIdx < argsLen ? arguments[lastIdx++] : boundArg;
        }

        while (lastIdx < argsLen) {
            newArgs[i++] = arguments[lastIdx++];
        }

        for (i = 0; i < argsLen; i++) {
            if (_hasPlaceholder(arguments[i])) {
                return _asPartial(fn, newArgs);
            }
        }

        for (i = 0, len = newArgs.length; i < len; i++) {
            if (_hasPlaceholder(newArgs[i])) {
                newArgs[i] = void 0;
            }
        }

        return fn.apply(this, newArgs);
    };
}

export default _asPartial;
