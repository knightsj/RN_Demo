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
  ActionSheetIOS
} from 'react-native';



var app = React.createClass({

  // render负责渲染视图 返回一个JSX对象，只能包含一个节点中
  render: function () {

    return(

        <View style={styles.container}>
          <Text style={styles.item} onPress={this.tip}>显示选择ActionSheet</Text>
          <Text style={styles.item} onPress={this.share}>显示分享ActionSheet</Text>
        </View>
    );
  },

    tip:function(){

        ActionSheetIOS.showActionSheetWithOptions({

            options:[
              "拨打电话",
              "发送邮件",
              "发送短信",
              "取消",
            ],

            cancelButtonIndex:3,
            destructiveButtonIndex:0,
        },
        
        function(index){
          alert(index);
        }
      );
  },

  share:function(){

    ActionSheetIOS.showShareActionSheetWithOptions({
       url:'https://code.facebook.com',
    },

    function(err){
      alert(err);
    },

    function(e){
      alert(e)
    })
  }
     
});

// 创建了一个样式对象，建议一个组件使用一个StyleSheet对象
// 建议使用外部样式而不是内联样式
var styles  = StyleSheet.create({

    container:{
        flex:1,
        marginTop:20
    },

     item:{
       marginTop:10,
       marginLeft:5,
       marginRight:5,
       height:30,
       borderWidth:1,
       padding:6,
       borderColor:'#ddd'
     },

});



// 入口组件，用来加载其他组件
AppRegistry.registerComponent('component_demo', () => app);
// 第一个参数是应用的名称
// 第二个参数是入口组件对象