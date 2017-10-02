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

  }

  showAlertSelected(){
    this.actionsheet1.show();
  }

  takePhoto(){

    alert('take photo');

  }

  pickMultiple(){
    alert('pick multiple');
  }


  render() {





    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.showAlertSelected()}>
            <Text style={styles.welcome}>
              Click here to show action sheet
            </Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.showAlertSelected()}>
              <Text style={styles.welcome}>
                  Click here to show action sheet
              </Text>
          </TouchableOpacity>
        <ActionSheet
            mainTitle="时代峰峻克鲁塞德时代峰峻克鲁塞德时代峰峻克鲁塞德时代峰峻克鲁塞德"
            itemTitles = {["sdfsdfds","sdfsdfsdf"]}
            borderRadius = {6}
            bottomSpace = {10}
            leftSpace = {6}
            itemVerticalSpace = {4}
            titleFontWeight ="bold"
            contentBackgroundColor = 'yellow'
            mainTitlePadding = {18}
            ref={(actionsheet1)=>{this.actionsheet1 = actionsheet1}}
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
