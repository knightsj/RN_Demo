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
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

var App = React.createClass({

     show:function (text) {
         alert(text)
     },
    // TouchableHighlight
     render:function () {
        return (
            <View style={styles.flex}>
                <View>
                    <TouchableHighlight
                        onPress = {this.show.bind(this,'React Native入门与实战')}
                        underlayCorlor = 'yellow'>
                        <Text style={styles.item}>React Native入门与实战</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {this.show.bind(this,'图灵出版社')}
                        underlayCorlor = 'blue'>
                        <Text style={styles.item}>图灵出版社</Text>
                    </TouchableHighlight>

                </View>
            </View>
        );
    },

    //TouchableOpacity
    // render:function () {
    //     return (
    //         <View style={styles.flex}>
    //             <View>
    //                 <TouchableOpacity onPress = {this.show.bind(this,'React Native入门与实战')}>
    //                     <Text style={styles.item}>React Native入门与实战</Text>
    //                 </TouchableOpacity>
    //
    //                 <TouchableOpacity onPress = {this.show.bind(this,'图灵出版社')}>
    //                     <Text style={styles.item}>图灵出版社</Text>
    //                 </TouchableOpacity>
    //
    //                 <TouchableOpacity>
    //                     <View style={styles.btn}>
    //                         <Text style={{fontSize:20, color:'#fff'}}>按钮</Text>
    //                     </View>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     );
    // },

});

const styles = StyleSheet.create({
   flex:{
     flex:1,
     marginTop:25
   },

   item:{
     fontSize:18,
     marginLeft:5,
     color:'#434343'
   },

   btn:{
       marginLeft:30,
       marginTop:30,
       width:100,
       height:30,
       backgroundColor:'#18B4FF',
       justifyContent:'center',
       alignItems:'center',
       borderRadius:50,
   }
});

AppRegistry.registerComponent('component_demo', () => App);
