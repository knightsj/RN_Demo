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
  }

  showAlertSelected(){
    this.dialog.show();
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
        <ActionSheet

            itemTitles = {["sdfsdfds","sdfsdfsdf"]}
            borderRadius = {6}
            bottomSpace = {10}
            leftSpace = {6}

            itemCallbacks={[this.takePhoto]}
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
