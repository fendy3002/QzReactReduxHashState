'use strict';

var _require = require('redux'),
    combineReducers = _require.combineReducers;

var filter = require('./filter.js');
var navigation = require('./navigation.js');

var app = combineReducers({
    filter: filter,
    navigation: navigation
});

module.exports = app;