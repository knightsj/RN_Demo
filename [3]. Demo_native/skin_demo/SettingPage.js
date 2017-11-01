import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    NativeModules,
    TouchableWithoutFeedback,
} from 'react-native';

import NavigationBar from './NavigationBar'
import BaseComponent from './BaseComponent'
import SkinSettingPage from './skin'
import ViewUtil from './ViewUtil'

var SkinModule = NativeModules.SkinModule;

export default class SettingPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            colorPrimary: props.colorPrimary,
        };
    }

    componentWillMount() {
        this.updateSkin("");
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentWillMount();
    }

    componentWillUnmount() {
        this.finishTimer && clearTimeout(this.finishTimer);
    }

    updateSkin(skinInfo){

        var colorList=new Array();
        colorList.push("color_1");
        colorList.push("color_2");

        var imageList=new Array();
        imageList.push("title_before");
        imageList.push("title_after");

        //同时批量转换颜色和图片
        SkinModule.getColorImageList(colorList,imageList,(result) =>this.setState(result))

        // this.setState({
        //     skin:skinInfo.skinName,
        // })

    }

    onBackPress() {
        // BackHandler.exitApp();
        this.props.navigator.pop();
        // RNBridgeManager.showTabBar((err, data)=>{
        //
        // });
    }


    goToSkinSetting(){
        let TargetComponent = SkinSettingPage;
        let params = {...this.props}

        if(TargetComponent){
            this.props.navigator.push({
                component:TargetComponent,
                params:params
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'设置'}
                    style={{backgroundColor:this.state.color_2}}
                    statusBar={{backgroundColor:this.state.color_2}}
                    leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}
                />
                <TouchableWithoutFeedback onPress={()=> {
                    this.goToSkinSetting();
                }}>
                    <View>
                        <Text>皮肤设置页面</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3',
    },

});