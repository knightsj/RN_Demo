import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
} from 'react-native';

import Navigator from 'react-native-deprecated-custom-components';


import MePage from '../view/me/MePage'

const defaultRoute = {
    component: MePage,
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
