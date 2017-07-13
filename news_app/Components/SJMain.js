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
  TabBarIOS,
  NavigatorIOS,

} from 'react-native';


//引入外部的组件
var Home = require('../Components/SJHome.js');
var Discover = require('../Components/SJFind.js');
var Message = require('../Components/SJMessage.js');
var Mine = require('../Components/SJMine.js');



var Main = React.createClass({
   
    getInitialState(){
        return{
            selectedItem:'home'
        }
    },

    render() {
        return (
        <TabBarIOS
            tintColor = "red"
        >
            {/*首页*/}
            <TabBarIOS.Item
                icon = {require('image!tabbar_home')}
                title = "首页" 
                selected = {this.state.selectedItem == 'home'}
                onPress = {()=>{this.setState({selectedItem:'home'})}}         
            >
            <NavigatorIOS 
                style={styles.navigatorStyle}
                tintColor = "red"
                initialRoute = {
                    {
                        component:Home,
                        title:'首页',
                        leftButtonIcon:require('image!navigationbar_friendattention'),
                        rightButtonIcon:require('image!navigationbar_pop'),
                    }
                }
            
            />
            </TabBarIOS.Item>

            {/*发现*/}
            <TabBarIOS.Item
                icon = {require('image!tabbar_discover')}
                title= "发现"
                selected = {this.state.selectedItem == 'discover'}
                onPress = {()=>{this.setState({selectedItem:'discover'})}}   
            >
            <NavigatorIOS style={styles.navigatorStyle}
                initialRoute = {
                    {
                        component:Discover,
                        title:'发现页',
                        
                    }
                }
            
            />
            </TabBarIOS.Item>

            {/*消息*/}
            <TabBarIOS.Item
                icon = {require('image!tabbar_message_center')}
                title= "消息"
                selected = {this.state.selectedItem == 'message'}
                onPress = {()=>{this.setState({selectedItem:'message'})}}      
            >
            <NavigatorIOS style={styles.navigatorStyle}
                initialRoute = {
                    {
                        component:Message,
                        title:'消息页'
                    }
                }            
            /> 
            </TabBarIOS.Item>


            {/*我的*/}
            <TabBarIOS.Item
                icon = {require('image!tabbar_profile')}
                title= "我的"
                selected = {this.state.selectedItem == 'profile'}
                onPress = {()=>{this.setState({selectedItem:'profile'})}}      
            >
            <NavigatorIOS style={styles.navigatorStyle}
                initialRoute = {
                    {
                        component:Mine,
                        title:'个人页'
                    }
                }            
            /> 
            </TabBarIOS.Item>

        </TabBarIOS>
        );
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  navigatorStyle:{
    flex:1
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

module.exports = Main;