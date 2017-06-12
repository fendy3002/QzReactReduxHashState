'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var filter = function filter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case 'SET_FILTER':
            return _extends({}, state, {
                name: action.name,
                country: action.country,
                title: action.title
            });
        default:
            return state;
    };
};

module.exports = filter;