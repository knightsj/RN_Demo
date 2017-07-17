import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch
} from 'react-native';


var CommonImageCell = React.createClass({

   getDefaultProps(){
      return{
          leftTitle:'',
          leftIconName:'',
          rightTitle:'',
          rightIconName:'',
      }
   },

   render() {
     return (
        <TouchableOpacity onPress={()=>{alert('点击了 '+this.props.leftTitle)}}>
            <View style={styles.container}>
                {/* 左侧的view */}
                <View style={styles.leftViewStyle}>
                    <Image source={{uri:this.props.leftIconName}} style={styles.leftIconStyle} ></Image>
                    <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                </View>
                {/* 右侧的view */}
                {this.renderRightView()}
            </View>
        </TouchableOpacity>      
    );
  },

  renderRightView(){
     return(
         <View style={styles.rightViewSytle}>
              {this.renderRightContent()}
              <Image source={{uri:'icon_cell_rightArrow'}} style={styles.rightArrowStyle}/> 
         </View>
     )
  },

  renderRightContent(){
       if(this.props.rightIconName.length == 0){
           return(
               <Text style={styles.rightTitleStyle}>{this.props.rightTitle}</Text>
           )
       }else{
           return(
               <Image source={{uri:this.props.rightIconName}} style={styles.rightIconStyle}/>
           )
       }
  },

})

const styles = StyleSheet.create({

  container: {

    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',

    backgroundColor: 'white',
    borderBottomColor:'#dddddd',
    borderBottomWidth:0.5,
    height:Platform.OS === 'ios'? 38 : 24, 

  },

  leftViewStyle:{
      flexDirection:'row',
      alignItems:'center',
      marginLeft:10,

  },

  leftIconStyle:{
     width:22,
     height:22,
     marginRight:6,
     borderRadius:12,
  },

  leftTitleStyle:{
     
  },

  rightViewSytle:{
     flexDirection:'row',
     alignItems:'center',
     marginRight:12
  },

  rightTitleStyle:{
    marginRight:2,
    color:'gray'
  },
   
  rightIconStyle:{
      width:24,
      height:12,
      marginLeft:8,
  },

  rightArrowStyle:{
      width:8,
      height:8,
      marginLeft:8,
  }

});

module.exports = CommonImageCell;