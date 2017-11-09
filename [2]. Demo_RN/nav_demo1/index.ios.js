/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NavigationBar from './NavigationBar'
import ViewUtil from './ViewUtil'

export default class nav_demo1 extends Component {


  onBackPress(){
    alert('点击了返回')
  }


  render() {

      let image_nav = <NavigationBar
          backgroundImageUri={'navbar'}
          title={'设置'}
          leftButton={ViewUtil.getNavBackButton(() => this.onBackPress())}
      />

      let textNav = <NavigationBar
          title={'设置'}
          style={{backgroundColor:'red'}}
          leftButton={ViewUtil.getNavBackButton(() => this.onBackPress())}
      />


    return (
      <View style={styles.container}>
          {image_nav}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nav_demo1', () => nav_demo1);
