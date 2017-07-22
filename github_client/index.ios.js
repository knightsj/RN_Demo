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
    Navigator,
    Image
} from 'react-native';


import TabNavigator from 'react-native-tab-navigator'
import Boy from './boy'
import FetchTest from './FetchTest'

export default class github_client extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
         <FetchTest/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('github_client', () => github_client);
