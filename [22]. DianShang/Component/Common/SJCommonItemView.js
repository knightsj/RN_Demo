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

var CommonItemView = React.createClass({

   getDefaultProps(){
       return{
          title:'',
          subTitle:'',
          titleColor:'',
          rightIcon:'',
          tplurl:'',
          clickCellCallBack:null,
       }
   },
   render() {
    return (
    <TouchableOpacity onPress={()=>this.clickCell(this.props.tplurl)}>
        <View style={styles.container}>
            {/* 左边 */}
            <View>
                <Text style={[{color:this.props.titleColor},styles.titleStyle]}>{this.props.title}</Text>
                <Text style={styles.subTitleStyle}>{this.props.subTitle}</Text>
            </View>
            {/* 右边 */}
            <Image 
            style={styles.imageStyle}
            source={{uri:this.props.rightIcon}}/>
        </View>
      </TouchableOpacity>
    );
  },

   clickCell(url){
       if(this.props.tplurl == null) return;
       
       this.props.clickCellCallBack(url)
   }
})


const styles = StyleSheet.create({
  container: {
     backgroundColor:'white',
     width:width*0.5-1,
     height:59,
     flexDirection:'row', 
     alignItems:'center',
     justifyContent:'space-around',
     marginRight:1,
     marginBottom:1,
  },
  
  titleStyle:{
     fontSize:16,
     fontWeight:'bold',
     marginLeft:4
  },

  subTitleStyle:{
     color:'gray',
     marginLeft:4
  },

  imageStyle:{
      width:64,
      height:44,
      resizeMode:'contain'
  }

});

module.exports = CommonItemView;