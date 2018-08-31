import lamb from "../..";
import { nonFunctions } from "../../__tests__/commons";

describe("asPartial", function () {
    var fooSubtract = jest.fn(function (a, b, c, d) {
        return a - b - c - d;
    });
    var _ = lamb;

    afterEach(function () {
        fooSubtract.mockClear();
    });

    it("should build a function that returns a partial application of the original one as long as it's called with placeholders", function () {
        var fn = lamb.asPartial(fooSubtract);

        expect(fn(_, 4, _, _)(_, 3, _)(5, _)(2)).toBe(-4);
        expect(fn(_)(_, _)(_)(5, _)(_, 3)(4, _)(2)).toBe(-4);
        expect(fn(_, 4, _, _)(_, 3, _)(5, _, _, _, 2, _, _)(99, 6)).toBe(-101);
        expect(fn(3, 2, 1, 0)).toBe(0);
        expect(fn(5, _, 3)(_)(_, _)(4, _)(2)).toBe(-4);
        expect(fn(_, 2, _, 0)(_, _)(3, _)(_)(1)).toBe(0);
        expect(fn(5, _, _, _)(4, 3, 2)).toBe(-4);
    });

    it("should be safe to call the partial application multiple times with different values for unfilled placeholders", function () {
        var fn = lamb.asPartial(fooSubtract)(_, 5, _, _);
        var minusTen1 = fn(_, 4, _)(_, 1);
        var minusTen2 = fn(_, 3, 2);
        var minusTen3 = fn(_, -5, 10);

        var numbers = [-1000, 6, 502, 856, 790, 547, 157, 750, 111, -419];
        var results = [-1010, -4, 492, 846, 780, 537, 147, 740, 101, -429];

        expect(numbers.map(minusTen1)).toEqual(results);
        expect(numbers.map(minusTen2)).toEqual(results);
        expect(numbers.map(minusTen3)).toEqual(results);
    });

    it("should build a function that applies the original function when it's called without placeholders even if its arity isn't consumed", function () {
        var fn = lamb.asPartial(fooSubtract);

        expect(fn(5, _, 3)(4)).toEqual(NaN);
        expect(fooSubtract).toHaveBeenCalledTimes(1);
        expect(fooSubtract.mock.calls[0]).toEqual([5, 4, 3]);
    });

    it("should pass all the received arguments, even if they exceed the original function's arity", function () {
        var fn = lamb.asPartial(fooSubtract);

        expect(fn(_, 4, _, 2)(5, 3, 6, 7, 8)).toBe(-4);
        expect(fooSubtract).toHaveBeenCalledTimes(1);
        expect(fooSubtract.mock.calls[0]).toEqual([5, 4, 3, 2, 6, 7, 8]);
    });

    it("should give an `undefined` value to unfilled placeholders", function () {
        var fn = lamb.asPartial(lamb.list)(_, 2, _, 3, _, 5, _);

        expect(fn(1)).toEqual([1, 2, void 0, 3, void 0, 5, void 0]);
    });

    it("should preserve the function's context", function () {
        var fn = lamb.asPartial(function (a, b) {
            this.values.push(a - b);
        });

        var obj = {
            values: [1, 2, 3],
            foo: fn(4, _),
            bar: fn(_, 4)
        };

        obj.foo(5);
        expect(obj.values).toEqual([1, 2, 3, -1]);

        obj.bar(5);
        expect(obj.values).toEqual([1, 2, 3, -1, 1]);
    });

    it("should build a function throwing an exception if called without arguments or if `fn` isn't a function", function () {
        nonFunctions.forEach(function (value) {
            expect(lamb.asPartial(value)).toThrow();
        });

        expect(lamb.asPartial()).toThrow();
    });
});
