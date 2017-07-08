/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Dimensions = require('Dimensions');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var App = React.createClass({
  render:function(){
     return(
        <View style={styles.container}>
           <WebView
              injectedJavaScript="alert('刷新成功')"
              bounces = {false}
              url = 'http://weibo.com/vczero'
              style = {{width:width,height:height}}>
           </WebView>
        </View>
     );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('component_demo', () => App);
