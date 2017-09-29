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

import ActionSheet from './ActionSheet'

const selectedArr = ["拍照", "图库"];

export default class action_sheet extends Component {

  constructor(props) {
    super(props);
    this.dialog = ActionSheet;
    this.showAlertSelected = this.showAlertSelected.bind(this);
    this.callbackSelected = this.callbackSelected.bind(this);
  }

  showAlertSelected(){
    this.dialog.show(selectedArr, '#333333', this.callbackSelected);
  }

  callbackSelected(i){
    switch (i){
      case 0: // 拍照
        this.takePhoto();
        break;
      case 1: // 图库
        this.pickMultiple();
        break;
    }
  }

  takePhoto(){

  }

  pickMultiple(){

  }

  show(){
    alert('show')

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.showAlertSelected()}>
          <Text style={styles.welcome}>
            Welcome to React Native***
          </Text>
        </TouchableOpacity>
        <ActionSheet
            title = "请选择照片啊啊啊啊啊啊啊"
            ref={(dialog)=>{
              this.dialog = dialog;}}
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

AppRegistry.registerComponent('action_sheet', () => action_sheet);
