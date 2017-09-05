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
  // PixelRatio,
} from 'react-native';




var app = React.createClass({

  // render负责渲染视图 返回一个JSX对象，只能包含一个节点中
  render: function () {

    return(
        <View style={ styles.container}>
          <View style={[styles.item,styles.center]}>
            <Text style={styles.font}>酒店</Text>
          </View>
          <View style={[styles.item, styles.lineLeftRight]}>
             <View style={[styles.center,styles.flex, styles.lineCenter]}>
               <Text style={styles.font}>海外酒店</Text>
             </View>
            <View style={[styles.center,styles.flex]}>
              <Text style={styles.font}>特惠酒店</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={[styles.center,styles.flex,styles.lineCenter]}>
              <Text style={styles.font}>团购</Text>
            </View>
            <View style={[styles.center,styles.flex]}>
              <Text style={styles.font}>客栈.公寓</Text>
            </View>
          </View>
        </View>

    )

  }
});

// 创建了一个样式对象，建议一个组件使用一个StyleSheet对象
// 建议使用外部样式而不是内联样式
var styles  = StyleSheet.create({

    container:{
        marginTop:20,//向下
        marginLeft:5,
        marginRight:5,
        height:84,
        borderRadius:5,
        padding:2,
        // flex:1,//平铺沾满整个屏 跟高度是冲突的
        borderColor:'blue',
        flexDirection:'row',
      backgroundColor:'#FF0067',
    },

     item:{
       flex:1,
       height:80,
     },

     center:{
       justifyContent:'center',
       alignItems:'center'      //水平居中
     },

     flex:{
       flex:1
     },

     font:{
         color:'#fff',
         fontSize:16,
         fontWeight:'bold',//粗体
     },

     lineLeftRight: {
         borderLeftWidth: 1 ,
         borderRightWidth: 1,
         borderColor: '#fff'
     },

     lineCenter:{
         borderBottomWidth:1,
         borderColor:'#fff'
     }

});



// 入口组件，用来加载其他组件
AppRegistry.registerComponent('component_demo', () => app);
// 第一个参数是应用的名称
// 第二个参数是入口组件对象