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

import Route from './Route'
import homePage from './HomePage'


AppRegistry.registerComponent('Route', () => Route);
AppRegistry.registerComponent('homePage', () => homePage);
