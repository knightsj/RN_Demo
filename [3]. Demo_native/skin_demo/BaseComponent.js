import React, {Component} from 'react';
import {
    BackHandler,
    Dimensions,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter
} from 'react-native';

const window = Dimensions.get('window');

var SkinModule = NativeModules.SkinModule;
var skinModule = new NativeEventEmitter(SkinModule)

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount(){
        this.listener = skinModule.addListener("RNChangeSkin",(skinName) => this.updateSkin(skinName))

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