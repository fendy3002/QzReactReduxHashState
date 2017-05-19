import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFilter, setNavigation } from '../actions/index.js'

var App = function({filter, navigation, setFilter, setNavigation}){
    var refName = null;
    var refCountry = null;
    var refTitle = null;
    var refOffset = null;

    var onChange = function(){
        setFilter({
            name: refName.value,
            country: refCountry.value,
            title: refTitle.value
        });
        setNavigation(refOffset.value);
    };

    return <div>
        <div>
            <label>Name</label>
            <input name="name" ref={(node) => { refName = node; }}
            defaultValue={filter.name} onChange={()=> onChange()} />
        </div>
        <div>
            <label>Country</label>
            <input name="country" ref={(node) => { refCountry = node; }}
            defaultValue={filter.country} onChange={()=> onChange()} />
        </div>
        <div>
            <label>Title</label>
            <input name="title" ref={(node) => { refTitle = node; }}
            defaultValue={filter.title} onChange={()=> onChange()} />
        </div>
        <div>
            <label>Offset</label>
            <input name="offset" ref={(node) => { refOffset = node; }}
            defaultValue={navigation.offset} onChange={()=> onChange()} />
        </div>
    </div>;
};

var mapStateToProps = function(state){
    return {
        filter: state.filter,
        navigation: state.navigation
    };
};

var mapDispatchToProps = function(dispatch, getState){
    return {
        setFilter: bindActionCreators(setFilter, dispatch),
        setNavigation: bindActionCreators(setNavigation, dispatch),
    };
};

var StateApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default StateApp;
