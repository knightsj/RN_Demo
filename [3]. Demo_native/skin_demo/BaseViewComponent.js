import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules
} from 'react-native';


export default class BaseComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            skin:'',
        }
    }

    componentDidMount() {

        NativeModules.SkinModule.currentSkinName((result)=>{
            this.setState({
                skin:result
            })
        })
    }

    // componentWillMount() {
    //     //开始监听
    //     var SkinModule = NativeModules.SkinModule;
    //     var skinModule = new NativeEventEmitter(SkinModule)
    //     this.listener = skinModule.addListener("RNChangeSkin",(skinInfo) => this.changeSkin(skinInfo))
    // }
    //
    //
    //
    // componentWillUnmount() {
    //     if(this.listener){
    //         this.listener.remove();
    //     }
    // }
    //
    // changeSkin(skinInfo){
    //     alert(skinInfo.skinName)
    //     this.state={
    //         skin:skinInfo.skinName,
    //     }
    // }

    // //更新通知
    // onThemeChange(theme){
    //     if(!theme)return;
    //     this.setState({
    //         theme:theme
    //     })
    // }

}

AppRegistry.registerComponent('BaseComponent', () => BaseComponent);