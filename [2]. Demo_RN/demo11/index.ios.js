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

import Progress from './js/Progress'

export default class demo11 extends Component {

    render() {

        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={()=>this.progress.show()}>
                    <Text style={styles.welcome}>
                        显示 ProgressHUD
                    </Text>
                </TouchableOpacity>

                <Progress
                    type = "original"
                    loadingText  = "清理缓存中..."      //加载中的文案
                    succeedText  = "缓存已清除"         //成功的文案
                    succeedImage = "progress_succeed" //成功的图片
                    failedText   =  "清理缓存失败"      //失败的文案
                    failedImage  = "progress_failed"  //失败的图片
                    finishDuration = {0.8}            //消失时间
                    maskOpacity = {0}
                    maskBackgroundColor='#fff'
                    ref={(progress)=>{this.progress = progress}}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('demo11', () => demo11);
