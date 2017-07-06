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
  TextInput,
} from 'react-native';

//Search 组件
var Search = React.createClass({

    //设置初始状态
    getInitialState: function(){
        return {
            show: false
        };
    },

    getValue: function(text){
        var value = text;

        this.setState({})

        this.setState({
            show: true,
            value: value
        });
    },

    hide: function(val){
        this.setState({
            show: false,
            value: val
        });
    },

    render: function(){
        return (

            <View style={styles.flex}>

                <View style={[styles.flexDirection, styles.inputHeight]}>

                    <View style={styles.flex}>
                        <TextInput
                            style={styles.input}
                            returnKeyType="search"
                            placeholder="请输入关键字"
                            onEndEditing={this.hide.bind(this, this.state.value)}//结束编辑时触发
                            value={this.state.value}
                            //监听输入值的变化
                            onChangeText={this.getValue}/>
                    </View>

                    <View style={styles.btn}>
                        <Text style={styles.search} onPress={this.hide.bind(this, this.state.value)}>搜索</Text>
                    </View>
                </View>

                {
                    this.state.show?

                    <View style={[styles.result]}>
                        <Text onPress={this.hide.bind(this, this.state.value + '哈')}
                              style={styles.item} numberOfLines={1}>{this.state.value}哈</Text>
                        <Text onPress={this.hide.bind(this, this.state.value + '哈哈')}
                              style={styles.item} numberOfLines={1}>{this.state.value}哈哈</Text>
                        <Text onPress={this.hide.bind(this, 80 + this.state.value + '哈哈哈')}
                              style={styles.item} numberOfLines={1}>80{this.state.value}啊哈哈哈</Text>
                        <Text onPress={this.hide.bind(this, this.state.value + '哦哦')}
                              style={styles.item} numberOfLines={1}>{this.state.value}哦哦</Text>
                        <Text onPress={this.hide.bind(this, '哦' + this.state.value + '嗯')}
                              style={styles.item} numberOfLines={1}>诶？{this.state.value}</Text>
                    </View>
                    : null
                }
            </View>
        );
    },

});

var App = React.createClass({
    render: function(){
        return(
            <View style={[styles.flex, styles.topStatus]}>
                <Search></Search>
            </View>
        );
    }
});

var styles = StyleSheet.create({

    flex:{
        flex: 1,
    },

    flexDirection:{
        flexDirection:'row'
    },

    topStatus:{
        marginTop:25,
    },

    inputHeight:{
        height:45,
    },

    input:{
        height:45,
        borderWidth:1,
        marginLeft: 5,
        paddingLeft:5,
        borderColor: '#ccc',
        borderRadius: 4
    },

    btn:{
        width:55,
        marginLeft:-5,
        marginRight:5,
        backgroundColor:'#23BEFF',
        height:45,
        justifyContent:'center',
        alignItems: 'center'
    },
    search:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold'
    },
    result:{
        marginTop:1,
        marginLeft:5,
        marginRight:5,
        height:200,
        borderColor:'#ccc',
        borderTopWidth:1,
    },
    item:{
        fontSize:16,
        padding:5,
        paddingTop:10,
        paddingBottom:10,
        borderWidth:1,
        borderColor:'#ddd',
        borderTopWidth:0,
    }
});

AppRegistry.registerComponent('textInput_component', () => App);