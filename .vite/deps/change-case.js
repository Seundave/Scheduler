import "./chunk-2GTGKKMZ.js";

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

// node_modules/lower-case/dist.es2015/index.js
function lowerCase(str) {
  return str.toLowerCase();
}

// node_modules/no-case/dist.es2015/index.js
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}

// node_modules/pascal-case/dist.es2015/index.js
function pascalCaseTransform(input, index) {
  var firstChar = input.charAt(0);
  var lowerChars = input.substr(1).toLowerCase();
  if (index > 0 && firstChar >= "0" && firstChar <= "9") {
    return "_" + firstChar + lowerChars;
  }
  return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCaseTransformMerge(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function pascalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "", transform: pascalCaseTransform }, options));
}

// node_modules/camel-case/dist.es2015/index.js
function camelCaseTransform(input, index) {
  if (index === 0)
    return input.toLowerCase();
  return pascalCaseTransform(input, index);
}
function camelCaseTransformMerge(input, index) {
  if (index === 0)
    return input.toLowerCase();
  return pascalCaseTransformMerge(input);
}
function camelCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return pascalCase(input, __assign({ transform: camelCaseTransform }, options));
}

// node_modules/upper-case-first/dist.es2015/index.js
function upperCaseFirst(input) {
  return input.charAt(0).toUpperCase() + input.substr(1);
}

// node_modules/capital-case/dist.es2015/index.js
function capitalCaseTransform(input) {
  return upperCaseFirst(input.toLowerCase());
}
function capitalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: " ", transform: capitalCaseTransform }, options));
}

// node_modules/upper-case/dist.es2015/index.js
function upperCase(str) {
  return str.toUpperCase();
}

// node_modules/constant-case/dist.es2015/index.js
function constantCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "_", transform: upperCase }, options));
}

// node_modules/dot-case/dist.es2015/index.js
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "." }, options));
}

// node_modules/header-case/dist.es2015/index.js
function headerCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return capitalCase(input, __assign({ delimiter: "-" }, options));
}

// node_modules/param-case/dist.es2015/index.js
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({ delimiter: "-" }, options));
}

// node_modules/path-case/dist.es2015/index.js
function pathCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({ delimiter: "/" }, options));
}

// node_modules/sentence-case/dist.es2015/index.js
function sentenceCaseTransform(input, index) {
  var result = input.toLowerCase();
  if (index === 0)
    return upperCaseFirst(result);
  return result;
}
function sentenceCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: " ", transform: sentenceCaseTransform }, options));
}

// node_modules/snake-case/dist.es2015/index.js
function snakeCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({ delimiter: "_" }, options));
}
export {
  camelCase,
  camelCaseTransform,
  camelCaseTransformMerge,
  capitalCase,
  capitalCaseTransform,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pascalCaseTransform,
  pascalCaseTransformMerge,
  pathCase,
  sentenceCase,
  sentenceCaseTransform,
  snakeCase
};
//# sourceMappingURL=change-case.js.map
