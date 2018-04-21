import list from "../array_basics/list";

/**
 * Accepts a series of predicates and builds a new one that returns true if at least one of them is
 * satisfied by the received arguments. The functions in the series will be applied one at a time
 * until a <code>true</code> value is produced, which is returned immediately.
 * @example
 * var users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * var isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * var isSuperUser = _.anyOf(isInGroup("admin"), isInGroup("root"));
 *
 * isSuperUser(users[0]) // => false
 * isSuperUser(users[1]) // => true
 * isSuperUser(users[2]) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.allOf|allOf}
 * @since 0.1.0
 * @param {...Function} predicate
 * @returns {Function}
 */
export default function anyOf () {
    var predicates = list.apply(null, arguments);

    return function () {
        for (var i = 0, len = predicates.length; i < len; i++) {
            if (predicates[i].apply(this, arguments)) {
                return true;
            }
        }

        return false;
    };
}
