import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');

var Home = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        {/* //首页的导航条 */}
        {this.renderNavBar()}
        <Text style={styles.welcome}>
          首页
        </Text>
      </View>
    );
  },

  renderNavBar(){
    return(
      <View style={styles.homeNavBarStyle}>    
          <TouchableOpacity onPress={()=>{alert('点击了')}}>
            <Text style={styles.homeNavRegionStyle}>广州</Text>
          </TouchableOpacity>       
          
           <TextInput
             placeholder="输入商家，品类，商圈"
             style={styles.homeNavInputStyle}
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
    );
  }
});



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  homeNavBarStyle:{
     height:Platform.OS === 'ios'? 64 : 44,
     backgroundColor:'rgba(255,96,0,1.0)',
     flexDirection:'row',
     justifyContent:'space-around'
  },

  homeNavRegionStyle:{
    color:'white',
     marginTop:28
  },

  homeNavInputStyle:{
     //设置输入框
     width:width*0.7,
     height:'ios'? 30 : 26,
     backgroundColor:'white',
     marginTop:22,
     borderRadius:'ios'? 16 : 0,
     paddingLeft:8,

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

