import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import HomePage from './HomPage'

export default class WelcomePage extends Component{

    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })

        },2000);
    }

    componentWillMount(){
        this.timer&&clearTimeout(this.timer);
    }

    render(){
        return <View>
            <NavigationBar
               title={'欢迎'}
            />
            <Text>欢迎</Text>
        </View>
    }
}