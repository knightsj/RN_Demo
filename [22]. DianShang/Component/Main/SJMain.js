import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Navigator,
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
            {this.renderTabBarItem('首页','icon_tabbar_homepage','icon_tabbar_homepage_selected','home','首页',Home,'1')} 

            {/* 商家 */}
            {this.renderTabBarItem('商家','icon_tabbar_merchant_normal','icon_tabbar_merchant_selected','shop','商家',Shop)} 

            {/* 我的 */}
            {this.renderTabBarItem('我的','icon_tabbar_mine','icon_tabbar_mine_selected','mine','我的',Mine)} 

            {/* 更多 */}
            {this.renderTabBarItem('更多','icon_tabbar_misc','icon_tabbar_misc_selected','more','更多',More,'3')} 

      </TabNavigator>
    );
  },

  //每个tabbar模块的设置
  renderTabBarItem(title,iconNameNormal,iconNameSelected,selectedTab,componentName,component,badgeText){
    return(
      <TabNavigator.Item
                title = {title}//传递变量一定要加大括号
                renderIcon = {()=><Image source={{uri:iconNameNormal}} style={styles.tabBarIconImageStyle}/>}
                renderSelectedIcon = {()=><Image source={{uri:iconNameSelected}} style={styles.tabBarIconImageStyle}/>}
                onPress = {()=>this.setState({selectedTab:selectedTab})}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText = {badgeText}
      >
      <Navigator
          initialRoute={{name:componentName,component:component}}
          configureScene={()=>{
          return Navigator.SceneConfigs.PushFromRight;
        }}
        
        renderScene={(route,navigator)=>{
          let Component = route.component;
          return<Component {...route.passProps} navigator={navigator}/>;
        }}
          />    
      </TabNavigator.Item>
    );
  }

});


const styles = StyleSheet.create({
  
  tabBarIconImageStyle:{
     width:Platform.OS === 'ios'? 30 : 25, 
     height:Platform.OS === 'ios'? 30 : 25 
  },
  
  selectedTitleStyle:{
    color:'orange'
  }
});

module.exports = Main;

