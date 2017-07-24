
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'

export default class MyPage extends Component {

    constructor(props) {
        super(props);
    }
    

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{backgroundColor:'#6495ED'}}
                />
                <Text
                    style={styles.tips}
                    onPress={()=>this.jump()}
                >自定义标签</Text>
            </View>)
    }
    
    jump(){
        this.props.navigation.push({
            component:CustomKeyPage,
            params:{...this.props}
        })
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