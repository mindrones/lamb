"use strict";

var commons = require("../commons.js");

var lamb = commons.lamb;

var nonArrayLikes = commons.vars.nonArrayLikes;
var nonFunctions = commons.vars.nonFunctions;
var nonStrings = commons.vars.nonStrings;
var nonStringsAsStrings = commons.vars.nonStringsAsStrings;
var wannabeEmptyArrays = commons.vars.wannabeEmptyArrays;
var wannabeEmptyObjects = commons.vars.wannabeEmptyObjects;
var zeroesAsIntegers = commons.vars.zeroesAsIntegers;

describe("lamb.function", function () {
    function Foo (value) {
        this.value = value;
    }

    Foo.prototype = {
        value: 0,
        bar: function (a, b) {
            return (this.value + a) / b;
        }
    };

    describe("application / apply / applyTo", function () {
        it("should apply the desired function to the given arguments", function () {
            expect(lamb.application(Math.max, [-1, 3, 2, 15, 7])).toBe(15);
            expect(lamb.apply(Math.max)([-1, 3, 2, 15, 7])).toBe(15);
            expect(lamb.applyTo([-1, 3, 2, 15, 7])(Math.max)).toBe(15);
        });

        it("should accept an array-like object as arguments for the function", function () {
            expect(lamb.application(Math.max, "3412")).toBe(4);
            expect(lamb.apply(Math.max)("3412")).toBe(4);
            expect(lamb.applyTo("3412")(Math.max)).toBe(4);
        });

        it("should not alter the function's context", function () {
            var obj = {
                value: 4,
                application: lamb.application,
                applyBar: lamb.apply(Foo.prototype.bar),
                baz: lamb.applyTo([1, 2])
            };

            expect(obj.application(Foo.prototype.bar, [1, 2])).toBe(2.5);
            expect(obj.applyBar([1, 2])).toBe(2.5);
            expect(obj.baz(Foo.prototype.bar)).toBe(2.5);
        });

        it("should treat non-array-like values for the `args` parameter as empty arrays", function () {
            var fooSpy = jasmine.createSpy("fooSpy");

            for (var i = 0, ofs = 0; i < nonArrayLikes.length; i++, ofs += 3) {
                lamb.application(fooSpy, nonArrayLikes[i]);
                lamb.apply(fooSpy)(nonArrayLikes[i]);
                lamb.applyTo(nonArrayLikes[i])(fooSpy);
                expect(fooSpy.calls.argsFor(ofs).length).toBe(0);
                expect(fooSpy.calls.argsFor(ofs + 1).length).toBe(0);
                expect(fooSpy.calls.argsFor(ofs + 2).length).toBe(0);
            }

            lamb.application(fooSpy);
            lamb.apply(fooSpy)();
            lamb.applyTo()(fooSpy);

            expect(fooSpy.calls.argsFor(ofs).length).toBe(0);
            expect(fooSpy.calls.argsFor(ofs + 1).length).toBe(0);
            expect(fooSpy.calls.argsFor(ofs + 2).length).toBe(0);
            expect(fooSpy.calls.count()).toBe(ofs + 3);
        });

        it("should throw an exception if `fn` isn't a function", function () {
            nonFunctions.forEach(function (value) {
                expect(function () { lamb.application(value, []); }).toThrow();
                expect(lamb.apply(value)).toThrow();
                expect(function () { lamb.applyTo([])(value); }).toThrow();
            });
        });
    });

    describe("aritize", function () {
        var maxArgument = function () { return Math.max.apply(null, arguments); };
        var maxArgumentSpy = jasmine.createSpy("maxArgument").and.callFake(maxArgument);

        afterEach(function () {
            maxArgumentSpy.calls.reset();
        });

        it("should change the arity of the given function to the specified value", function () {
            var maxOfFirst3 = lamb.aritize(maxArgumentSpy, 3);

            expect(maxOfFirst3(0, 1, 2, 3, 4, 5)).toBe(2);
            expect(maxArgumentSpy.calls.argsFor(0)).toEqual([0, 1, 2]);
        });

        it("should allow negative arities", function () {
            expect(lamb.aritize(maxArgumentSpy, -1)(0, 1, 2, 3)).toBe(2);
            expect(maxArgumentSpy.calls.argsFor(0)).toEqual([0, 1, 2]);
        });

        it("should call the function without arguments if the arity is zero or if it's out of bounds", function () {
            expect(lamb.aritize(maxArgumentSpy, -10)(0, 1, 2, 3)).toBe(-Infinity);
            expect(lamb.aritize(maxArgumentSpy, 0)(0, 1, 2, 3)).toBe(-Infinity);
            expect(maxArgumentSpy.calls.count()).toBe(2);
            expect(maxArgumentSpy.calls.argsFor(0).length).toBe(0);
            expect(maxArgumentSpy.calls.argsFor(1).length).toBe(0);
        });

        it("should add `undefined` arguments if the desired arity is greater than the amount of received parameters", function () {
            expect(lamb.aritize(maxArgumentSpy, 6)(0, 1, 2, 3)).toEqual(NaN);
            expect(maxArgumentSpy.calls.argsFor(0)).toEqual([0, 1, 2, 3, void 0, void 0]);
        });

        it("should convert the arity to an integer following ECMA specifications", function () {
            // see https://www.ecma-international.org/ecma-262/7.0/#sec-tointeger

            zeroesAsIntegers.forEach(function (value, idx) {
                expect(lamb.aritize(maxArgumentSpy, value)(0, 1, 2, 3, 4, 5)).toBe(-Infinity);
                expect(maxArgumentSpy.calls.argsFor(idx).length).toBe(0);
            });

            expect(lamb.aritize(maxArgumentSpy)(0, 1, 2, 3, 4, 5)).toBe(-Infinity);
            expect(maxArgumentSpy.calls.mostRecent().args.length).toBe(0);

            maxArgumentSpy.calls.reset();

            [[5], 5.9, "5.9", "-1", ["-1.9"]].forEach(function (value, idx) {
                expect(lamb.aritize(maxArgumentSpy, value)(0, 1, 2, 3, 4, 5)).toBe(4);
                expect(maxArgumentSpy.calls.argsFor(idx)).toEqual([0, 1, 2, 3, 4]);
            });
        });

        it("should not modify the function's context", function () {
            var fn = function () {
                this.values = this.values.concat(lamb.slice(arguments, 0, arguments.length));
            };

            var obj = {values: [1, 2, 3], addValues: lamb.aritize(fn, 2)};

            obj.addValues(4, 5, 6, 7);

            expect(obj.values).toEqual([1, 2, 3, 4, 5]);
        });

        it("should build a function throwing an exception if the `fn` parameter isn't a function or is missing", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.aritize(value, 0)).toThrow();
            });

            expect(lamb.aritize()).toThrow();
        });
    });

    describe("asPartial", function () {
        var fooSubtract = function (a, b, c, d) {
            return a - b - c - d;
        };
        var _ = lamb;
        var fooSubtractSpy = jasmine.createSpy("fooSubtractSpy").and.callFake(fooSubtract);

        afterEach(function () {
            fooSubtractSpy.calls.reset();
        });

        it("should build a function that returns a partial application of the original one as long as it's called with placeholders", function () {
            var fn = _.asPartial(fooSubtract);

            expect(fn(_, 4, _, _)(_, 3, _)(5, _)(2)).toBe(-4);
            expect(fn(_)(_, _)(_)(5, _)(_, 3)(4, _)(2)).toBe(-4);
            expect(fn(_, 4, _, _)(_, 3, _)(5, _, _, _, 2, _, _)(99, 6)).toBe(-101);
            expect(fn(3, 2, 1, 0)).toBe(0);
            expect(fn(5, _, 3)(_)(_, _)(4, _)(2)).toBe(-4);
            expect(fn(_, 2, _, 0)(_, _)(3, _)(_)(1)).toBe(0);
            expect(fn(5, _, _, _)(4, 3, 2)).toBe(-4);
        });

        it("should be safe to call the partial application multiple times with different values for unfilled placeholders", function () {
            var fn = _.asPartial(fooSubtract)(_, 5, _, _);
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
            var fn = _.asPartial(fooSubtractSpy);

            expect(fn(5, _, 3)(4)).toEqual(NaN);
            expect(fooSubtractSpy.calls.count()).toBe(1);
            expect(fooSubtractSpy.calls.argsFor(0)).toEqual([5, 4, 3]);
        });

        it("should pass all the received arguments, even if they exceed the original function's arity", function () {
            var fn = _.asPartial(fooSubtractSpy);

            expect(fn(_, 4, _, 2)(5, 3, 6, 7, 8)).toBe(-4);
            expect(fooSubtractSpy.calls.count()).toBe(1);
            expect(fooSubtractSpy.calls.argsFor(0)).toEqual([5, 4, 3, 2, 6, 7, 8]);
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

    describe("binary", function () {
        var binaryList;

        beforeEach(function () {
            spyOn(lamb, "list").and.callThrough();
            binaryList = lamb.binary(lamb.list);
        });

        afterEach(function () {
            lamb.list.calls.reset();
        });

        it("should build a function that passes only two arguments to the given one", function () {
            expect(binaryList.length).toBe(2);
            expect(binaryList(1, 2, 3)).toEqual([1, 2]);
            expect(lamb.list.calls.argsFor(0)).toEqual([1, 2]);
        });

        it("should add `undefined` arguments if the received parameters aren't two", function () {
            expect(binaryList()).toEqual([void 0, void 0]);
            expect(binaryList(1)).toEqual([1, void 0]);
        });

        it("should not modify the function's context", function () {
            var fn = function () {
                this.values = this.values.concat(lamb.slice(arguments, 0, arguments.length));
            };

            var obj = {values: [1, 2, 3], addValues: lamb.binary(fn)};

            obj.addValues(4, 5, 6, 7);

            expect(obj.values).toEqual([1, 2, 3, 4, 5]);
        });

        it("should build a function throwing an exception if the `fn` parameter isn't a function or is missing", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.binary(value)).toThrow();
            });

            expect(lamb.binary()).toThrow();
        });
    });

    describe("collect", function () {
        it("should collect the values returned by the given series of functions applied with the provided parameters", function () {
            var min = jasmine.createSpy("min").and.callFake(Math.min);
            var max = jasmine.createSpy("max").and.callFake(Math.max);
            var minAndMax = lamb.collect(min, max);

            expect(minAndMax(3, 1, -2, 5, 4, -1)).toEqual([-2, 5]);
            expect(min.calls.count()).toBe(1);
            expect(max.calls.count()).toBe(1);
            expect(min.calls.argsFor(0)).toEqual([3, 1, -2, 5, 4, -1]);
            expect(max.calls.argsFor(0)).toEqual([3, 1, -2, 5, 4, -1]);
        });

        it("should return an empty array if it doesn't receive any function", function () {
            expect(lamb.collect()(1, 2, 3)).toEqual([]);
        });

        it("should call the received functions even if there are no provided parameters", function () {
            expect(lamb.collect(lamb.identity, lamb.always(99))()).toEqual([void 0, 99]);
        });

        it("should build a function returning an exception if it receives a value that isn't a function", function () {
            nonFunctions.forEach(function (value) {
                expect(function () { lamb.collect(lamb.always(99), value)(1, 2, 3); }).toThrow();
                expect(function () { lamb.collect(value, lamb.always(99))(1, 2, 3); }).toThrow();
            });
        });
    });

    describe("currying", function () {
        var fooSubtract = function (a, b, c) {
            return a - b - c;
        };
        var subtractSpy = jasmine.createSpy("fooSubtract").and.callFake(fooSubtract);

        afterEach(function () {
            subtractSpy.calls.reset();
        });

        describe("curry / curryRight", function () {
            it("should allow currying by always returning a function with an arity of one", function () {
                var sub1 = lamb.curry(fooSubtract, 3);
                var sub2 = lamb.curryRight(fooSubtract, 3);

                expect(sub1(1)(2)(3)).toBe(-4);
                expect(sub2(1)(2)(3)).toBe(0);
            });

            it("should try to desume the arity from the function's length", function () {
                var sub1 = lamb.curry(fooSubtract);
                var sub2 = lamb.curryRight(fooSubtract);

                expect(sub1(1)(2)(3)).toBe(-4);
                expect(sub2(1)(2)(3)).toBe(0);
            });

            it("should return the received function if the desumed or given arity isn't greater than one", function () {
                expect(lamb.curry(lamb.list)).toBe(lamb.list);
                expect(lamb.curryRight(lamb.list)).toBe(lamb.list);
                expect(lamb.curry(lamb.head)).toBe(lamb.head);
                expect(lamb.curryRight(lamb.head)).toBe(lamb.head);
            });

            it("should give priority to the `arity` parameter over the function's length", function () {
                var sub1 = lamb.curry(subtractSpy, 2);
                var sub2 = lamb.curryRight(subtractSpy, 2);

                expect(sub1(1)(2)).toEqual(NaN);
                expect(sub2(1)(2)).toEqual(NaN);

                expect(subtractSpy.calls.count()).toBe(2);
                expect(subtractSpy.calls.argsFor(0)).toEqual([1, 2]);
                expect(subtractSpy.calls.argsFor(1)).toEqual([2, 1]);
            });

            it("should ignore extra parameters", function () {
                var sub1 = lamb.curry(subtractSpy, 3);
                var sub2 = lamb.curryRight(subtractSpy, 3);

                expect(sub1(1, 99)(2, 88, 77)(3, 66)).toBe(-4);
                expect(sub2(1, 99)(2, 88, 77)(3, 66)).toBe(0);

                expect(subtractSpy.calls.count()).toBe(2);
                expect(subtractSpy.calls.argsFor(0)).toEqual([1, 2, 3]);
                expect(subtractSpy.calls.argsFor(1)).toEqual([3, 2, 1]);
            });

            it("should let empty calls consume the arity", function () {
                var collectLeft = lamb.curry(lamb.list, 4);
                var collectRight = lamb.curryRight(lamb.list, 4);

                expect(collectLeft("a", "z")()("c")("d")).toEqual(["a", void 0, "c", "d"]);
                expect(collectRight("a", "z")()("c")("d")).toEqual(["d", "c", void 0, "a"]);
            });

            it("should return a reusable function", function () {
                var fooSubFromFive = lamb.curry(fooSubtract)(5);
                var fooSubMinusFive = lamb.curryRight(fooSubtract)(5);
                var subFromOne = fooSubFromFive(4);
                var subFromTwo = fooSubFromFive(3);
                var minusNine = fooSubMinusFive(4);
                var minusSix = fooSubMinusFive(1);

                expect(fooSubFromFive(4)(3)).toBe(-2);
                expect(fooSubMinusFive(4)(3)).toBe(-6);
                expect(subFromOne(1)).toBe(0);
                expect(subFromOne(3)).toBe(-2);
                expect(subFromTwo(3)).toBe(-1);
                expect(subFromTwo(2)).toBe(0);
                expect(minusNine(10)).toBe(1);
                expect(minusNine(9)).toBe(0);
                expect(minusSix(10)).toBe(4);
                expect(minusSix(4)).toBe(-2);
            });

            it("should preserve the function's context", function () {
                var fn = function (a, b) {
                    this.values.push(a - b);
                };

                var obj = {
                    values: [1, 2, 3],
                    foo: lamb.curry(fn)(4),
                    bar: lamb.curryRight(fn)(4)
                };

                obj.foo(5);
                expect(obj.values).toEqual([1, 2, 3, -1]);

                obj.bar(5);
                expect(obj.values).toEqual([1, 2, 3, -1, 1]);
            });

            it("should throw an exception if called without arguments", function () {
                expect(lamb.curry).toThrow();
                expect(lamb.curryRight).toThrow();
            });
        });

        describe("curryable / curryableRight", function () {
            it("should build an \"auto-curried\" function that allows us to consume its arity in any moment", function () {
                var sub1 = lamb.curryable(fooSubtract, 3);
                var sub2 = lamb.curryableRight(fooSubtract, 3);

                expect(sub1(1, 2, 3)).toBe(-4);
                expect(sub1(1, 2)(3)).toBe(-4);
                expect(sub1(1)(2, 3)).toBe(-4);
                expect(sub1(1)(2)(3)).toBe(-4);
                expect(sub2(1, 2, 3)).toBe(0);
                expect(sub2(1, 2)(3)).toBe(0);
                expect(sub2(1)(2, 3)).toBe(0);
                expect(sub2(1)(2)(3)).toBe(0);
            });

            it("should try to desume the arity from the function's length", function () {
                var sub1 = lamb.curryable(fooSubtract);
                var sub2 = lamb.curryableRight(fooSubtract);

                expect(sub1(1)(2, 3)).toBe(-4);
                expect(sub2(1)(2, 3)).toBe(0);
            });

            it("should return the received function if the desumed or given arity isn't greater than one", function () {
                expect(lamb.curryable(lamb.list)).toBe(lamb.list);
                expect(lamb.curryableRight(lamb.list)).toBe(lamb.list);
                expect(lamb.curryable(lamb.head)).toBe(lamb.head);
                expect(lamb.curryableRight(lamb.head)).toBe(lamb.head);
            });

            it("should give priority to the `arity` parameter over the function's length", function () {
                var sub1 = lamb.curryable(subtractSpy, 2);
                var sub2 = lamb.curryableRight(subtractSpy, 2);

                expect(sub1(1)(2)).toEqual(NaN);
                expect(sub2(1)(2)).toEqual(NaN);

                expect(subtractSpy.calls.count()).toBe(2);
                expect(subtractSpy.calls.argsFor(0)).toEqual([1, 2]);
                expect(subtractSpy.calls.argsFor(1)).toEqual([2, 1]);
            });

            it("should pass extra arguments received to the original function", function () {
                var foo = jasmine.createSpy("foo");
                var args = [1, 2, 3, 4, 5];

                lamb.curryable(foo, 3)(1, 2)(3, 4, 5);
                lamb.curryableRight(foo, 4)(5, 4)(3)(2, 1);
                lamb.curryable(subtractSpy, 3)(1, 2)(3, 4, 5);
                lamb.curryableRight(subtractSpy, 3)(5, 4)(3, 2, 1);

                expect(foo.calls.count()).toBe(2);
                expect(foo.calls.argsFor(0)).toEqual(args);
                expect(foo.calls.argsFor(1)).toEqual(args);
                expect(subtractSpy.calls.count()).toBe(2);
                expect(subtractSpy.calls.argsFor(0)).toEqual(args);
                expect(subtractSpy.calls.argsFor(1)).toEqual(args);
            });

            it("should let empty calls consume the arity", function () {
                var collectLeft = lamb.curryable(lamb.list, 4);
                var collectRight = lamb.curryableRight(lamb.list, 4);

                expect(collectLeft("a")()("c", "d")).toEqual(["a", void 0, "c", "d"]);
                expect(collectRight("a")()("c", "d")).toEqual(["d", "c", void 0, "a"]);
            });

            it("should return a reusable function", function () {
                var fooSubFromFive = lamb.curryable(fooSubtract)(5);
                var fooSubMinusFive = lamb.curryableRight(fooSubtract)(5);
                var subFromOne = fooSubFromFive(4);
                var subFromTwo = fooSubFromFive(3);
                var minusNine = fooSubMinusFive(4);
                var minusSix = fooSubMinusFive(1);

                expect(fooSubFromFive(4, 3)).toBe(-2);
                expect(fooSubMinusFive(4, 3)).toBe(-6);
                expect(subFromOne(1)).toBe(0);
                expect(subFromOne(3)).toBe(-2);
                expect(subFromTwo(3)).toBe(-1);
                expect(subFromTwo(2)).toBe(0);
                expect(minusNine(10)).toBe(1);
                expect(minusNine(9)).toBe(0);
                expect(minusSix(10)).toBe(4);
                expect(minusSix(4)).toBe(-2);
            });

            it("should preserve the function's context", function () {
                var fn = function (a, b) {
                    this.values.push(a - b);
                };

                var obj = {
                    values: [1, 2, 3],
                    foo: lamb.curryable(fn),
                    bar: lamb.curryableRight(fn)
                };

                obj.foo(4, 5);
                expect(obj.values).toEqual([1, 2, 3, -1]);

                obj.bar(4, 5);
                expect(obj.values).toEqual([1, 2, 3, -1, 1]);
            });

            it("should throw an exception if called without arguments", function () {
                expect(lamb.curryable).toThrow();
                expect(lamb.curryableRight).toThrow();
            });
        });
    });

    describe("debounce", function () {
        var value;
        var testFn;

        beforeEach(function () {
            jasmine.clock().install();
            value = 0;
            testFn = jasmine.createSpy("testFn").and.callFake(function (n) { value += n; });
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("should return a function that will execute the given function only if it stops being called for the specified timespan", function () {
            var debounced = lamb.debounce(testFn, 100);

            jasmine.clock().mockDate(new Date());

            debounced(1);
            debounced(2);
            debounced(3);

            expect(testFn.calls.count()).toBe(0);
            expect(value).toBe(0);

            jasmine.clock().tick(101);

            expect(testFn.calls.count()).toBe(1);
            expect(value).toBe(3);
        });
    });

    describe("flip", function () {
        it("should return a function that applies its arguments to the original function in reverse order", function () {
            var appendTo = function (a, b) { return a + b; };
            var prependTo = lamb.flip(appendTo);

            expect(prependTo("foo", "bar")).toBe("barfoo");
        });
    });

    describe("getArgAt", function () {
        it("should build a function that returns the argument received at the given index", function () {
            expect(lamb.getArgAt(1)("a", "b", "c")).toBe("b");
        });

        it("should allow negative indexes", function () {
            expect(lamb.getArgAt(-1)("a", "b", "c")).toBe("c");
            expect(lamb.getArgAt(-2)("a", "b", "c")).toBe("b");
        });

        it("should build a function returning `undefined` if no arguments are passed or if the index is out of bounds", function () {
            expect(lamb.getArgAt(6)("a", "b", "c")).toBeUndefined();
            expect(lamb.getArgAt(-4)("a", "b", "c")).toBeUndefined();
            expect(lamb.getArgAt(2)()).toBeUndefined();
        });

        it("should convert the `idx` parameter to integer", function () {
            zeroesAsIntegers.forEach(function (value) {
                expect(lamb.getArgAt(value)("a", "b", "c")).toBe("a");
            });

            [[1], 1.5, 1.25, 1.75, true, "1"].forEach(function (value) {
                expect(lamb.getArgAt(value)("a", "b", "c")).toBe("b");
            });

            expect(lamb.getArgAt(new Date())("a", "b", "c")).toBeUndefined();
            expect(lamb.getArgAt()("a", "b", "c")).toBe("a");
        });
    });

    describe("invoker", function () {
        var slice = lamb.invoker("slice");
        var tail = lamb.invoker("slice", 1);
        var arr = [1, 2, 3, 4, 5];

        beforeEach(function () {
            spyOn(arr, "slice").and.callThrough();
        });

        afterEach(function () {
            arr.slice.calls.reset();
        });

        it("should build a function that will invoke the desired method on the given object", function () {
            var s = "foo bar";

            expect(slice(arr, 1, 3)).toEqual([2, 3]);
            expect(arr.slice.calls.count()).toBe(1);
            expect(arr.slice.calls.first().object).toBe(arr);
            expect(arr.slice.calls.argsFor(0)).toEqual([1, 3]);
            expect(slice(s, 1, 3)).toBe("oo");
        });

        it("should allow bound arguments", function () {
            expect(tail(arr)).toEqual([2, 3, 4, 5]);
            expect(tail(arr, -1)).toEqual([2, 3, 4]);
            expect(arr.slice.calls.count()).toBe(2);
            expect(arr.slice.calls.first().object).toBe(arr);
            expect(arr.slice.calls.mostRecent().object).toBe(arr);
            expect(arr.slice.calls.argsFor(0)).toEqual([1]);
            expect(arr.slice.calls.argsFor(1)).toEqual([1, -1]);
        });

        it("should build a function returning `undefined` if the given method doesn't exist on the received object", function () {
            expect(slice({})).toBeUndefined();
            expect(slice(new Date())).toBeUndefined();
        });

        it("should accept an empty string as a method name", function () {
            var obj = {"": function () { return 99; }};

            expect(lamb.invoker("")(obj)).toBe(99);
        });

        it("should convert to string every value received as a method name", function () {
            var obj = {};

            nonStringsAsStrings.forEach(function (method, idx) {
                obj[method] = lamb.always(method);

                expect(lamb.invoker(nonStrings[idx])(obj)).toBe(method);
            });

            expect(lamb.invoker()(obj)).toBe("undefined");
        });

        it("should build a function throwing an exception if the received object is `null`, `undefined` or is missing", function () {
            expect(function () { slice(null); }).toThrow();
            expect(function () { slice(void 0); }).toThrow();
            expect(slice).toThrow();
        });

        it("should build a function that converts to object every other value", function () {
            wannabeEmptyObjects.forEach(function (value) {
                expect(slice(value)).toBeUndefined();
            });
        });
    });

    describe("invokerOn", function () {
        var arr = [1, 2, 3, 4, 5];
        var callOnArr = lamb.invokerOn(arr);

        beforeEach(function () {
            spyOn(arr, "slice").and.callThrough();
            spyOn(arr, "join").and.callThrough();
        });

        afterEach(function () {
            arr.slice.calls.reset();
            arr.join.calls.reset();
        });

        it("should accept an object and build a function expecting a method name to be called on such object with the given parameters", function () {
            var s = "foo bar";
            var callOnS = lamb.invokerOn(s);

            expect(callOnArr("slice", 1, 3)).toEqual([2, 3]);
            expect(arr.slice.calls.count()).toBe(1);
            expect(arr.slice.calls.first().object).toBe(arr);
            expect(arr.slice.calls.argsFor(0)).toEqual([1, 3]);

            expect(callOnArr("join", "")).toBe("12345");
            expect(arr.join.calls.count()).toBe(1);
            expect(arr.join.calls.first().object).toBe(arr);
            expect(arr.join.calls.argsFor(0)).toEqual([""]);

            expect(callOnS("slice", 1, 3)).toBe("oo");
            expect(callOnS("toUpperCase")).toBe("FOO BAR");
        });

        it("should build a function returning `undefined` if the given method doesn't exist on the received object", function () {
            expect(callOnArr("foo")).toBeUndefined();
        });

        it("should accept an empty string as a method name", function () {
            var obj = {"": function () { return 99; }};

            expect(lamb.invokerOn(obj)("")).toBe(99);
        });

        it("should convert to string every value received as a method name", function () {
            var obj = {};
            var callOnObj = lamb.invokerOn(obj);

            nonStringsAsStrings.forEach(function (method, idx) {
                obj[method] = lamb.always(method);

                expect(callOnObj(nonStrings[idx])).toBe(method);
            });

            expect(callOnObj()).toBe("undefined");
        });

        it("should build a function throwing an exception if the received object is `null`, `undefined` or is missing", function () {
            expect(lamb.invokerOn(null)).toThrow();
            expect(lamb.invokerOn(void 0)).toThrow();
            expect(lamb.invokerOn()).toThrow();
        });

        it("should build a function that converts to object every other value", function () {
            wannabeEmptyObjects.forEach(function (value) {
                expect(lamb.invokerOn(value)("someMethod")).toBeUndefined();
            });
        });
    });

    describe("mapArgs", function () {
        var double = jasmine.createSpy("double").and.callFake(function (n) { return n * 2; });

        afterEach(function () {
            double.calls.reset();
        });

        it("should build a function that allows to map over the received arguments before applying them to the original one", function () {
            expect(lamb.mapArgs(lamb.sum, double)(5, 3)).toBe(16);
            expect(double.calls.count()).toBe(2);
            expect(double.calls.argsFor(0)).toEqual([5, 0, [5, 3]]);
            expect(double.calls.argsFor(1)).toEqual([3, 1, [5, 3]]);
        });

        it("should build a function throwing an exception if the mapper isn't a function or is missing", function () {
            nonFunctions.forEach(function (value) {
                expect(function () { lamb.mapArgs(lamb.sum, value)(1, 2); }).toThrow();
            });

            expect(function () { lamb.mapArgs(lamb.sum)(1, 2); }).toThrow();
        });

        it("should build a function throwing an exception if `fn` isn't a function", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.mapArgs(value, double)).toThrow();
            });
        });

        it("should build a function throwing an exception if called without arguments", function () {
            expect(lamb.mapArgs()).toThrow();
        });
    });

    describe("pipe", function () {
        var double = function (n) { return n * 2; };
        var cube = function (n) { return Math.pow(n, 3); };
        var changeSign = function (n) { return -n; };

        it("should return a function that is the pipeline of the given ones", function () {
            var pipeline = lamb.compose(changeSign, double, cube);

            expect(pipeline(2)).toBe(-16);
        });

        it("should be possible to reuse piped functions", function () {
            var cubeAndDouble = lamb.pipe(cube, double);
            var fn1 = lamb.pipe(cubeAndDouble, cube, double);
            var fn2 = lamb.pipe(cubeAndDouble, cubeAndDouble);

            expect(fn1(5)).toBe(31250000);
            expect(fn2(5)).toBe(31250000);
        });

        it("should behave like the received function if only one function is supplied", function () {
            var fn = function (a, b, c) { return a - b - c; };

            expect(lamb.pipe(fn)(5, 4, 3)).toBe(-2);
        });

        it("should behave like `identity` if no functions are passed", function () {
            var obj = {};

            expect(lamb.pipe()(obj)).toBe(obj);
            expect(lamb.pipe()()).toBeUndefined();
            expect(lamb.pipe()(2, 3, 4)).toBe(2);
        });

        it("should build a function throwing an exception if any parameter is not a function", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.pipe(lamb.identity, value)).toThrow();
                expect(lamb.pipe(value, lamb.identity)).toThrow();
            });
        });
    });

    describe("tapArgs", function () {
        var someObject = {count: 5};
        var someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
        var sum = jasmine.createSpy("sum").and.callFake(lamb.sum);

        afterEach(function () {
            sum.calls.reset();
        });

        it("should build a function that allows to tap into the arguments of the original one", function () {
            var getDataAmount = lamb.tapArgs(sum, [lamb.getKey("count"), lamb.getKey("length")]);

            expect(getDataAmount(someObject, someArrayData)).toBe(15);
            expect(sum.calls.count()).toBe(1);
            expect(sum.calls.argsFor(0)).toEqual([someObject.count, someArrayData.length]);
        });

        it("should use arguments as they are when tappers are missing", function () {
            expect(lamb.tapArgs(sum, [lamb.getKey("count")])(someObject, -10)).toBe(-5);
            expect(sum.calls.count()).toBe(1);
            expect(sum.calls.argsFor(0)).toEqual([someObject.count, -10]);
        });

        it("should build a function throwing an exception if a tapper isn't a function", function () {
            nonFunctions.forEach(function (value) {
                expect(function () { lamb.tapArgs(lamb.sum, [value, lamb.always(99)])(1, 2); }).toThrow();
                expect(function () { lamb.tapArgs(lamb.sum, [lamb.always(99), value])(1, 2); }).toThrow();
            });
        });

        it("should build a function that doesn't throw an exception if a tapper isn't a function but is not called", function () {
            var inc = function (n) { return ++n; };

            nonFunctions.forEach(function (value) {
                expect(lamb.tapArgs(lamb.sum, [value, lamb.always(99)])()).toEqual(NaN);
                expect(lamb.tapArgs(inc, [inc, value])(25)).toBe(27);
            });
        });

        it("should build a function throwing an exception if a `nil` value is passed as the tappers array", function () {
            expect(function () { lamb.tapArgs(sum, null)(2, 3); }).toThrow();
            expect(function () { lamb.tapArgs(sum, void 0)(2, 3); }).toThrow();
        });

        it("should consider other values as empty arrays", function () {
            wannabeEmptyArrays.forEach(function (value, idx) {
                expect(lamb.tapArgs(sum, value)(2, 3)).toBe(5);
                expect(sum.calls.argsFor(idx)).toEqual([2, 3]);
            });
        });

        it("should build a function throwing an exception if `fn` isn't a function or is missing", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.tapArgs(value, [lamb.always(99)])).toThrow();
            });

            expect(lamb.tapArgs()).toThrow();
        });
    });

    describe("throttle", function () {
        var foo;

        beforeEach(function () {
            jasmine.clock().install();
            foo = jasmine.createSpy("foo").and.returnValue(42);
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("should return a function that will invoke the passed function at most once in the given timespan", function () {
            var throttledFoo = lamb.throttle(foo, 100);
            var r1 = throttledFoo();
            var r2 = throttledFoo();
            var r3 = throttledFoo();

            expect(foo.calls.count()).toBe(1);
            expect(r1 === 42).toBe(true);
            expect(r2 === 42).toBe(true);
            expect(r3 === 42).toBe(true);

            foo.calls.reset();

            jasmine.clock().mockDate(new Date());
            throttledFoo = lamb.throttle(foo, 100);

            r1 = throttledFoo();
            r2 = throttledFoo();

            jasmine.clock().tick(101);

            r3 = throttledFoo();

            expect(foo.calls.count()).toBe(2);
            expect(r1 === 42).toBe(true);
            expect(r2 === 42).toBe(true);
            expect(r3 === 42).toBe(true);
        });
    });

    describe("unary", function () {
        var unaryList;

        beforeEach(function () {
            spyOn(lamb, "list").and.callThrough();
            unaryList = lamb.unary(lamb.list);
        });

        afterEach(function () {
            lamb.list.calls.reset();
        });

        it("should build a function that passes only one argument to the given one", function () {
            expect(unaryList.length).toBe(1);
            expect(unaryList(1, 2, 3)).toEqual([1]);
            expect(lamb.list.calls.argsFor(0)).toEqual([1]);
        });

        it("should add an `undefined` argument if the built function doesn't receive parameters", function () {
            expect(unaryList()).toEqual([void 0]);
        });

        it("should not modify the function's context", function () {
            var fn = function () {
                this.values.push(arguments[0]);
            };
            var obj = {values: [1, 2, 3], addValue: lamb.unary(fn)};

            obj.addValue(4);

            expect(obj.values).toEqual([1, 2, 3, 4]);
        });

        it("should build a function throwing an exception if the `fn` parameter isn't a function or is missing", function () {
            nonFunctions.forEach(function (value) {
                expect(lamb.unary(value)).toThrow();
            });

            expect(lamb.unary()).toThrow();
        });
    });
});
