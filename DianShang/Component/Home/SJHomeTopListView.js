
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  Platform
} from 'react-native';

var Dimentions = require('Dimensions');
var{width,height} = Dimentions.get('window');


var cols = 5;
var cellWidth = Platform.OS == 'ios'?64:56
var cellHeight = 70
var vMargin = (width - cellWidth*cols)/(cols+1);

var TopListView = React.createClass({

  getDefaultProps(){
      return{
          dataArr:[]
      }
  },  

  getInitialState(){
     
    var ds = new ListView.DataSource({rowHasChanged:(row1,row2) => row1 !==row2});

    return{
        dataSource:ds.cloneWithRows(this.props.dataArr)
    }
  },

  render() {
    return (
      <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderRow}
         contentContainerStyle={styles.contentViewStyle}
         scrollEnabled={false}
      />
    );
  },

  renderRow(rowData){
      return(
        // <TouchableOpacity onPress={()=>alert('点击了 '+rowData.title)}>
            <View style={styles.cellStyle}>
                <Image source={{uri:rowData.image}} style={styles.imageStyle}/>
                <Text style={styles.textStyle}>{rowData.title}</Text>
            </View>
        // </TouchableOpacity>
      );
  }
})


const styles = StyleSheet.create({

  imageStyle:{
      width:52,
      height:52,
  },

  contentViewStyle:{
      flexDirection:'row',
      flexWrap:'wrap',
      width:width
  },
  
  cellStyle:{

    //   backgroundColor:'red',
      width:cellWidth,
      height:cellHeight,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:12,
      marginLeft:vMargin
  },

  textStyle:{
      fontSize:Platform.OS == 'ios'? 11:10,
      color:'gray'
  }
});

module.exports = TopListView;



