import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

var CommonCell = require('../Common/SJCommonCell');

var More = React.createClass({

 render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}

        <ScrollView>
          <View style={styles.scrollSectionViewStyle}>
             <CommonCell
               title="扫一扫"                
             /> 
          </View>

          <View style={styles.scrollSectionViewStyle}>
             <CommonCell
               title="省流量模式"
               isSwitch={true}
             /> 

             <CommonCell
               title="消息提醒"
             /> 

             <CommonCell
               title="邀请好友"
             /> 

             <CommonCell
               title="清空缓存"
               info="3.21M"
             /> 

          </View>

          <View style={styles.scrollSectionViewStyle}>
             <CommonCell
               title="账号与安全"                
             /> 

             <CommonCell
               title="意见反馈"
             /> 

             <CommonCell
               title="帮助"
             /> 

          </View>

          <View style={styles.scrollSectionViewStyle}>
            
             <CommonCell
               title="版本号"
               info="v 1.0.2"
             /> 

              <CommonCell
               title="关于"                
             /> 

          </View>
          
          

        </ScrollView>
      </View>
    );
  },

  renderNavBar(){
     return(
       <View style={styles.navBarViewStyle}>
         <Text style={styles.navTextStyle}>更多</Text>
         <TouchableOpacity onPress={()=>{alert('点了')}} style={styles.navRightViewStyle}>
            <Image source={{uri:'icon_mine_setting'}} style={styles.navImageStyle} />
         </TouchableOpacity>
       </View>
     )
  },
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
   
  navBarViewStyle:{
     height:Platform.OS === 'ios'? 64 : 44,
     backgroundColor:'rgba(255,96,0,1.0)',
     flexDirection:'row',
    //  alignItems:'center',
     justifyContent:'center'
  },

  navImageStyle:{
     width:Platform.OS === 'ios'? 28 : 24, 
     height:Platform.OS === 'ios'? 28 : 24,     
  },

  navRightViewStyle:{
    position:'absolute',
    right:10,
    bottom:10,
  },

  navTextStyle:{
     color:'white',
     fontSize:17,
     fontWeight:'bold',
     marginTop:32,
  },

  scrollSectionViewStyle:{
     marginTop:16
  }

});

module.exports = More;

