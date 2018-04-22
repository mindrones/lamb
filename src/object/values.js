import {_valuesFrom} from "../privates/object";
import enumerables from "./enumerables";

/**
 * Generates an array with the values of the enumerable properties of the given object.<br/>
 * See also {@link module:lamb.ownValues|ownValues} to pick only from the own properties of the object.
 * @example
 * var user = {name: "john", surname: "doe", age: 30};
 *
 * _.values(user) // => ["john", "doe", 30]
 *
 * @memberof module:lamb
 * @category Object
 * @function values
 * @see {@link module:lamb.ownValues|ownValues}
 * @since 0.1.0
 * @param {Object} obj
 * @returns {Array}
 */
export default _valuesFrom(enumerables);
