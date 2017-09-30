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


export default class action_sheet extends Component {

  constructor(props) {
    super(props);
    this.dialog = ActionSheet;
    this.showAlertSelected = this.showAlertSelected.bind(this);
    this.callbackSelected = this.callbackSelected.bind(this);
  }

  showAlertSelected(){
    this.dialog.show(this.callbackSelected);
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

    alert('take photo');

  }

  pickMultiple(){
    alert('pick multiple');
  }

  show(){

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.showAlertSelected()}>
          <Text style={styles.welcome}>
            点击这里 弹出action sheet
          </Text>
        </TouchableOpacity>
        <ActionSheet
            title="真的要退出登录么?"
            itemTitles={["退出登录"]}
            itemCallbacks={[this.takePhoto,this.pickMultiple]}
            ref={(dialog)=>{
              this.dialog = dialog;}
            }
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
});

AppRegistry.registerComponent('action_sheet', () => action_sheet);
