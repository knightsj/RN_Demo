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
  TabBarIOS
} from 'react-native';

var TabBarDemo = React.createClass({

   // 设置初始值
    getInitialState(){
       return{
           // 默认被选中的tabBarItem
           selectedTabBarItem: 'home'
       }
    },

   
  render() {
    return (
      <View style={styles.container}>

        {/*头部*/}
        <View style={styles.headerViewStyle}>
           <Text style={styles.navTitleStyle}>我是导航栏</Text>
        </View>

        {/*选项卡*/}
        <TabBarIOS
            barTintColor='white'
            tintColor = 'purple'
        >
            {/*homepage tab*/}
            <TabBarIOS.Item
                systemIcon="downloads"
                title="张三"
                badge="3"
                selected={this.state.selectedTabBarItem == 'home'}
                onPress = {()=>{this.setState({selectedTabBarItem: 'home'})}}
            >
               {/*中间这个view是属于这个tab的view*/}
               <View style={[styles.commonViewStyle,{backgroundColor:'red'}]}>
                   <Text>home page</Text>
               </View>
            </TabBarIOS.Item>

            {/*bookmarks tab*/}
            <TabBarIOS.Item
                systemIcon="bookmarks"
                selected={this.state.selectedTabBarItem == 'second'}
                onPress = {()=>{this.setState({selectedTabBarItem: 'second'})}}
            >
                <View style={[styles.commonViewStyle,{backgroundColor:'green'}]}>
                    <Text>bookmarks page</Text>
                </View>
            </TabBarIOS.Item>

            {/*dowloads tab*/}
            <TabBarIOS.Item
                systemIcon="downloads"
                badge="1"
                selected={this.state.selectedTabBarItem == 'three'}
                onPress = {()=>{this.setState({selectedTabBarItem: 'three'})}}
            >
                <View style={[styles.commonViewStyle,{backgroundColor:'blue'}]}>
                    <Text>downloads page</Text>
                </View>
            </TabBarIOS.Item>

            {/*search tab*/}
            <TabBarIOS.Item
                systemIcon="search"
                selected={this.state.selectedTabBarItem == 'four'}
                onPress = {()=>{this.setState({selectedTabBarItem: 'four'})}}
            >
                <View style={[styles.commonViewStyle,{backgroundColor:'orange'}]}>
                    <Text>search page</Text>
                </View>
            </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
});

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: '#F5FCFF',
  },

  headerViewStyle:{
      height:64,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
   },

   navTitleStyle:{
      color:'blue'
   },

  commonViewStyle:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'

  }
});

AppRegistry.registerComponent('component_demo', () => TabBarDemo);
