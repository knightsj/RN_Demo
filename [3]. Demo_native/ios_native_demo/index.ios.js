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
  View,
    NativeModules,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default class ios_native_demo extends Component {


  log(){
    NativeModules.LogHelper.logMessage('11111');
  }

  render() {


    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>{this.log()}}
        >
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

AppRegistry.registerComponent('ios_native_demo', () => ios_native_demo);
