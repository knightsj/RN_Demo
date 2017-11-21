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
    NativeEventEmitter,
    Image


} from 'react-native';

import NavigationBar from './NavigationBar'
import ViewUtil from './ViewUtil'
import BaseComponent ,{SkinModule} from './BaseComponent'
const event = new NativeEventEmitter(SkinModule);

export default class homePage extends BaseComponent {

    constructor(props){
        super(props);
        this.state={
            color_1:"red",
            color_2:"red",
            title_before:"default",
            title_after:"default",
        }
    }

    //RN触发原生更换皮肤
    changeIntoSkin(skin){


        SkinModule.currentSkin((currentSkin)=>{
            if (skin === currentSkin){
                return;
            }
        })

        SkinModule.containsSkin(skin,(result)=>{

            if (result === "1"){
                //如果该皮肤已经下载，则直接触发切换操作
                SkinModule.changeSkin(skin,(code)=>{
                    if (code === "1"){
                        // alert("切换成功");
                    }else {
                        // alert("切换失败");
                    }
                });
            }else {
                //如果该皮肤没有下载，则提示用户下载
                alert("没有当前皮肤！请下载");
            }
        })
    }

    componentWillMount() {
        this.updateSkin("");
        super.componentWillMount();

        this.lisener = event.addListener('new',
            (skininfo) => {
                this.show(skininfo)
            })
    }

    show(){
        alert('首页收到消息')
        this.updateSkin();
    }

    onBackPress() {
        this.props.navigator.pop();
    }

    downloadSkin(skinName,url){
        let info = {"beginData":"20170101"};
        SkinModule.downloadSkin(skinName,url,info,(error,result) =>{
            if (error){
                alert(result);
            }else {
                alert(result);
            }
        });
    }



    componentWillUnmount() {
        this.lisener && this.listener.remove();  //记得remove哦
        this.lisener = null;
    }

    updateSkin(skinInfo){

        // ========== 转换颜色 ========
        // 单个转换
        // SkinModule.getColor("bgColor","color_1",(result) =>this.setState(result));
        // SkinModule.getColor("navColor","color_2",(result) =>this.setState(result));

        //批量转换:数组
        // SkinModule.getColors(["bgColor","navColor"],["color_1","color_2"],(result) =>this.setState(result));

        //批量转换:字典
        // SkinModule.getColorsWithDict({"bgColor":"color_1","navColor":"color_2"},(result) =>this.setState(result));

        // ========== 转换颜色 ======== //
        // 单个转换
        // SkinModule.getImage("image_1","title_before",(result)=>this.setState(result));
        // SkinModule.getImage("image_2","title_after",(result)=>this.setState(result));

        //批量转换:数组
        // SkinModule.getImages(["image_1","image_2"],["title_before","title_after"],(result) =>this.setState(result));


        //批量转换:字典
        // SkinModule.getImagesDict({"image_1":"title_before","image_2":"title_after"},(result) =>this.setState(result));


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


    render() {
        return (
            <View style={styles.container}>

                <NavigationBar
                    title={'首页'}
                    style={{backgroundColor:this.state.color_2}}
                    statusBar={{backgroundColor:this.state.color_2}}
                    leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}
                />

                <View style={[{flex: 1},{backgroundColor: this.state.color_1}]}>

                    <TouchableOpacity onPress={()=>this.downloadSkin('purple','http://oih3a9o4n.bkt.clouddn.com/purple.zip')}>
                        <Text style={styles.instructions}>
                            download purple skin!!!!!
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.changeIntoSkin('blue')}>
                        <Text style={styles.instructions}>
                            Click to change into blue skin!
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.changeIntoSkin('purple')}>
                        <Text style={styles.instructions}>
                            Click to change into purple skin!
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.instructions}>
                        Current skin: {this.state.skin}
                    </Text>


                    <View style={styles.imageBgView}>
                        <Text style={styles.instructions}>
                            图片1：
                        </Text>
                        <Image style={styles.imageStyle} source={{uri: this.state.title_before}}></Image>
                        <Text style={styles.instructions}>
                            图片2：
                        </Text>
                        <Image style={styles.imageStyle} source={{uri: this.state.title_after}}></Image>
                        {/*<Image style={styles.imageStyle} source={{uri: 'blue_title_before'}}></Image>*/}
                        {/*<Image style={styles.imageStyle} source={{uri: 'blue_title_after'}}></Image>*/}
                        {/*<Image style={styles.imageStyle} source={{uri: '~/Documents/skin/red/red/red_title_before'}}></Image>*/}
                    </View>

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

    imageBgView:{
        justifyContent:'center',
        alignItems:'center',
    },

    imageStyle:{
        marginTop:20,
        width:20,
        height:30,

    }
});

