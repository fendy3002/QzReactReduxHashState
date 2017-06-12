import QzReactReduxHashState from '../../../../index.js'

var navigation = function(state = [], action){
    switch (action.type) {
        case 'SET_NAVIGATION':
            return {
                ...state,
                offset: action.offset
            };
        default:
            return state;
    };
};

module.exports = QzReactReduxHashState.sync(navigation);
