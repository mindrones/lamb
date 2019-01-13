// single functions

export * from "./exports";

// default export

import * as exports from "./exports";

var lamb = Object.create(null);

for (var prop in exports) {
    lamb[prop] = exports[prop];
}

export default lamb;
