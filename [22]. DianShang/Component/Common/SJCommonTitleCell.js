import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


var TitleCell = React.createClass({

   getDefaultProps(){
      return{
          leftIcon:'',
          leftTitle:'',
          rightTitle:'',
      }
   },

   render() {
    return (
        <TouchableOpacity onPress={()=>{alert('点击了')}}>
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <Image source={{uri:this.props.leftIcon}} style={styles.leftImageStyle}/>
                    <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                </View>
                <View style={styles.rightViewStyle}>
                    <Text style={styles.rightTitleStyle}>{this.props.rightTitle}</Text>
                    <Image source={{uri:'icon_cell_rightArrow'}} style={styles.rightImageStyle}/>            
                </View>
            </View>
      </TouchableOpacity>
    );
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height:44,
    flexDirection:'row',
    backgroundColor:'white',
    borderBottomColor:'#e8e8e8',
    borderBottomWidth:0.5
  },
  
  leftViewStyle:{
     flexDirection:'row',
     alignItems: 'center',
  },

  leftTitleStyle:{
     marginLeft:6, 
     fontSize:17,
  },

  leftImageStyle:{
      width:22,
      height:22,
      marginLeft:10,      
  },

  rightViewStyle:{
    flexDirection:'row',
    alignItems: 'center',
  },
 rightTitleStyle:{
    color:'gray',
    marginRight:6
  },

  rightImageStyle:{
      width:10 ,
      height:8,
      marginRight:10,
  },

});

module.exports = TitleCell;