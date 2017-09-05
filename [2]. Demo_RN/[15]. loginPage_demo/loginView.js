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
  Image,
  TextInput,
} from 'react-native';

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');


class loginView extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Image source={require('./img/avatar.png')} style={styles.headerImage}></Image>
          <TextInput placeholder={'请输入用户名'} style={styles.textInputStyle}/>
          <TextInput placeholder={'请输入密码'} password={true} style={styles.textInputStyle}/>
          <View style={styles.loginButtonStyle}>
              <Text>登录</Text>
          </View>
          <View style={styles.settingStyle}>
              <Text>无法登录</Text>
              <Text>新用户</Text>
          </View>
          <View style={styles.otherLoginStyle}>
              <Text>其他登录方式：</Text>
              <Image source={require('./img/icon3.png')} style={styles.otherLoginImageStyle}/>
              <Image source={require('./img/icon7.png')} style={styles.otherLoginImageStyle}/>
              <Image source={require('./img/icon8.png')} style={styles.otherLoginImageStyle}/>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
     flex:1,
     marginTop:20,
     alignItems:'center',
     backgroundColor: '#F9FFFF',
  },

  headerImage:{
    //   flex:1,
      width:100,
      height:100,
      borderRadius:50,
      borderWidth:2,
      borderColor:'orange',
      marginTop:50,
      marginBottom:40,
  },

  textInputStyle:{
        height:40,
        backgroundColor:'white',
        marginBottom:2,
        textAlign:'center',
  },

  loginButtonStyle:{
    //  height:36,
    //  width:300,
    //  backgroundColor:'green',
    //  marginTop:30,
    //  justifyContent:'center',
    //  borderRadius:10,
    //  marginBottom:20,
     flexDirection:'row',

        height:35,
        width:width*0.8,
        backgroundColor:'green',
        marginTop:30,
        marginBottom:20,

        justifyContent:'center',
        alignItems:'center',
        borderRadius:6

  },

  settingStyle:{
      width:width*0.8,
      backgroundColor:'transparent',
      flexDirection:'row',
      justifyContent:'space-between',
  },

  otherLoginStyle:{

      flexDirection:'row',
      alignItems:'center',

      //绝对定位
      position:'absolute',
      bottom:10,
      left:20,
  },

  otherLoginImageStyle:{
       width:30,
       height:30,
       borderRadius:15,
       marginLeft:8,
  },
});



module.exports = loginView;
AppRegistry.registerComponent('component_demo', () => AImageDemo);
