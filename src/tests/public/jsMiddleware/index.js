import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App.js'
import reducer from './reducers';
import thunk from 'redux-thunk';
import QzReactReduxHashState from '../../../index.js'

var renderPage = function(initialState){
    var hashState = QzReactReduxHashState.getState(); // get all state from hash url
    var state = {
        navigation: { offset : (hashState || {}).offset || 0 },
        filter: Object.assign(
            {
                name: '',
                country: '',
                title: ''
            }, // default value
            QzReactReduxHashState.getState("filter") // get state from hash url by prefix "filter"
        )
    };

    var store = createStore(reducer,
        state,
        applyMiddleware(...[
            thunk,
            QzReactReduxHashState.middleware({filter: "filter"})
        ]));

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('content')
    );
};

renderPage([]);
