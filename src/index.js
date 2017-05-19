import qs from 'query-string';
import lo from 'lodash';

var QzReactReduxHashState = {
    sync : function(handler, prefix = ""){
        var clearPrefix = prefixWithSeparator(prefix, ".");
        var updateHanlder = null;
        return function(state = [], action){
            var newState = handler(state, action);
            if(state === newState){ return state; }

            if(updateHanlder){ clearTimeout(updateHanlder); }
            updateHanlder = setTimeout(() => {
                var hashed = qs.parse(window.location.hash);
                var newParam = qs.stringify(
                    {
                        ...hashed,
                        ...prefixJson(newState, clearPrefix)
                    }
                );
                window.location.hash = newParam;
            }, 700);
            return newState;
        };
    },
    getState: function(prefix = ""){
        var hashed = qs.parse(window.location.hash);
        if(prefix){
            var clearPrefix = prefixWithSeparator(prefix);
            var cleanJson = clearJsonProperty(hashed, ".");
            return cleanJson[prefixWithOutSeparator(prefix, ".")];
        }
        else{
            return hashed;
        }
    }
};

var prefixWithSeparator = function(prefix, separator = "."){
    if(!prefix){
        return "";
    }
    else{
        if(prefix.endsWith(separator)){
            return prefix;
        }
        else{ return prefix + separator; }
    }
};
var prefixWithOutSeparator = function(prefix, separator = "."){
    if(!prefix){
        return "";
    }
    else{
        if(prefix.endsWith(separator)){
            return prefix.substring(0, prefix.length - separator.length);
        }
        else{ return prefix; }
    }
};
var clearJsonProperty = function(obj, separator = "."){
    var keys = Object.getOwnPropertyNames(obj);
    var prefixes = lo.chain(keys).map(k => k.split(separator)[0] )
        .uniqBy(k => k).value();

    var result = {};
    for(var i = 0; i < prefixes.length; i++){
        var currentPrefix = prefixes[i];
        if(lo.chain(prefixes).filter(k => k == currentPrefix).length == 1){
            result[currentPrefix] = obj[currentPrefix];
        }
        else{
            var prefixPrefixes = lo.chain(keys)
                .filter(k => k.startsWith(currentPrefix)).value();
            var currentPrefixWithSeparator = prefixWithSeparator(currentPrefix, separator);
            var currentObj = {};
            for(var i = 0; i < prefixPrefixes.length; i++){
                var currentPrefixPrefix = prefixPrefixes[i];
                currentObj[currentPrefixPrefix.substr(currentPrefixWithSeparator.length)] =
                    obj[currentPrefixPrefix];
            }
            result[currentPrefix] = currentObj;
        }
    }
    return result;
};

var prefixJson = function(obj, prefix){
    var result = {};
    var keys = Object.getOwnPropertyNames(obj);
    for(var i = 0; i < keys.length; i++){
        result[prefix + keys[i]] = obj[keys[i]];
    };
    return result;
}

export default QzReactReduxHashState;
