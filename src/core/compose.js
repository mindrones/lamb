import identity from "./identity";

/**
 * Returns a function that is the composition of the functions given as parameters.
 * Each function consumes the result of the function that follows.
 * @example
 * var sayHi = function (name) { return "Hi, " + name; };
 * var capitalize = function (s) {
 *     return s[0].toUpperCase() + s.substr(1).toLowerCase();
 * };
 * var fixNameAndSayHi = _.compose(sayHi, capitalize);
 *
 * sayHi("bOb") // => "Hi, bOb"
 * fixNameAndSayHi("bOb") // "Hi, Bob"
 *
 * var users = [{name: "fred"}, {name: "bOb"}];
 * var sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
 *
 * _.map(users, sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.pipe|pipe}
 * @since 0.1.0
 * @param {...Function} fn
 * @returns {Function}
 */
export default function compose () {
    var functions = arguments;
    var len = functions.length;

    return len ? function () {
        var idx = len - 1;
        var result = functions[idx].apply(this, arguments);

        while (idx--) {
            result = functions[idx].call(this, result);
        }

        return result;
    } : identity;
}
