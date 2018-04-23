// accessors

import getAt from "@accessors/getAt";
import getIn from "@accessors/getIn";
import getIndex from "@accessors/getIndex";
import getKey from "@accessors/getKey";
import getPath from "@accessors/getPath";
import getPathIn from "@accessors/getPathIn";
import head from "@accessors/head";
import last from "@accessors/last";
import setAt from "@accessors/setAt";
import setIn from "@accessors/setIn";
import setIndex from "@accessors/setIndex";
import setKey from "@accessors/setKey";
import setPath from "@accessors/setPath";
import setPathIn from "@accessors/setPathIn";
import updateAt from "@accessors/updateAt";
import updateIn from "@accessors/updateIn";
import updateIndex from "@accessors/updateIndex";
import updateKey from "@accessors/updateKey";
import updatePath from "@accessors/updatePath";
import updatePathIn from "@accessors/updatePathIn";

// array

import append from "@array/append";
import appendTo from "@array/appendTo";
import difference from "@array/difference";
import drop from "@array/drop";
import dropFrom from "@array/dropFrom";
import dropWhile from "@array/dropWhile";
import flatMap from "@array/flatMap";
import flatMapWith from "@array/flatMapWith";
import flatten from "@array/flatten";
import init from "@array/init";
import insert from "@array/insert";
import insertAt from "@array/insertAt";
import intersection from "@array/intersection";
import partition from "@array/partition";
import partitionWith from "@array/partitionWith";
import pluck from "@array/pluck";
import pluckKey from "@array/pluckKey";
import pull from "@array/pull";
import pullFrom from "@array/pullFrom";
import shallowFlatten from "@array/shallowFlatten";
import tail from "@array/tail";
import take from "@array/take";
import takeFrom from "@array/takeFrom";
import takeWhile from "@array/takeWhile";
import transpose from "@array/transpose";
import union from "@array/union";
import unionBy from "@array/unionBy";
import uniques from "@array/uniques";
import uniquesBy from "@array/uniquesBy";
import zip from "@array/zip";
import zipWithIndex from "@array/zipWithIndex";

// array_basics

import contains from "@array_basics/contains";
import every from "@array_basics/every";
import everyIn from "@array_basics/everyIn";
import filter from "@array_basics/filter";
import filterWith from "@array_basics/filterWith";
import find from "@array_basics/find";
import findIndex from "@array_basics/findIndex";
import findIndexWhere from "@array_basics/findIndexWhere";
import findWhere from "@array_basics/findWhere";
import forEach from "@array_basics/forEach";
import isIn from "@array_basics/isIn";
import list from "@array_basics/list";
import map from "@array_basics/map";
import mapWith from "@array_basics/mapWith";
import reduce from "@array_basics/reduce";
import reduceRight from "@array_basics/reduceRight";
import reduceRightWith from "@array_basics/reduceRightWith";
import reduceWith from "@array_basics/reduceWith";
import reverse from "@array_basics/reverse";
import slice from "@array_basics/slice";
import sliceAt from "@array_basics/sliceAt";
import some from "@array_basics/some";
import someIn from "@array_basics/someIn";

// core

import always from "@core/always";
import compose from "@core/compose";
import generic from "@core/generic";
import identity from "@core/identity";
import partial from "@core/partial";
import partialRight from "@core/partialRight";

// function

import application from "@function/application";
import apply from "@function/apply";
import applyTo from "@function/applyTo";
import aritize from "@function/aritize";
import asPartial from "@function/asPartial";
import binary from "@function/binary";
import collect from "@function/collect";
import curry from "@function/curry";
import curryRight from "@function/curryRight";
import curryable from "@function/curryable";
import curryableRight from "@function/curryableRight";
import debounce from "@function/debounce";
import flip from "@function/flip";
import getArgAt from "@function/getArgAt";
import invoker from "@function/invoker";
import invokerOn from "@function/invokerOn";
import mapArgs from "@function/mapArgs";
import pipe from "@function/pipe";
import tapArgs from "@function/tapArgs";
import throttle from "@function/throttle";
import unary from "@function/unary";

// grouping

import count from "@grouping/count";
import countBy from "@grouping/countBy";
import group from "@grouping/group";
import groupBy from "@grouping/groupBy";
import index from "@grouping/index";
import indexBy from "@grouping/indexBy";

// logic

import adapter from "@logic/adapter";
import allOf from "@logic/allOf";
import anyOf from "@logic/anyOf";
import areSVZ from "@logic/areSVZ";
import areSame from "@logic/areSame";
import case_ from "@logic/case";
import condition from "@logic/condition";
import gt from "@logic/gt";
import gte from "@logic/gte";
import is from "@logic/is";
import isGT from "@logic/isGT";
import isGTE from "@logic/isGTE";
import isLT from "@logic/isLT";
import isLTE from "@logic/isLTE";
import isSVZ from "@logic/isSVZ";
import lt from "@logic/lt";
import lte from "@logic/lte";
import not from "@logic/not";
import unless from "@logic/unless";
import when from "@logic/when";

// math

import add from "@math/add";
import clamp from "@math/clamp";
import clampWithin from "@math/clampWithin";
import deduct from "@math/deduct";
import divide from "@math/divide";
import divideBy from "@math/divideBy";
import generate from "@math/generate";
import isFinite from "@math/isFinite";
import isInteger from "@math/isInteger";
import isSafeInteger from "@math/isSafeInteger";
import modulo from "@math/modulo";
import multiply from "@math/multiply";
import multiplyBy from "@math/multiplyBy";
import randomInt from "@math/randomInt";
import range from "@math/range";
import remainder from "@math/remainder";
import subtract from "@math/subtract";
import sum from "@math/sum";

// object

import enumerables from "@object/enumerables";
import fromPairs from "@object/fromPairs";
import immutable from "@object/immutable";
import keys from "@object/keys";
import make from "@object/make";
import mapValues from "@object/mapValues";
import mapValuesWith from "@object/mapValuesWith";
import merge from "@object/merge";
import mergeOwn from "@object/mergeOwn";
import ownPairs from "@object/ownPairs";
import ownValues from "@object/ownValues";
import pairs from "@object/pairs";
import pick from "@object/pick";
import pickIf from "@object/pickIf";
import pickKeys from "@object/pickKeys";
import rename from "@object/rename";
import renameKeys from "@object/renameKeys";
import renameWith from "@object/renameWith";
import skip from "@object/skip";
import skipIf from "@object/skipIf";
import skipKeys from "@object/skipKeys";
import tear from "@object/tear";
import tearOwn from "@object/tearOwn";
import values from "@object/values";

// object_checking

import checker from "@object_checking/checker";
import has from "@object_checking/has";
import hasKey from "@object_checking/hasKey";
import hasKeyValue from "@object_checking/hasKeyValue";
import hasOwn from "@object_checking/hasOwn";
import hasOwnKey from "@object_checking/hasOwnKey";
import hasPathValue from "@object_checking/hasPathValue";
import keySatisfies from "@object_checking/keySatisfies";
import pathExists from "@object_checking/pathExists";
import pathExistsIn from "@object_checking/pathExistsIn";
import pathSatisfies from "@object_checking/pathSatisfies";
import validate from "@object_checking/validate";
import validateWith from "@object_checking/validateWith";

// sort

import sort from "@sort/sort";
import sortWith from "@sort/sortWith";
import sortedInsert from "@sort/sortedInsert";
import sorter from "@sort/sorter";
import sorterDesc from "@sort/sorterDesc";

// string

import padLeft from "@string/padLeft";
import padRight from "@string/padRight";
import repeat from "@string/repeat";
import testWith from "@string/testWith";

// type

import isInstanceOf from "@type/isInstanceOf";
import isNil from "@type/isNil";
import isNull from "@type/isNull";
import isType from "@type/isType";
import isUndefined from "@type/isUndefined";
import type from "@type/type";

// lamb
import lamb from "@src/lamb";

Object.assign(lamb, {

    // accessors

    getAt,
    getIn,
    getIndex,
    getKey,
    getPath,
    getPathIn,
    head,
    last,
    setAt,
    setIn,
    setIndex,
    setKey,
    setPath,
    setPathIn,
    updateAt,
    updateIn,
    updateIndex,
    updateKey,
    updatePath,
    updatePathIn,

    // array

    append,
    appendTo,
    difference,
    drop,
    dropFrom,
    dropWhile,
    flatMap,
    flatMapWith,
    flatten,
    init,
    insert,
    insertAt,
    intersection,
    partition,
    partitionWith,
    pluck,
    pluckKey,
    pull,
    pullFrom,
    shallowFlatten,
    tail,
    take,
    takeFrom,
    takeWhile,
    transpose,
    union,
    unionBy,
    uniques,
    uniquesBy,
    zip,
    zipWithIndex,

    // array_basics

    contains,
    every,
    everyIn,
    filter,
    filterWith,
    find,
    findIndex,
    findIndexWhere,
    findWhere,
    forEach,
    isIn,
    list,
    map,
    mapWith,
    reduce,
    reduceRight,
    reduceRightWith,
    reduceWith,
    reverse,
    slice,
    sliceAt,
    some,
    someIn,

    // core

    always,
    compose,
    generic,
    identity,
    partial,
    partialRight,

    // function

    application,
    apply,
    applyTo,
    aritize,
    asPartial,
    binary,
    collect,
    curry,
    curryRight,
    curryable,
    curryableRight,
    debounce,
    flip,
    getArgAt,
    invoker,
    invokerOn,
    mapArgs,
    pipe,
    tapArgs,
    throttle,
    unary,

    // grouping

    count,
    countBy,
    group,
    groupBy,
    index,
    indexBy,

    // logic

    adapter,
    allOf,
    anyOf,
    areSVZ,
    areSame,
    case: case_,
    condition,
    gt,
    gte,
    is,
    isGT,
    isGTE,
    isLT,
    isLTE,
    isSVZ,
    lt,
    lte,
    not,
    unless,
    when,

    // math

    add,
    clamp,
    clampWithin,
    deduct,
    divide,
    divideBy,
    generate,
    isFinite,
    isInteger,
    isSafeInteger,
    modulo,
    multiply,
    multiplyBy,
    randomInt,
    range,
    remainder,
    subtract,
    sum,

    // object

    enumerables,
    fromPairs,
    immutable,
    keys,
    make,
    mapValues,
    mapValuesWith,
    merge,
    mergeOwn,
    ownPairs,
    ownValues,
    pairs,
    pick,
    pickIf,
    pickKeys,
    rename,
    renameKeys,
    renameWith,
    skip,
    skipIf,
    skipKeys,
    tear,
    tearOwn,
    values,

    // object_checking

    checker,
    has,
    hasKey,
    hasKeyValue,
    hasOwn,
    hasOwnKey,
    hasPathValue,
    keySatisfies,
    pathExists,
    pathExistsIn,
    pathSatisfies,
    validate,
    validateWith,

    // sort

    sort,
    sortWith,
    sortedInsert,
    sorter,
    sorterDesc,

    // string

    padLeft,
    padRight,
    repeat,
    testWith,

    // type

    isInstanceOf,
    isNil,
    isNull,
    isType,
    isUndefined,
    type
});

export default lamb;
