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
  Image
} from 'react-native';

var LoginView = require('./loginView');

class LoginViewDemo extends Component{
   render(){
     return(
         <LoginView/>
     );
   }
}


AppRegistry.registerComponent('component_demo', () => LoginViewDemo);
