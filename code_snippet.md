## WebStorm
 引入版本控制工具：VCS enableversioncontrol git
 
 
  yarn add react-native-tab-navigator


## 配色方案

http://color-themes.com/?view=index


## 引入安装的包

import TabNavigator from 'react-native-tab-navigator';
import TabNavigator from 'react-native-tab-navigator';


```
<TabNavigator>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'home'}
    title="Home"
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    badgeText="1"
    onPress={() => this.setState({ selectedTab: 'home' })}>
    {homeView}
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'profile'}
    title="Profile"
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    renderBadge={() => <CustomBadgeView />}
    onPress={() => this.setState({ selectedTab: 'profile' })}>
    {profileView}
  </TabNavigator.Item>
</TabNavigator>
```


## state

```
constructor(props){   super(props);   this.state = {     selectedTab:'home',   } }
```

```js

import React, { Component } from 'react'; import {     AppRegistry,     StyleSheet,     Text,     View,     Image } from 'react-native';   class Demo extends Component{          constructor(props){         super(props);         this.state = {             word:''         }     }           render(){         return(             <View style={styles.container}>                 <Text>Page</Text>             </View>         )     }  }  const styles = StyleSheet.create({     container:{         flex:1,         backgroundColor:'gray',         justifyContent:'center',     }, })

```

## navigator

```js
       <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color:'red'}}
            title="最热"
            renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('./res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_profile'}
            selectedTitleStyle={{color:'yellow'}}
            title="趋势"
            renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'yellow'}]}  source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_profile' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_favorite'}
              selectedTitleStyle={{color:'blue'}}
              title="收藏"
              renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('./res/images/ic_trending.png')} />}
              renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'blue'}]}  source={require('./res/images/ic_trending.png')} />}
              onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_my'}
              selectedTitleStyle={{color:'green'}}
              title="我的"
              renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('./res/images/ic_trending.png')} />}
              renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'green'}]}  source={require('./res/images/ic_trending.png')} />}
              onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
        </TabNavigator>
```

## 新建项目

react-native init demo --version 0.39.2

## 平台区分

引入Platform

  tabBarIconImageStyle:{
     width:Platform.OS === 'ios'? 30 : 25, 
     height:Platform.OS === 'ios'? 30 : 25 
  },


## 宽高

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');

## 点击
<TouchableOpacity onPress={()=>{alert(‘被点击了’)}}>

</TouchableOpacity>


## 外部引用 

var CommonCell = require('../Common/SJCommonCell')

## 函数调用
{this.renderRightView()}


## 初始化props

getDefaultProps(){
      return{
          title:'',
          isSwitch:false,
      }
   },


## 新建模块

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


var MineMiddleView = React.createClass({
     render() {
    return (
      <View style={styles.container}>
        <Text>
          Page Name!
        </Text>
      </View>
    );
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MineMiddleView;

## 图片

 imageStyle:{
      width:64,
      height:44,
      resizeMode:'contain'
  }


## WebView
<WebView
           automaticallyAdjustContentInsets={true}
           source={{uri:this.state.detailUrl}}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           decelerationRate="normal"
           startInLoadingState={true}/> 


