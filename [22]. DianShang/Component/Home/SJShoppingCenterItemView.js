import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';


var ShoppingCenterItemView = React.createClass({

  getDefaultProps(){
    return{
        shopImage:'',
        shopSale:'',
        shopName:'',
        detailUrl:'',
        popToShopCenter:null
    }
  },

  render() {
    return (
        <TouchableOpacity onPress={()=>{this.clickItem(this.props.detailUrl)}}>
           <View style={styles.container}>
               <Image source={{uri:this.props.shopImage}} style={styles.imageStyle}/>
               <Text style={styles.shopSaleTextStyle}>{this.props.shopSale}</Text>
               <Text style={styles.shopNameStyle}>{this.props.shopName}</Text>
           </View>
        </TouchableOpacity>
      
    );
  },

  clickItem(url){
      if(this.props.detailUrl == null) return;

      this.props.popToShopCenter(url)
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:8,
  },

  imageStyle:{
    width:120,
    height:100,
    borderRadius:6,
  },
  
  shopSaleViewStyle:{
    borderTopRightRadius:8,
  },

  shopSaleTextStyle:{
     position:'absolute',
     left:0,
     bottom:24,
     backgroundColor:'orange',
     color:'white',
     padding:3,
  },

  shopNameStyle:{
      textAlign:'center',
      marginTop:5
  }
});

module.exports = ShoppingCenterItemView;