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
    TouchableOpacity

} from 'react-native';

import Progress from './js/Pg'

export default class demo11 extends Component {

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
                    <TouchableOpacity onPress={()=>this.showActionSheet(0)}>
                        <Text style={styles.welcome}>
                            显示 ProgressHUD
                        </Text>
                    </TouchableOpacity>
                </View>


                <Progress
                    loadingText = "清理缓存中..."
                    finishText  = "缓存已清除"
                    failedText =  "缓存清理失败"
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

AppRegistry.registerComponent('demo11', () => demo11);
