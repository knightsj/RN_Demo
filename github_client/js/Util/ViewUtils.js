
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';


export default class ViewUtils{
    static getLeftButton(){
        return <TouchableOpacity
            style={{padding:8}}
            onPress={()=>{
                this.props.navigator.pop();
            }}>

        </TouchableOpacity>
    }
}