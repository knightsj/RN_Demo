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
  View
} from 'react-native';

var Main = require('./Components/SJMain.js');

export default class news_app extends Component {
  render() {
    return (
      <Main/>
    );
  }
}


AppRegistry.registerComponent('news_app', () => news_app);
