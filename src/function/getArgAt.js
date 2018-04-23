import {_toNaturalIndex} from "@privates/array";

/**
 * Builds a function that returns the argument received at the given index.<br/>
 * As with {@link module:lamb.getAt|getAt} negative indexes are allowed.<br/>
 * The resulting function will return <code>undefined</code> if no arguments are
 * passed or if the index is out of bounds.
 * @example
 * var getFirstArg = getArgAt(0);
 * var getLastArg = getArgAt(-1);
 *
 * getFirstArg(1, 2, 3) // => 1
 * getLastArg(1, 2, 3) // => 3
 *
 * getArgAt()(1, 2, 3) // => undefined
 * getArgAt(6)(1, 2, 3) // => undefined
 * getArgAt(1)() // => undefined
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.17.0
 * @param {Number} idx
 * @returns {Function}
 */
export default function getArgAt (idx) {
    return function () {
        return arguments[_toNaturalIndex(idx, arguments.length)];
    };
}
