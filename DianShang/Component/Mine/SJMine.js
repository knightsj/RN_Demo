import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var MyCell = require('../Common/SJCommonImageCell')
var HeaderView = require('./SJMineHeaderView');
var MiddleView = require('./SJMineMiddleView')


var Mine = React.createClass({
   render(){
    return (
      <View style={styles.scrollBGViewStyle}>
        <ScrollView
          style={styles.scrollViewStyle}
          contentInset={{top:-200}}
          contentOffset={{y:200}}>
        
        <HeaderView/> 
        
        <View style={styles.sectionViewStyle}>
            <MyCell
                    leftIconName="collect"
                    leftTitle='我的订单'
                    rightTitle="查看全部订单"
            /> 
             <MiddleView/>
         
            
         </View>

         <View style={styles.sectionViewStyle}>
            <MyCell
                    leftIconName="draft"
                    leftTitle='钱包'
                    rightTitle="账户余额 ¥12"
            /> 

            <MyCell
                    leftIconName="like"
                    leftTitle='抵用券'
                    rightTitle="10张"
            /> 
         </View>
           
           <View style={styles.sectionViewStyle}>
            <MyCell
                    leftIconName="new_friend"
                    leftTitle='今日推荐'
                    rightIconName='me_new'
            /> 
          </View>

          <View style={styles.sectionViewStyle}>
            <MyCell
                    leftIconName="pay"
                    leftTitle='积分商城'
                    rightTitle="轻松开店"
            /> 
          </View>

        </ScrollView>
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
  scrollBGViewStyle:{
    //  marginTop:20,
     flex: 1,
  },
    scrollViewStyle:{      
      backgroundColor:'#e8e8e8'
    },

    sectionViewStyle:{
      marginTop:20,
    },

    middleViewStyle:{
     flexDirection:'row'
    },

});

module.exports = Mine;

