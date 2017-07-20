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


var CommonCell = React.createClass({

   getDefaultProps(){
      return{
          title:'',
          isSwitch:false,
          info:'',
      }
   },

   getInitialState(){
       return{
           switchIsOn:false
       }
   },

   render() {
     return (
        <TouchableOpacity onPress={()=>{alert('点击了 '+this.props.title)}}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                {this.renderRightView()}            
            </View>
        </TouchableOpacity>      
    );
  },

  renderRightView(){
          
    if(this.props.isSwitch){

        return(
            <Switch
              value={this.state.switchIsOn == true}
              onValueChange={()=>{this.setState({switchIsOn:!this.state.switchIsOn})}}
            />
        )
        
    }else{
        return(
            <View style={styles.rightPartViewStyle}>
                {this.renderInfo()}
                <Image source={{uri:'icon_cell_rightArrow'}} style={styles.iconImageCellStyle}/>
            </View>
            
        )
    }
  },

  renderInfo(){
     if(this.props.info.length > 0){
         return(
             <Text style={styles.infoStyle}>{this.props.info}</Text>
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
    height:Platform.OS === 'ios'? 40 : 38, 

    borderBottomColor:'#e8e8e8',
    borderBottomWidth:0.5
  },

  iconImageCellStyle:{
      width:8,
      height:8,
      marginRight:12
  },

  titleStyle:{
     marginLeft:12,
     fontSize:14,
  },

  switchStyle:{
    width:40,
    height:20,
    marginRight:8,
  },

  infoStyle:{
      color:'gray',
      marginRight:4,
      fontSize:12,
  },

  rightPartViewStyle:{
      flexDirection:'row',
      alignItems:'center'
  }
});

module.exports = CommonCell;