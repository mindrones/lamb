/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * var add5 = _.add(5);
 *
 * _.add5(4) // => 9
 * _.add5(-2) // => 3
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.sum|sum}
 * @since 0.1.0
 * @param {Number} a
 * @returns {Function}
 */
var add = _curry2(sum, true);

/**
 * "Clamps" a number within the given limits, both included.<br/>
 * The function will convert to number all its parameters before starting any
 * evaluation, and will return <code>NaN</code> if <code>min</code> is greater
 * than <code>max</code>.
 * @example
 * _.clamp(-5, 0, 10) // => 0
 * _.clamp(5, 0, 10) // => 5
 * _.clamp(15, 0, 10) // => 10
 * _.clamp(0, 0, 10) // => 0
 * _.clamp(10, 0, 10) // => 10
 * _.is(_.clamp(-0, 0, 10), -0) // => true
 * _.clamp(10, 20, 15) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.clampWithin|clampWithin}
 * @since 0.13.0
 * @param {Number} n
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function clamp (n, min, max) {
    n = +n;
    min = +min;
    max = +max;

    if (min > max) {
        return NaN;
    } else {
        return n < min ? min : n > max ? max : n;
    }
}

/**
 * A curried version of {@link module:lamb.clamp|clamp}, expecting a <code>min</code>
 * and a <code>max</code> value, that builds a function waiting for the number to clamp.
 * @example
 * _.clampWithin(0, 10)(-5) // => 0
 * _.clampWithin(0, 10)(5) // => 5
 * _.clampWithin(0, 10)(15) // => 10
 * _.clampWithin(0, 10)(0) // => 0
 * _.clampWithin(0, 10)(10) // => 10
 * _.is(_.clampWithin(0, 10)(-0), -0) // => true
 * _.clampWithin(20, 15)(10) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.clamp|clamp}
 * @since 0.47.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
var clampWithin = _makePartial3(clamp);

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * var deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var deduct = _curry2(subtract, true);

/**
 * Divides two numbers.
 * @example
 * _.divide(5, 2) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.divideBy|divideBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function divide (a, b) {
    return a / b;
}

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * var halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var divideBy = _curry2(divide, true);

/**
 * Generates a sequence of values of the desired length with the provided iteratee.
 * The values being iterated, and received by the iteratee, are the results generated so far.
 * @example
 * var fibonacci = function (n, idx, results) {
 *     return n + (results[idx - 1] || 0);
 * };
 *
 * _.generate(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.range|range}
 * @since 0.21.0
 * @param {*} start - The starting value
 * @param {Number} len - The desired length for the sequence
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function generate (start, len, iteratee) {
    var result = [start];

    for (var i = 0, limit = len - 1; i < limit; i++) {
        result.push(iteratee(result[i], i, result));
    }

    return result;
}

/**
 * Verifies whether the received value is a finite number.<br/>
 * Behaves almost as a shim of ES6's [Number.isFinite]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isFinite(5) // => true
 * _.isFinite(new Number(5)) // => true
 * _.isFinite(Infinity) // => false
 * _.isFinite(-Infinity) // => false
 * _.isFinite("5") // => false
 * _.isFinite(NaN) // => false
 * _.isFinite(null) // => false
 *
 * @alias module:lamb.isFinite
 * @category Math
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isFinite_ (value) {
    return type(value) === "Number" && isFinite(value);
}

/**
 * Verifies whether the received value is a number and an integer.
 * Behaves almost as a shim of ES6's [Number.isInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isInteger(5) // => true
 * _.isInteger(new Number(5)) // => true
 * _.isInteger(2.5) // => false
 * _.isInteger(Infinity) // => false
 * _.isInteger(-Infinity) // => false
 * _.isInteger("5") // => false
 * _.isInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isSafeInteger|isSafeInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isInteger (value) {
    return type(value) === "Number" && value % 1 === 0;
}

/**
 * Verifies whether the received value is a "safe integer", meaning that is a number and that
 * can be exactly represented as an IEEE-754 double precision number.
 * The safe integers consist of all integers from -(2<sup>53</sup> - 1) inclusive to
 * 2<sup>53</sup> - 1 inclusive.<br/>
 * Behaves almost as a shim of ES6's [Number.isSafeInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isSafeInteger(5) // => true
 * _.isSafeInteger(new Number(5)) // => true
 * _.isSafeInteger(Math.pow(2, 53) - 1) // => true
 * _.isSafeInteger(Math.pow(2, 53)) // => false
 * _.isSafeInteger(2e32) // => false
 * _.isSafeInteger(2.5) // => false
 * _.isSafeInteger(Infinity) // => false
 * _.isSafeInteger(-Infinity) // => false
 * _.isSafeInteger("5") // => false
 * _.isSafeInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isInteger|isInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isSafeInteger (value) {
    return isInteger(value) && Math.abs(value) <= 9007199254740991;
}

/**
 * Performs the modulo operation and should not be confused with the
 * {@link module:lamb.remainder|remainder}.
 * The function performs a floored division to calculate the result and not
 * a truncated one, hence the sign of the dividend is not kept, unlike the
 * {@link module:lamb.remainder|remainder}.
 * @example
 * _.modulo(5, 3) // => 2
 * _.remainder(5, 3) // => 2
 *
 * _.modulo(-5, 3) // => 1
 * _.remainder(-5, 3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.remainder|remainder}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function modulo (a, b) {
    return a - (b * Math.floor(a / b));
}

/**
 * Multiplies two numbers.
 * @example
 * _.multiply(5, 3) // => 15
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.multiplyBy|multiplyBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function multiply (a, b) {
    return a * b;
}

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * var double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var multiplyBy = _curry2(multiply, true);

/**
 * Generates a random integer between two given integers, both included.
 * Note that no safety measure is taken if the provided arguments aren't integers, so
 * you may end up with unexpected (not really) results.
 * For example <code>randomInt(0.1, 1.2)</code> could be <code>2</code>.
 * @example
 *
 * _.randomInt(1, 10) // => an integer >=1 && <= 10
 *
 * @memberof module:lamb
 * @category Math
 * @since 0.1.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
 * but not including, <code>limit</code>, using the given <code>step</code>.
 * @example
 * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
 * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
 * _.range(0, 3, 1) // => [0, 1, 2]
 * _.range(-0, 3, 1) // => [-0, 1, 2]
 * _.range(1, -10, 2) // => []
 * _.range(3, 5, -1) // => []
 *
 * @example <caption>Behaviour if <code>step</code> happens to be zero:</caption>
 * _.range(2, 10, 0) // => [2]
 * _.range(2, -10, 0) // => [2]
 * _.range(2, 2, 0) // => []
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.generate|generate}
 * @since 0.1.0
 * @param {Number} start
 * @param {Number} limit
 * @param {Number} [step=1]
 * @returns {Number[]}
 */
function range (start, limit, step) {
    start = _forceToNumber(start);
    limit = _forceToNumber(limit);
    step = arguments.length === 3 ? _forceToNumber(step) : 1;

    if (step === 0) {
        return limit === start ? [] : [start];
    }

    var len = Math.max(Math.ceil((limit - start) / step), 0);
    var result = Array(len);

    for (var i = 0, last = start; i < len; i++) {
        result[i] = last;
        last += step;
    }

    return result;
}

/**
 * Gets the remainder of the division of two numbers.
 * Not to be confused with the {@link module:lamb.modulo|modulo} as the remainder
 * keeps the sign of the dividend and may lead to some unexpected results.
 * @example
 * // example of wrong usage of the remainder
 * // (in this case the modulo operation should be used)
 * var isOdd = function (n) { return _.remainder(n, 2) === 1; };
 * isOdd(-3) // => false as -3 % 2 === -1
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.modulo|modulo}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function remainder (a, b) {
    return a % b;
}

/**
 * Subtracts two numbers.
 * @example
 * _.subtract(5, 3) // => 2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.deduct|deduct}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function subtract (a, b) {
    return a - b;
}

/**
 * Sums two numbers.
 * @example
 * _.sum(4, 5) // => 9
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.add|add}
 * @since 0.50.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum (a, b) {
    return a + b;
}

lamb.add = add;
lamb.clamp = clamp;
lamb.clampWithin = clampWithin;
lamb.deduct = deduct;
lamb.divide = divide;
lamb.divideBy = divideBy;
lamb.generate = generate;
lamb.isFinite = isFinite_;
lamb.isInteger = isInteger;
lamb.isSafeInteger = isSafeInteger;
lamb.modulo = modulo;
lamb.multiply = multiply;
lamb.multiplyBy = multiplyBy;
lamb.randomInt = randomInt;
lamb.range = range;
lamb.remainder = remainder;
lamb.subtract = subtract;
lamb.sum = sum;
