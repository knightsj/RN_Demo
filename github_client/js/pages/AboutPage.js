/**
 * AboutPage
 * 关于
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Linking,
    View,
    ListView,
    Dimensions,
    Text,
    Platform,
} from 'react-native';


import ViewUtils from '../Util/ViewUtils'
import {MORE_MENU} from '../common/MoreMenu'
import AboutComponent,{FLAG_ABOUT} from './AboutComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'
import WebViewPage from './WebViewPage'

export default class AboutPage extends Component{

    constructor(props) {
        super(props);
        this.aboutComponent = new AboutComponent(props,(dic=>this.updateState(dic)),FLAG_ABOUT.flag_about)
    }

    updateState(dic){
        this.setState(dic);
    }

    onClick(tab){
        let TargetComponent,params = {...this.props,menuType:tab}
        switch (tab){

            case MORE_MENU.About_Author:

                break;

            case MORE_MENU.Website:
                TargetComponent = WebViewPage;
                params.url = 'http://coding.imooc.com/class/89.html';
                params.title = '慕课网实战：GitHub客户端';

                break;

            case MORE_MENU.Feedback:
                var url = 'mailto://ssjlife0111@163.com';
                Linking.canOpenURL(url).then(supported=>{
                    if(!supported){
                        console.log('Can\'t handle url:' + url);
                    }else {
                        return Linking.openURL(url);
                    }
                }).catch(err=>console.error('An error occurred',err));
                break;

        }

        if(TargetComponent){
            this.props.navigator.push({
                component:TargetComponent,
                params:params
            })
        }
    }

    render(){
        let contentView = <View>
            {ViewUtils.createSettingItem(()=>this.onClick(MORE_MENU.Website),require('../../res/images/ic_computer.png'),MORE_MENU.Website,{tintColor:'#2196F3'})}
            <View style={GlobalStyles.cellBottomLineStyle}></View>

            {ViewUtils.createSettingItem(()=>this.onClick(MORE_MENU.About_Author),require('../../res/images/ic_insert_emoticon.png'),MORE_MENU.About_Author,{tintColor:'#2196F3'})}
            <View style={GlobalStyles.cellBottomLineStyle}></View>

            {ViewUtils.createSettingItem(()=>this.onClick(MORE_MENU.Feedback),require('../../res/images/ic_feedback.png'),MORE_MENU.Feedback,{tintColor:'#2196F3'})}
            <View style={GlobalStyles.cellBottomLineStyle}></View>
            <View style={GlobalStyles.cellBottomLineStyle}></View>
        </View>
        return this.aboutComponent.render(contentView,{
            'name':'J_Knight_',
            'description':'一个正在学React Native的iOS开发',
            'avatar':'http://upload.jianshu.io/users/upload_avatars/859001/9114777aca32?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
            'backgroundImage':'http://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg'
        });
    }
}