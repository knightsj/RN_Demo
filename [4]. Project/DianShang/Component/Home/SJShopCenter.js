
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

var TitleCell = require('../Common/SJCommonTitleCell')
var ShopItemView = require('./SJShoppingCenterItemView')

var Data = require('../../LocalData/SJHome_D5.json')

var ShopCenter = React.createClass({


    getDefaultProps(){
      return{
          popToHomeView:null
      }
    },
     render() {
    return (
      <View style={styles.container}>
        {/* 标题cell */}
        <TitleCell
         leftIcon="gw"
         leftTitle="购物中心"
         rightTitle={Data.tips}        
        />
        {/* 下半部分View */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollViewStyle}
        >
            {this.renderAllItems()}
        </ScrollView>
      </View>
    );
  },

   renderAllItems(){
       var itemsArr = [];
       var shopsData = Data.data;
       for(var i = 0; i< shopsData.length; i++){
           var itemData = shopsData[i];
           itemsArr.push(
              <ShopItemView
                key = {i}

                shopImage = {itemData.img}
                shopName = {itemData.name}
                shopSale = {itemData.showtext.text}
                detailUrl = {itemData.detailurl}
                popToShopCenter = {(url)=>this.popToHome(url)}
              />
           )
       }
       return itemsArr;
   },

   popToHome(url){
     
      if(this.props.popToHomeView == null) return;
      this.props.popToHomeView(url)
   }
})


const styles = StyleSheet.create({
  container: {
    marginTop:15,
  },

  scrollViewStyle:{
      flexDirection:'row',
      backgroundColor:'white',
      padding:10,

  }
});

module.exports = ShopCenter;