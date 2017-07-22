import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
} from 'react-native';

import WelcomePage from './Welcome'

function setup () {
    class Root extends Component{
        renderScene(route,navigator){
            let Component=route.component;
            return <Component {...route.params} navigator={navigator}/>
        }

        render(){
            return <Navigator
               initialRoute={{component:WelcomePage}}
               renderScene={(route, navigator)=>this.renderScene(route,navigator)}
            />
        }
    }
    return <Root/>
}

module.exports=setup;
