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
    TouchableOpacity,
    NativeModules,
    NativeEventEmitter

} from 'react-native';


var SkinModule = NativeModules.SkinModule;
var skinModule = new NativeEventEmitter(SkinModule)

export default class skinPage extends Component {

    constructor(props){
        super(props);
        this.state={
            skin:'',
        }
    }


    changeIntoSkin(skinName){
        SkinModule.changeSkinWithName(skinName);
    }

    componentWillMount() {
        //开始监听

        this.listener = skinModule.addListener("RNChangeSkin",(skinInfo) => this.changeSkin(skinInfo))
    }


    componentWillUnmount() {
        if(this.listener){
            this.listener.remove();
        }
    }

    changeSkin(skinInfo){
        this.setState({
            skin:skinInfo.skinName
        })
    }


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={()=>this.changeIntoSkin('blue')}>
                    <Text style={styles.instructions}>
                        Click to change into blue color!
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=>this.changeIntoSkin('red')}>
                    <Text style={styles.instructions}>
                        Click to change into red color!
                    </Text>
                </TouchableOpacity>
                <Text style={styles.instructions}>
                   Current skin: {this.state.skin}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('skinPage', () => skinPage);