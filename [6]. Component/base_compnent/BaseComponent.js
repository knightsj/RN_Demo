import React, {Component} from 'react';
import {
    BackHandler,
    Dimensions,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter
} from 'react-native';

const window = Dimensions.get('window');

var RNBridgeManager = NativeModules.IWWRNBridgeManager;
var skinModule = new NativeEventEmitter(RNBridgeManager)

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount(){
        //注册通知；收到通知后：调用setState方法，触发子组件的setState
        this.listener = skinModule.addListener("RNChangeThemeEvent",(skin) => this.updateSkin(skin))
        // SkinModule.currentSkin((skin)=>{this.updateSkin(skin)})
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
        if (this.nativeChangeThemListener)
            this.nativeChangeThemListener.remove();

        if(this.listener){
            this.listener.remove();
        }
    }

    //返回 ;//return  true 表示返回上一页  false  表示跳出RN
    //返回 ;//return  true 表示返回上一页  false  表示跳出RN
    onBackClicked = () => { // 默认 表示跳出RN
        return false;
    }

    /*
     //复制此方法到 继承该组件的地方即可
     //BACK物理按键监听
     onBackClicked = () => {
     const {navigator} = this.props;
     if (navigator && navigator.getCurrentRoutes().length > 1) {
     navigator.pop();
     return true;//true 表示返回上一页
     }
     return false; // 默认false  表示跳出RN
     }
     */
}