
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'

export default class NewPage extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {

    }

    render(){
        return <View style={styles.container}>
            <Text style={styles.tips}>自定义标签</Text>
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tips:{
        fontSize:29
    }
});