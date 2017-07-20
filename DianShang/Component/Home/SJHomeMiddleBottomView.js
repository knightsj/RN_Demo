import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var data = require('../../LocalData/SJHome_D4.json')
var CommonItemView = require('../Common/SJCommonItemView')

 var dataArr0 = data.data;
var itemData0 = dataArr0[0];

var MiddleBottomView = React.createClass({
  
 

  render() {
    return (
      <View style={styles.container}>

        {/* <View style={styles.topViewStyle}>
            <CommonItemView
                title={itemData0.maintitle}
                subTitle={itemData0.deputytitle}
                rightIcon={this.dealWidthImgUrl(itemData0.imageurl)}
                titleColor={itemData0.typeface_color}
                tplurl={itemData0.tplurl}
                clickCellCallBack={(data)=>this.popToTopView(data)}
              />
        </View>  */}

         <View style={styles.bottomViewStyle}> 
            {this.renderBottomItems()}
         </View> 
      </View>
    );
  },

  renderBottomItems(){

      var itemArr = [];
      var dataArr = data.data;
      for(var i =0; i<4;i++){
          var itemData = dataArr[i];
          itemArr.push(
              <CommonItemView
                key={i}
                title={itemData.maintitle}
                subTitle={itemData.deputytitle}
                rightIcon={this.dealWidthImgUrl(itemData.imageurl)}
                titleColor={itemData.typeface_color}
                tplurl={itemData.tplurl}
                clickCellCallBack={(data)=>this.popToTopView(data)}
              />
          )
      }
      return itemArr;
  },

  dealWidthImgUrl(url){
      if(url.search('w.h') == -1){
          return url
      }else{
          return url.replace('w.h','80.80')
      }
  }
})


const styles = StyleSheet.create({

  container: {

    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white', 
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,

  },
  
  topViewStyle:{
    // flex:1,
    marginTop:0,
    marginBottom:0,
  },

  bottomViewStyle:{
    // backgroundColor: 'white',
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,
  }
});

module.exports = MiddleBottomView;


