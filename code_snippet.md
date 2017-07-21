## WebStorm
 引入版本控制工具：VCS enableversioncontrol git
 



## 新建项目

react-native init demo --version 0.39.2

## 平台区分

引入Platform

  tabBarIconImageStyle:{
     width:Platform.OS === 'ios'? 30 : 25, 
     height:Platform.OS === 'ios'? 30 : 25 
  },


## 宽高

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');

## 点击
<TouchableOpacity onPress={()=>{alert(‘被点击了’)}}>

</TouchableOpacity>


## 外部引用 

var CommonCell = require('../Common/SJCommonCell')

## 函数调用
{this.renderRightView()}


## 初始化props

getDefaultProps(){
      return{
          title:'',
          isSwitch:false,
      }
   },


## 新建模块

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


var MineMiddleView = React.createClass({
     render() {
    return (
      <View style={styles.container}>
        <Text>
          Page Name!
        </Text>
      </View>
    );
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MineMiddleView;

## 图片

 imageStyle:{
      width:64,
      height:44,
      resizeMode:'contain'
  }


## WebView
<WebView
           automaticallyAdjustContentInsets={true}
           source={{uri:this.state.detailUrl}}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           decelerationRate="normal"
           startInLoadingState={true}/> 


