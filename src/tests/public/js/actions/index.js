var setFilter = exports.setFilter = function(filter){
    return {
        ...filter,
        type: 'SET_FILTER'
    };
};
var setNavigation = exports.setNavigation = function(offset){
    return {
        offset: offset,
        type: 'SET_NAVIGATION'
    };
};
