/**
 * Using the provided iteratee, builds a function that will return an array comprised of the
 * unique elements of an array-like object. The values being compared are the ones returned by
 * the iteratee.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniques|uniques} if you don't need to transform your values before the
 * comparison.
 * @example
 * var data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * var uniquesById = _.uniquesBy(_.getKey("id"));
 *
 * uniquesById(data) // => [{id: "1", name: "John"}, {id: "4", name: "Jane"}, {id: "5", name: "Joe"}]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.uniques|uniques}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
export default function uniquesBy (iteratee) {
    return function (arrayLike) {
        var result = [];
        var len = arrayLike.length;

        for (var i = 0, seen = [], hasNaN = false, value; i < len; i++) {
            value = iteratee(arrayLike[i], i, arrayLike);

            if (value === value) { // eslint-disable-line no-self-compare
                if (seen.indexOf(value) === -1) {
                    seen[seen.length] = value;
                    result[result.length] = arrayLike[i];
                }
            } else if (!hasNaN) {
                hasNaN = true;
                result[result.length] = arrayLike[i];
            }
        }

        return result;
    };
}
