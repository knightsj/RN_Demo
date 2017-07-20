import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');


var TopListView = require('./SJHomeTopListView')
var TopListData = require('../../LocalData/TopMenu.json')

var TopView = React.createClass({

   getInitialState(){
     return{
         activePage:0
     }
   },

  render() {


    return (
       <View style={styles.container}>
         {/* 内容 */}
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd = {this.onMomentumScrollEnd}
          >
            {this.renderScrollViewItems()}
          </ScrollView>
         {/* 页码 */}
         <View style={styles.topViewIndicatorStyle}>
             {this.renderIndicator()}
         </View>
         
      </View>
    );
  },
//   一页滚动结束
  onMomentumScrollEnd(scrollView){
    //求出当前的页码
    var currentPage =  Math.floor(scrollView.nativeEvent.contentOffset.x/width);

    this.setState({
        activePage:currentPage
    })
  },

  renderScrollViewItems(){
 
      var itemArr = [];
      var dataArray = TopListData.data;
      for(var i=0;i<dataArray.length;i++){
         itemArr.push(
            <TopListView key={i}
              dataArr={dataArray[i]}
            />
         );
      }
      return itemArr;
  },

  renderIndicator(){

        var indicatorsArr = [],style;

        for(var i = 0; i<2;i++){
             style = (i=== this.state.activePage)?{color:'orange'}:{color:'gray'}
             indicatorsArr.push(
                 <Text  key={i}  style={[{fontSize:24},style]}>&bull;</Text>
             );
         }
        return indicatorsArr;
  },

})


const styles = StyleSheet.create({
  container: {
      backgroundColor:'white'
  },
  
  topViewIndicatorStyle:{
      flexDirection:'row',
      justifyContent:'center'
  }
});

module.exports = TopView;