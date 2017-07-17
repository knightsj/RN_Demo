import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';


var Main = require('./Component/Main/SJMain')
var LaunchImage = require('./Component/Main/SJLaunchImage')

export default class DianShang extends Component {

  render() {
    return (
      <Navigator
              initialRoute={{name:componentName,component:LaunchImage}}
              configureScene={()=>{
              return Navigator.SceneConfigs.PushFromRight;
            }}
            
            renderScene={(route,navigator)=>{
              let Component = route.component;
              return<Component {...route.passProps} navigator={navigator}/>;
            }}
      />  
    );
  }
}


AppRegistry.registerComponent('DianShang', () => DianShang);
