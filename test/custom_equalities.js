"use strict";

function isSparseArray (array) {
    return Array.isArray(array) && Object.keys(array).filter(function (v) {
        return String(v >>> 0) === v;
    }).length !== array.length;
}

function isSparseArrayCheckNeeded (a, b) {
    return isSparseArray(a) && Array.isArray(b) || isSparseArray(b) && Array.isArray(a);
}

function sparseArrayEquality (a, b) { // eslint-disable-line consistent-return
    if (isSparseArrayCheckNeeded(a, b)) {
        var aLen = a.length;

        if (aLen !== b.length) {
            return false;
        }

        for (var i = 0; i < aLen; i++) {
            if (i in a ^ i in b) {
                return false;
            } else if (a[i] !== b[i]) {
                return false;
            }
        }

        return true;
    }
}

module.exports = {sparseArrayEquality: sparseArrayEquality};
