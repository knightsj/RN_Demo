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
    Image,
    TouchableOpacity,

} from 'react-native';

var imgs = [
  'http://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=2201742883,753700641&os=1016221517,1952711379&simid=3342130894,485559702&pn=2&rn=1&di=189970141350&ln=3930&fr=&fmq=1461834053046_R&fm=&ic=0&s=0&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523212026_fACJU.thumb.224_0.jpeg&rpstart=0&rpnum=0&adpicid=0',
  'http://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=2201742883,753700641&os=1016221517,1952711379&simid=3342130894,485559702&pn=2&rn=1&di=189970141350&ln=3930&fr=&fmq=1461834053046_R&fm=&ic=0&s=0&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523212026_fACJU.thumb.224_0.jpeg&rpstart=0&rpnum=0&adpicid=0',
  'http://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=2201742883,753700641&os=1016221517,1952711379&simid=3342130894,485559702&pn=2&rn=1&di=189970141350&ln=3930&fr=&fmq=1461834053046_R&fm=&ic=0&s=0&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523212026_fACJU.thumb.224_0.jpeg&rpstart=0&rpnum=0&adpicid=0'
];
var MyImage = React.createClass({
  getInitialState: function(){
    var imgs = this.props.imgs;
    return {
      imgs: imgs,
      count: 0
    };
  },
  goNext: function(){
    var count = this.state.count;
    count ++;
    if(count < imgs.length){
      this.setState({
        count: count
      });
    }
  },
  goPreview: function(){
    var count = this.state.count;
    count --;
    if(count >= 0){
      this.setState({
        count: count
      });
    }
  },
  render: function(){
    return(
        <View style={[styles.flex]}>
          <View style={styles.image}>
            <Image style={styles.img}
                   source={{uri: this.state.imgs[this.state.count]}}
                   resizeMode="contain"
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity onPress={this.goPreview}>
              <View style={styles.btn}>
                <Text>上一张</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goNext}>
              <View style={styles.btn}>
                <Text>下一张</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
});

var App = React.createClass({
  render: function(){
    return(
        <View style={[styles.flex, {marginTop:40}]}>
          <MyImage imgs={imgs}></MyImage>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex: 1,
    alignItems:'center'
  },
  image:{
    borderWidth:1,
    width:300,
    height:200,
    borderRadius:5,
    borderColor:'#ccc'
  },
  img:{
    height:200,
    width:300,
  },
  btns:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20
  },
  btn:{
    width:60,
    height:30,
    borderColor: '#0089FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:3,
    marginRight:20,
  },
});

AppRegistry.registerComponent('component_demo', () => App);
