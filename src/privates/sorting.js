import {map} from "../array_basics";
import identity from "../core/identity";
import {_comparer} from "./comparison";

/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */
export function _makeCriteria (sorters) {
    return sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
}

/**
 * Converts a sorting function to a sorting criterion if necessary.
 * @private
 * @param {Function} criterion
 * @returns {Sorter}
 */
function _makeCriterion (criterion) {
    return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}

/**
 * Builds a sorting criterion. If the comparer function is missing, the default
 * comparer will be used instead.
 * @private
 * @param {Function} reader
 * @param {Boolean} isDescending
 * @param {Function} [comparer]
 * @returns {Sorter}
 */
export function _sorter (reader, isDescending, comparer) {
    if (typeof reader !== "function" || reader === identity) {
        reader = null;
    }

    if (typeof comparer !== "function") {
        comparer = _comparer;
    }

    return {
        isDescending: isDescending === true,
        compare: function (a, b) {
            if (reader) {
                a = reader(a);
                b = reader(b);
            }

            return comparer(a, b);
        }
    };
}
