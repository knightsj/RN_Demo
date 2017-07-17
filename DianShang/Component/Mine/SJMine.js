import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var MyCell = require('../Common/SJCommonImageCell')

var Mine = React.createClass({
   render(){
    return (
      <View style={styles.scrollBGViewStyle}>
        <ScrollView
          style={styles.scrollViewStyle}
        >
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
     marginTop:20,
     flex: 1,
  },
    scrollViewStyle:{      
      backgroundColor:'#e8e8e8'
    },

    sectionViewStyle:{
      marginTop:20,
    }
});

module.exports = Mine;

