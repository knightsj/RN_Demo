import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Main = require('./SJLaunchImage')

var Launch = React.createClass({

  render(){
      return(
          <Image source={{uri:'launchimage'}} style={styles.launchImageStyle}/>
      )
  },

  componentDidMount(){
     //定时 两秒之后切换到Main
     setTimeout(()=>{
        //页面的切换
        this.props.navigator.replace({
           component:Main,
        });
     },2000);
  }
})

const styles = StyleSheet.create({
   launchImageStyle:{
       flex:1
   }
});

module.exports = Launch;

