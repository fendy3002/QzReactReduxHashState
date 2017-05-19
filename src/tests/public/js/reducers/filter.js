import QzReactReduxHashState from '../../../../index.js'

var filter = function(state = [], action){
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                name: action.name,
                country: action.country,
                title: action.title
            };
        default:
            return state;
    };
};

module.exports = QzReactReduxHashState.sync(filter, "filter");
