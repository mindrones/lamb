import {_argsToArrayFrom} from "@privates/args";

/**
 * Generates an array with the values passed as arguments.<br/>
 * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function list
 * @since 0.1.0
 * @param {...*} value
 * @returns {Array}
 */
export default _argsToArrayFrom(0);
