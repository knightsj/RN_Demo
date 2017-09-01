import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');

var CommonItemView = require('../Common/SJCommonItemView')
var MiddleData = require('../../LocalData/HomeTopMiddleLeft.json')

var HomeMiddleView = React.createClass({


  getDefaultProps(){

    return{
      popToHomeView:null
    }

  },

  render() {
    return (
      <View style={styles.container}>
        {/* 左边 */}
        <View>
         {this.renderLeftView()}
        </View>
        {/* 右边 */}
        <View style={styles.rightViewStyle}>
         {this.renderRightView()}
        </View>
        
      </View>
    );
  },

  renderLeftView(){
    
     var leftData = MiddleData.dataLeft[0];
   return(
    <TouchableOpacity onPress={()=>{alert('点击了')}}>
      <View style={styles.leftViewStyle}>
        <Image source={{uri:leftData.img1}} style={styles.leftImageStyle}/>
        <Image source={{uri:leftData.img2}} style={styles.leftImageStyle}/>
        <Text style={styles.leftViewTitleStyle}>{leftData.title}</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.leftViewPriceStyle}>{leftData.price}</Text>
            <Text style={styles.leftViewSaleStyle}>{leftData.sale}</Text>
        </View>
     </View>   
    </TouchableOpacity>
    
    )

     
  },
 
  renderRightView(){

    var itemArr = [];
    var rightData = MiddleData.dataRight;
    for(var i=0; i<rightData.length;i++){
        var itemData = rightData[i];
        itemArr.push(
            <CommonItemView 
             key={i}
             title={itemData.title}
             subTitle={itemData.subTitle}
             rightIcon={itemData.rightImage}
             titleColor={itemData.titleColor}
             clickCellCallBack={(url)=>this.popToTopView(url)}
            />
        )
    }
    return itemArr;

  },

  popToTopView(url){
    
     if(url==null)return;
     if(this.props.popToHomeView == null)return;

     this.props.popToHomeView(url)
  }

})


const styles = StyleSheet.create({
  container: {
    marginTop:14,
    flexDirection:'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },

  leftImageStyle:{
     width:124,
     height:30,
     resizeMode:'contain'
  },

  leftViewStyle:{
    //   flexDirection:'row',
      marginTop:-1,
      width:width*0.5,
      height:119,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
      marginRight:1,
  },

  leftViewTitleStyle:{
      color:'gray'
  },

  leftViewPriceStyle:{
      color:'red'
  },

  leftViewSaleStyle:{
      color:'orange',
       fontWeight:'bold',
       marginLeft:2
  },

  rightViewStyle:{
    //  flexDirection:'row',
    //  flexWrap:'wrap',
    //  flex:1,
        
  },
  
});

module.exports = HomeMiddleView;