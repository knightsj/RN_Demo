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

// import Route from './Route'
// import homePage from './HomePage'
// import skinPage from './skin'
//
// AppRegistry.registerComponent('Route', () => Route);
// AppRegistry.registerComponent('homePage', () => homePage);
// AppRegistry.registerComponent('skinPage', () => skinPage);

import RNModules from './Root'

import Route from './Route'


AppRegistry.registerComponent('Route', () => Route);