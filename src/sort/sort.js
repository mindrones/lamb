import {_argsTail} from "@privates/args";
import {_toArrayLength} from "@privates/array";
import {_compareWith} from "@privates/comparison";
import {_makeCriteria} from "@privates/sorting";

/**
 * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted
 * copy of an array-like object using the given criteria.<br/>
 * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you
 * can also pass simple "reader" functions and default ascending sorters will be built for you.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used
 * in the comparison.<br/>
 * Please note that if the arguments received by the default comparer aren't of the same type,
 * they will be compared as strings.
 *
 * @example <caption>Stable sort:</caption>
 * var persons = [
 *     {"name": "John", "surname" :"Doe"},
 *     {"name": "Mario", "surname": "Rossi"},
 *     {"name": "John", "surname" :"Moe"},
 *     {"name": "Jane", "surname": "Foe"}
 * ];
 *
 * var personsByName = _.sort(persons, _.getKey("name"));
 *
 * // personsByName holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Stable multi-sort:</caption>
 * var personsByNameAscSurnameDesc = _.sort(
 *     persons,
 *     _.getKey("name"),
 *     _.sorterDesc(_.getKey("surname"))
 * );
 *
 * // personsByNameAscSurnameDesc holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Using custom comparers:</caption>
 * var localeSorter = new Intl.Collator("it");
 * var chars = ["a", "è", "à", "é", "c", "b", "e"];
 *
 * _.sort(chars, localeSorter) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * var localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
 *
 * _.sort(chars, localeSorterDesc) // => ["è", "é", "e", "c", "b", "à", "a"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {ArrayLike} arrayLike
 * @param {...(Sorter|Function)} [sorter={@link module:lamb.sorter|sorter()}]
 * @returns {Array}
 */
export default function sort (arrayLike) {
    var criteria = _makeCriteria(_argsTail.apply(null, arguments));
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = {value: arrayLike[i], index: i};
    }

    result.sort(_compareWith(criteria));

    for (i = 0; i < len; i++) {
        result[i] = result[i].value;
    }

    return result;
}
