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

var NewsDetail = React.createClass({
  render:function(){
     return(
        <View style={styles.container}>
           <WebView
              bounces = {false}
              source = {{uri:this.props.rowData.url}}
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


module.exports = NewsDetail;