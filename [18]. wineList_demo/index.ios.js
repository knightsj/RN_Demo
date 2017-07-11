/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ListView,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';


var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

//导入JSON数据
var WineList = require('./Wine.json');//数组

var BeerListViewDemo = React.createClass({

    //设置初始值
    getInitialState(){
      //1.1 设置DataSource
      var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});

      //1.2 设置返回数据
      return{
          dataSource:ds.cloneWithRows(WineList)
      }
    }, 

    //设置render函数
    render(){
      return(
        <ListView style={styles.listViewStyle}
           dataSource={this.state.dataSource}
           renderRow = {this.renderRow}
        />
      );
    },

    renderRow(rowData,sectionID,rowID,highlightRow){
        return(
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{AlertIOS.alert('点击了第'+rowID+'行')}}>
            <View style={styles.cellViewStyle}>
                <Image source={{uri:rowData.image}} style={styles.leftImageStyle}/>
                <View style={styles.wineInfoViewStyle}>
                    <Text style={styles.productNameStyle}>{rowData.name}</Text>
                    <Text style={styles.moneyAmountStyle}>¥{rowData.money}</Text>
                </View>
            </View>
        </TouchableOpacity>
        );
    }
    
});



const styles = StyleSheet.create({

    listViewStyle:{
        marginTop:25,
    },

    cellViewStyle:{
        
        height:70,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8',
    },

    wineInfoViewStyle:{
        
        backgroundColor:'white',
        justifyContent:'center',
    },

    leftImageStyle:{
      width:60,
      height:60,
      marginRight:15,
    },

    productNameStyle:{

      fontSize:14,
      width:width*0.7,
    },

    moneyAmountStyle:{
       color:'red',
    },

});

AppRegistry.registerComponent('component_demo', () => BeerListViewDemo);
