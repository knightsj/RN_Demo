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
            bgColor:'yellow',
            navColor:'blue'
        }
    }


    changeIntoSkin(skinName){
        SkinModule.changeSkinWithName(skinName);
    }

    componentWillMount() {
        //开始监听

        this.listener = skinModule.addListener("RNChangeSkin",(skinInfo) => this.changeSkin(skinInfo))
    }


    componentDidMount() {


    }

    componentWillUnmount() {
        if(this.listener){
            this.listener.remove();
        }
    }

    changeSkin(skinInfo){

        // 单个转换
        // SkinModule.getColor("bgColor","color_1",(result) =>this.setState(result));
        // SkinModule.getColor("navColor","color_2",(result) =>this.setState(result));

        //批量转换:数组
        SkinModule.getColors(["bgColor","navColor"],["color_1","color_2"],(result) =>this.setState(result));

        // this.setState({
        //     skin:skinInfo.skinName,
        //
        // })

        //批量转换:字典
        SkinModule.getColorsWithDict({"bgColor":"color_1","navColor":"color_2"},(result) =>this.setState(result));
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.navigationBarStyle,{backgroundColor: this.state.navColor}]}>
                    <Text style={styles.navTextStyle}>
                        我是导航栏
                    </Text>
                </View>

                <View style={[{flex: 1},{backgroundColor: this.state.bgColor}]}>

                    <TouchableOpacity onPress={()=>this.changeIntoSkin('blue')}>
                        <Text style={styles.instructions}>
                            Click to change into blue skin!
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.changeIntoSkin('red')}>
                        <Text style={styles.instructions}>
                            Click to change into red skin!
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.instructions}>
                        Current skin: {this.state.skin}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navTextStyle:{
        fontSize: 23,
        color:'white'

    },
    navigationBarStyle:{
         height:80,
         justifyContent:'center',
         alignItems:'center',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        marginTop:40,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('skinPage', () => skinPage);