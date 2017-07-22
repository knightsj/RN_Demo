import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Boy from './boy'
import NavigationBar from './js/common/NavigationBar'

export default class Girl extends Component{

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
                    title={'Girl'}
                    statusBar={{
                        backgroundColor:'yellow'
                    }}
                />

                <Text style={styles.text}>I am a girl</Text>
                <Text style={styles.text}>{this.props.word}</Text>
                <Text style={styles.text}
                   onPress={()=>{
                       this.props.onCallBack('一盒巧克力')
                       this.props.navigator.pop()
                   }}
                >回赠巧克力</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'pink',
        justifyContent:'center',
    },

    text:{
        fontSize:22
    }
})