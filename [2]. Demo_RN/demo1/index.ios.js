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

export default class demo1 extends Component {

    onBackPress(){

    }

// <NavigationBar
// backgroundImageUri="navbar"
// title={'版本信息'}
// leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}
// />

    // style={{backgroundColor:'red'}}
  render() {
    return (
      <View style={styles.container}>

          <NavigationBar
              backgroundImageUri="navbar"
              title={'版本信息'}
              leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}

          />
          <Text style={styles.welcome}>
              Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
              To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
          </Text>

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

AppRegistry.registerComponent('demo1', () => demo1);
