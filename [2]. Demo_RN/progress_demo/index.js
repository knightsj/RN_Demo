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
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';


import ActionSheet from './ActionSheet'


export default class Example extends Component {

  constructor(props) {
    super(props);

  }

  showActionSheet(type){
      switch (type){

          case 0:{
              this.actionsheet0.show();
          }
          break;

      }

  }

  clickedByPhone(){

    alert('By Phone');

  }

    render() {

        var hideStatusBar = Platform.OS === 'ios' ? false : true;

    return (
      <View style={styles.container}>
          <StatusBar hidden={hideStatusBar} />
          <View style={styles.section}>
              <Text style={styles.title}>
                  default styles:
              </Text>
              <TouchableOpacity onPress={()=>this.showActionSheet(0)}>
                  <Text style={styles.welcome}>
                      1. 3 selection without title
                  </Text>
              </TouchableOpacity>
          </View>


          <ActionSheet
              loadingText = "正在清理缓存..."
              finishText  = "缓存已清除"

              ref={(actionsheet0)=>{this.actionsheet0 = actionsheet0}}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },

    section:{
        marginTop:Platform.OS === 'ios' ? 24 : 20,
        marginLeft:20,
    },

  title: {
      marginBottom:Platform.OS === 'ios' ? 5 : 2,
      fontWeight:'bold',
      fontSize:Platform.OS === 'ios' ? 15 : 14,

  },

    welcome:{
        fontSize:12
    }
});
