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
    TouchableOpacity
} from 'react-native';


import Progress from './js/Progress'

export default class demo3 extends Component {


  showActionSheet(type){
    switch (type){

      case 0:{
        this.actionsheet0.show();
      }
        break;

    }

  }

  render() {

    return (
        <View style={styles.container}>
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


          <Progress
              loadingText = "正在清理缓存..."
              finishText  = "缓存已清除"
              finishImagePath = './img/progress@2x.png'
              finishDuration = {0.5}
              ref={(actionsheet0)=>{this.actionsheet0 = actionsheet0}}
          />

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

AppRegistry.registerComponent('demo3', () => demo3);
