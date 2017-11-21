import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
} from 'react-native';

import Navigator from 'react-native-deprecated-custom-components';
import SettingPage from './SettingPage'

import homePage from './HomePage'
import skinPage from './skin'




const defaultRoute = {
    component: homePage,
};

export default class Route extends Component {

    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component {...route.params} navigator={navigator} />
        );
    }

    render() {

        let target = null;

        alert(this.props.module_id)
        switch (this.props.module_id) {
            case "1":
                target = homePage;
            case "2":
                target = skinPage;
        }


        return (
            <Navigator.Navigator
                initialRoute={{component:target}}
                renderScene={this._renderScene}
            />
        );
    }
}

AppRegistry.registerComponent('Route', () => Route);