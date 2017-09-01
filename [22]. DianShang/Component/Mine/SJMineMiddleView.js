import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var GridsData = require('./SJMineMiddleViewData.json')

var MineMiddleView = React.createClass({
  render() {
    return (
      <View style={styles.container}>
         {this.renderAllGrids()}
      </View>
    );
  },

   renderAllGrids(){
       //定义组件数组
       var gridArr = [];
       for(var i=0; i<GridsData.length;i++){
           var data = GridsData[i];
            gridArr.push(
               <GridView
                    key = {i}
                    iconName = {data.iconName}
                    title = {data.title}
               />
           );
       }
       return gridArr;
   }
})

var GridView = React.createClass({

    getDefaultProps(){
       return{
           iconName:'',
           title:''
       }
    },

    render(){
        return(
          <TouchableOpacity onPress={()=>{alert('点击了 '+this.props.title)}}>  
            <View style={gridViewStyle.gridBGStyle}>
                <Image source={{uri:this.props.iconName}} style={gridViewStyle.gridIconStyle}/>
                <Text style={gridViewStyle.gridTitleStyle}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
        )
    }
})


const styles = StyleSheet.create({
  container: {
    flex:1,
    height:60, 
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent:'space-around',
    flexDirection:'row'
  },
});

const gridViewStyle = StyleSheet.create({

    gridBGStyle:{
        alignItems: 'center',
        justifyContent:'center',
    },

    gridIconStyle:{
        width:32,
        height:28
    },

    gridTitleStyle:{
        color:'gray',
        fontSize:13
    }
})

module.exports = MineMiddleView;

