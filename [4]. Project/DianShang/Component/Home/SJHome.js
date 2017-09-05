import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');

var TopView = require('./SJHomeTopView')
var MiddleView = require('./SJHomeMiddleView')
var MiddleBottomView = require('./SJHomeMiddleBottomView')
var ShopCenter = require('./SJShopCenter')
var ShopCenterDetail = require('./SJShopDetailView')
var ActivityDetail = require('./SJActivityDetailView')

var Home = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={[{height:Platform.OS === 'ios'? 20 : 0, 
     backgroundColor:'rgba(255,96,0,1.0)',}]}></View>
        {/* //首页的导航条 */}
        {this.renderNavBar()}
        {/* 首页的主要内容 */}
        <ScrollView>
           {/* 头部的View */}
           <TopView />    
           <MiddleView 
             popToHomeView = {(url)=>this.popToActivityDetailView(url)}
            />
           <MiddleBottomView 
             popToHomeView = {(url)=>this.popToActivityDetailView(url)}
           /> 
           <ShopCenter 
             popToHomeView ={(url) => this.popToShopCenterDetail(url)}
           />
        </ScrollView>
        
      </View>
    );
  },

  renderNavBar(){
    return(
      <View style={styles.naviBarStyle}>
        <View style={styles.homeNavBarStyle}>    
            <TouchableOpacity onPress={()=>{alert('点击了')}}>
              <Text style={styles.homeNavRegionStyle}>广州</Text>
            </TouchableOpacity>       
            
            <TextInput
              placeholder="输入商家，品类，商圈"
              style={styles.homeNavInputStyle}
              underlineColorAndroid="transparent"
              
            />
            <View style={styles.homeNavRightViewStyle}>
              <TouchableOpacity onPress={()=>{alert('点击了')}}>
                <Image source={{uri:'icon_homepage_message'}} style={styles.homeNavRightImageStyle}/>
              </TouchableOpacity>  
              <TouchableOpacity onPress={()=>{alert('点击了')}}>
                <Image source={{uri:'icon_homepage_scan'}} style={styles.homeNavRightImageStyle}/>
              </TouchableOpacity>  
            </View>
        </View>
      </View>
      
    );
  },

   // 跳转到购物中心详情页
    popToShopCenterDetail(url){

       this.props.navigator.push(
        {  
               component: ShopCenterDetail, // 要跳转的版块
               passProps:{'url':this.dealWidthUrl(url)} 
        }
       );
    },

    popToActivityDetailView(url){
      this.props.navigator.push(
        {
            component: ActivityDetail, // 要跳转的版块
            passProps:{'url':this.dealWidthUrl(url)} 
          
        }
           
      );
    },


    dealWidthUrl(url){
       return url.replace('imeituan://www.meituan.com/web?url=','');
    }
});



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },

  homeNavBarStyle:{
     height:'ios'? 44 : 54,
    //  height:54,
     backgroundColor:'rgba(255,96,0,1.0)',
     flexDirection:'row',
     justifyContent:'space-around',
     alignItems:'center',
  },

  homeNavRegionStyle:{
    color:'white',
  },

  homeNavInputStyle:{
     //设置输入框
     width:width*0.7,
     height:'ios'? 30 : 28,
     backgroundColor:'white',
     borderRadius:16,
     padding:0,
     marginTop:'ios'? 6 : 2,
     paddingLeft:'ios'? 8 : 6,
     paddingBottom:'ios'? 0 : 6,
     
  },

  homeNavRightImageStyle:{
      width:'ios'? 28 : 24,
      height:'ios'? 28 : 24,
  },

  homeNavRightViewStyle:{
      flexDirection:'row',
      alignItems:'center',
      height:64,
      marginTop:4
  },
});

module.exports = Home;

