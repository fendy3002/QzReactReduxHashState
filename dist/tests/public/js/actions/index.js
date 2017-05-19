'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var setFilter = exports.setFilter = function (filter) {
    return _extends({}, filter, {
        type: 'SET_FILTER'
    });
};
var setNavigation = exports.setNavigation = function (offset) {
    return {
        offset: offset,
        type: 'SET_NAVIGATION'
    };
};