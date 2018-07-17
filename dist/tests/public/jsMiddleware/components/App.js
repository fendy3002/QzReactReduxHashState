'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _index = require('../actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var times = {
    count: 0,
    handler: null
};
var App = function App(_ref) {
    var filter = _ref.filter,
        navigation = _ref.navigation,
        setFilter = _ref.setFilter,
        setNavigation = _ref.setNavigation;

    var refName = null;
    var refCountry = null;
    var refTitle = null;
    var refOffset = null;

    var _onChange = function _onChange() {
        times.count++;
        if (!times.handler) {
            clearTimeout(times.handler);
        }
        setTimeout(function () {
            return console.log("times", times.count);
        }, 500);
        setFilter({
            name: refName.value,
            country: refCountry.value,
            title: refTitle.value
        });
        setNavigation(refOffset.value);
    };

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'label',
                null,
                'Name'
            ),
            _react2.default.createElement('input', { name: 'name', ref: function ref(node) {
                    refName = node;
                },
                defaultValue: filter.name, onChange: function onChange() {
                    return _onChange();
                } })
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'label',
                null,
                'Country'
            ),
            _react2.default.createElement('input', { name: 'country', ref: function ref(node) {
                    refCountry = node;
                },
                defaultValue: filter.country, onChange: function onChange() {
                    return _onChange();
                } })
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'label',
                null,
                'Title'
            ),
            _react2.default.createElement('textarea', { name: 'title', ref: function ref(node) {
                    refTitle = node;
                },
                onPaste: function onPaste() {
                    return refTitle.value = refTitle.value.replace(/\n$/, "");
                },
                defaultValue: filter.title, onChange: function onChange() {
                    return _onChange();
                } })
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'label',
                null,
                'Offset'
            ),
            _react2.default.createElement('input', { name: 'offset', ref: function ref(node) {
                    refOffset = node;
                },
                defaultValue: navigation.offset, onChange: function onChange() {
                    return _onChange();
                } })
        )
    );
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        filter: state.filter,
        navigation: state.navigation
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, getState) {
    return {
        setFilter: (0, _redux.bindActionCreators)(_index.setFilter, dispatch),
        setNavigation: (0, _redux.bindActionCreators)(_index.setNavigation, dispatch)
    };
};

var StateApp = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = StateApp;