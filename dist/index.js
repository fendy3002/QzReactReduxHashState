'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QzReactReduxHashState = {
    middleware: function middleware(configuration) {
        var updateHanlder = null;
        return function (store) {
            return function (next) {
                return function (action) {
                    var actionResult = next(action);
                    var newState = store.getState();
                    if (updateHanlder) {
                        clearTimeout(updateHanlder);
                    }
                    updateHanlder = setTimeout(function () {
                        for (var key in configuration) {
                            var toCompare = newState[key];
                            var clearPrefix = prefixWithSeparator(configuration[key], ".");
                            var hashed = _queryString2.default.parse(window.location.hash);
                            var newParam = _queryString2.default.stringify(_extends({}, hashed, prefixJson(toCompare, clearPrefix)));
                            window.location.hash = newParam;
                        }
                    }, 700);
                    return actionResult;
                };
            };
        };
    },
    sync: function sync(handler) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var clearPrefix = prefixWithSeparator(prefix, ".");
        var updateHanlder = null;
        return function () {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var action = arguments[1];

            var newState = handler(state, action);
            if (state === newState) {
                return state;
            }

            if (updateHanlder) {
                clearTimeout(updateHanlder);
            }
            updateHanlder = setTimeout(function () {
                var hashed = _queryString2.default.parse(window.location.hash);
                var newParam = _queryString2.default.stringify(_extends({}, hashed, prefixJson(newState, clearPrefix)));
                window.location.hash = newParam;
            }, 700);
            return newState;
        };
    },
    getState: function getState() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var hashed = _queryString2.default.parse(window.location.hash);
        if (prefix) {
            var clearPrefix = prefixWithSeparator(prefix);
            var cleanJson = clearJsonProperty(hashed, ".");
            return cleanJson[prefixWithOutSeparator(prefix, ".")];
        } else {
            return hashed;
        }
    }
};

var prefixWithSeparator = function prefixWithSeparator(prefix) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";

    if (!prefix) {
        return "";
    } else {
        if (prefix.endsWith(separator)) {
            return prefix;
        } else {
            return prefix + separator;
        }
    }
};
var prefixWithOutSeparator = function prefixWithOutSeparator(prefix) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";

    if (!prefix) {
        return "";
    } else {
        if (prefix.endsWith(separator)) {
            return prefix.substring(0, prefix.length - separator.length);
        } else {
            return prefix;
        }
    }
};
var clearJsonProperty = function clearJsonProperty(obj) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";

    var keys = Object.getOwnPropertyNames(obj);
    var prefixes = _lodash2.default.chain(keys).map(function (k) {
        return k.split(separator)[0];
    }).uniqBy(function (k) {
        return k;
    }).value();

    var result = {};
    for (var i = 0; i < prefixes.length; i++) {
        var currentPrefix = prefixes[i];
        if (_lodash2.default.chain(prefixes).filter(function (k) {
            return k == currentPrefix;
        }).length == 1) {
            result[currentPrefix] = obj[currentPrefix];
        } else {
            var prefixPrefixes = _lodash2.default.chain(keys).filter(function (k) {
                return k.startsWith(currentPrefix);
            }).value();
            var currentPrefixWithSeparator = prefixWithSeparator(currentPrefix, separator);
            var currentObj = {};
            for (var i = 0; i < prefixPrefixes.length; i++) {
                var currentPrefixPrefix = prefixPrefixes[i];
                currentObj[currentPrefixPrefix.substr(currentPrefixWithSeparator.length)] = obj[currentPrefixPrefix];
            }
            result[currentPrefix] = currentObj;
        }
    }
    return result;
};

var prefixJson = function prefixJson(obj, prefix) {
    var result = {};
    var keys = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < keys.length; i++) {
        result[prefix + keys[i]] = obj[keys[i]];
    };
    return result;
};

exports.default = QzReactReduxHashState;