import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import homePage from './HomePage'
import skinPage from './skin'



export default class Root extends Component {

    render() {
        switch (this.props.module_id) {
            case "1":
                return <homePage/>
            case "2":
                return <skinPage/>
        }

    }
}

AppRegistry.registerComponent('RNModules', () => Root);