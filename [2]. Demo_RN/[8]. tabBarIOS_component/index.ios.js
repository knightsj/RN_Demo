/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'

var Dimensions = require('Dimensions');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Image,
    ScrollView,
    TabBarIOS,

} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height - 70;

var App = React.createClass({
  getInitialState: function(){
    return {
      tab: 'message'
    };
  },
  select: function(tabName){
    this.setState({
      tab: tabName
    });
  },
  render: function(){
    return(
        <TabBarIOS style={styles.flex}>
          <TabBarIOS.Item
              title="消息"
              icon={require("image!message")}
              onPress={this.select.bind(this, 'message')}
              selected={this.state.tab === 'message'}>
            <ScrollView>
              <View style={styles.message}>
                <Text style={styles.message_title}>南山南</Text>
                <Text>
                  他不再和谁谈论相逢的孤岛，因为心里早已荒芜人烟
                  他的心里再装不下一个家，做一个只对自己说谎的哑巴，他说
                  你任何为人称道的美丽，不及他第一次遇见你
                </Text>
              </View>
            </ScrollView>
          </TabBarIOS.Item>

          <TabBarIOS.Item
              title="联系人"
              icon={require("image!phone")}
              onPress={this.select.bind(this, 'phonelist')}
              selected={this.state.tab === 'phonelist'}>
            <ScrollView>
              <Text style={styles.list}>
                <Text>唐三藏</Text>
                <Text>131-8904-9077</Text>
              </Text>
              <Text style={styles.list}>
                <Text>孙悟空</Text>
                <Text>131-8904-9078</Text>
              </Text>
              <Text style={styles.list}>
                <Text>猪八戒</Text>
                <Text>131-8904-9079</Text>
              </Text>
              <Text style={styles.list}>
                <Text>沙和尚</Text>
                <Text>131-8904-9080</Text>
              </Text>
            </ScrollView>
          </TabBarIOS.Item>

          <TabBarIOS.Item
              title="动态"
              icon={require("image!star")}
              onPress={this.select.bind(this, 'star')}
              selected={this.state.tab === 'star'}>
            <ScrollView style={styles.flex}>
              <Image style={{width:width, height:height}}
                     source={{uri:'http://vczero.github.io/ctrip/star_page.jpg'}}
              />
            </ScrollView>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  message:{
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
  },
  message_title:{
    fontSize:18,
    color: '#18B5FF',
    marginBottom:5,
  },
  list:{
    height:30,
    fontSize:15,
    marginLeft:10,
    marginTop:10,
  }
});

AppRegistry.registerComponent('component_demo', () => App);