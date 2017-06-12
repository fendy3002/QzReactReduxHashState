'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _App = require('./components/App.js');

var _App2 = _interopRequireDefault(_App);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _index = require('../../../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderPage = function renderPage(initialState) {
    var hashState = _index2.default.getState(); // get all state from hash url
    var state = {
        navigation: { offset: (hashState || {}).offset || 0 },
        filter: Object.assign({
            name: '',
            country: '',
            title: ''
        }, // default value
        _index2.default.getState("filter") // get state from hash url by prefix "filter"
        )
    };

    var store = (0, _redux.createStore)(_reducers2.default, state, _redux.applyMiddleware.apply(undefined, [_reduxThunk2.default, _index2.default.middleware({ filter: "filter" })]));

    (0, _reactDom.render)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_App2.default, null)
    ), document.getElementById('content'));
};

renderPage([]);