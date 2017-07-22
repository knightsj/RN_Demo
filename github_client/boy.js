import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


import Girl from './girl'
import NavigationBar from './NavigationBar'

export default class Boy extends  Component{

    constructor(props){
        super(props);
        this.state = {
            word:''
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <NavigationBar
                  title={'Boy'}
                  statusBar={{
                      backgroundColor:'red'
                  }}
                />
                <Text>Hello I am a boy</Text>
                <Text style={styles.text} onPress={()=>{
                   this.props.navigator.push({
                       component:Girl,
                       params:{
                           word:'一朵玫瑰',
                           onCallBack:(word)=>{
                               this.setState({
                                   word:word
                               })
                           }
                       }
                   })

                }}>送女孩一朵玫瑰1</Text>
                <Text style={styles.text}>{this.state.word}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
    },

    text:{
        fontSize:20
    }
})