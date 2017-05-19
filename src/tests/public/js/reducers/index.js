var { combineReducers } = require('redux');
var filter = require('./filter.js');
var navigation = require('./navigation.js');

var app = combineReducers({
    filter: filter,
    navigation: navigation
});

module.exports = app;
