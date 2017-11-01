import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
} from 'react-native';

import Navigator from 'react-native-deprecated-custom-components';


import SettingPage from './SettingPage'

const defaultRoute = {
    component: SettingPage,
};

export default class Route extends Component {

    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component {...route.params} navigator={navigator} />
        );
    }

    render() {
        return (
            <Navigator.Navigator
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
            />
        );
    }
}
