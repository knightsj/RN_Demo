import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  WebView
} from 'react-native';


var ShopDetailView = React.createClass({
  
  getInitialState(){
      return{
    //    detailUrl:this.props.url
    detailUrl:"http://www.baidu.com"
      }
    
  },

  render() {
    return (    

     <View style={styles.container}>
        <View style={[{height:Platform.OS === 'ios'? 20 : 0, 
     backgroundColor:'rgba(255,96,0,1.0)',}]}></View>
        {this.renderNavBar()}
        <WebView
           automaticallyAdjustContentInsets={true}
           source={{uri:this.state.detailUrl}}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           decelerationRate="normal"
           startInLoadingState={true}/>         
     </View>
    );
  },

  renderNavBar(){
     return(
       <View >
        <View style={styles.navBarViewStyle}> 
          <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={styles.navLeftViewStyle}>
            <Image source={{uri:'icon_camera_back_normal'}} style={styles.navImageStyle} />
         </TouchableOpacity>        
          <Text style={styles.navTextStyle}>购物中心详情</Text>
          <TouchableOpacity onPress={()=>{alert('点了')}} style={styles.navRightViewStyle}>
              <Image source={{uri:'icon_mine_setting'}} style={styles.navImageStyle} />
          </TouchableOpacity>
        </View>
       </View>
      )
  },
  

     
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    navBarViewStyle:{
     height:44,
     backgroundColor:'rgba(255,96,0,1.0)',
     flexDirection:'row',
     alignItems:'center',
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
  },

  navLeftViewStyle:{
    position:'absolute',
    left:10,
    bottom:10,
  },

  statusBarStyle:{
     height:Platform.OS === 'ios'? 20 : 0, 
  },
});

module.exports = ShopDetailView;