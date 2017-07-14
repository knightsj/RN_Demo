import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator' 

var Home = require('../Home/SJHome')
var Mine = require('../Mine/SJMine')
var Shop = require('../Shop/SJShop')
var More = require('../More/SJMore')


var Main = React.createClass({

  //初始化函数
  getInitialState(){
    return{
      selectedTab:'home'
    }
  },
  
   render() {
    return (
      <TabNavigator>

            {/* 首页 */}
            <TabNavigator.Item
                title="首页"
                renderIcon = {()=><Image source={{uri:'icon_tabbar_homepage'}} style={styles.tabBarIconImageStyle}/>}
                renderSelectedIcon = {()=><Image source={{uri:'icon_tabbar_homepage_selected'}} style={styles.tabBarIconImageStyle}/>}
                onPress = {()=>this.setState({selectedTab:'home'})}
                selected={this.state.selectedTab === 'home'}
            >
            <Home/>
            </TabNavigator.Item>

            {/* 商家 */}
            <TabNavigator.Item
            title="商家"
                renderIcon = {()=><Image source={{uri:'icon_tabbar_merchant_normal'}} style={styles.tabBarIconImageStyle}/>}
                renderSelectedIcon = {()=><Image source={{uri:'icon_tabbar_merchant_selected'}} style={styles.tabBarIconImageStyle}/>}
                onPress = {()=>this.setState({selectedTab:'shop'})}
                selected={this.state.selectedTab === 'shop'}
            >
            <Shop/>    
            </TabNavigator.Item>

            {/* 我的 */}
            <TabNavigator.Item
            title="我的"
                renderIcon = {()=><Image source={{uri:'icon_tabbar_mine'}} style={styles.tabBarIconImageStyle}/>}
                renderSelectedIcon = {()=><Image source={{uri:'icon_tabbar_mine_selected'}} style={styles.tabBarIconImageStyle}/>}
                onPress = {()=>this.setState({selectedTab:'mine'})}
                selected={this.state.selectedTab === 'mine'}
            >
            <Mine/>    
            </TabNavigator.Item>

            {/* 更多 */}
            <TabNavigator.Item
            title="更多"
                renderIcon = {()=><Image source={{uri:'icon_tabbar_misc'}} style={styles.tabBarIconImageStyle}/>}
                renderSelectedIcon = {()=><Image source={{uri:'icon_tabbar_misc_selected'}} style={styles.tabBarIconImageStyle}/>}
                onPress = {()=>this.setState({selectedTab:'more'})}
                selected={this.state.selectedTab === 'more'}
            >
             <More/>   
            </TabNavigator.Item>

      </TabNavigator>
    );
  }
});


const styles = StyleSheet.create({
  
  tabBarIconImageStyle:{
     width:30,
     height:30, 
  },
});

module.exports = Main;

