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
    Clipboard
} from 'react-native';



const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {

            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/u/3dd433cb3ea1',
            },
            JUEJIN: {
                title: '掘金',
                url: 'https://juejin.im/user/57f8ffda2e958a005581e3c0',
            },
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'https://knightsj.github.io/#blog',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/knightsj',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1037741530',
            },
            Email: {
                title: 'Email',
                account: 'ssjlife0111@163.com',
            },
        }
    },

    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },

};

import ViewUtils from '../Util/ViewUtils'
import {MORE_MENU} from '../common/MoreMenu'
import AboutComponent,{FLAG_ABOUT} from './AboutComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'
import WebViewPage from './WebViewPage'
import config from '../../res/data/Config.json'
import Toast ,{DURATION}from 'react-native-easy-toast'

export default class AboutPage extends Component{
    constructor(props) {
        super(props);
        this.aboutComponent = new AboutComponent(props,FLAG_ABOUT.flag_about_me,(dic=>this.updateState(dic)),config)
        this.state={
            projectModels:[],
            author:config.author,
            showRepository:false,
            showBlog:false,
            showQQ:false,
            showContact:false,

        }
    }

    componentDidMount() {
        this.aboutComponent.componentDidMount();
    }

    updateState(dic){
        this.setState(dic);
    }

    onClick(tab){

        let TargetComponent,params = {...this.props,menuType:tab}
        switch (tab){

            case FLAG.BLOG:
                this.updateState({showBlog:!this.state.showBlog})
                break;

            case FLAG.REPOSITORY:
                this.updateState({showRepository:!this.state.showRepository})
                break;

            case FLAG.QQ:
                this.updateState({showQQ:!this.state.showQQ})
                break;

            case FLAG.CONTACT:

                this.updateState({showContact:!this.state.showContact})
                break;

            case FLAG.CONTACT.items.QQ:
                Clipboard.setString(tab.account);
                this.toast.show('QQ:' + tab.account + '已复制到剪贴板');
                break;

            case FLAG.CONTACT.items.Email:

                var url = 'mailto:'+tab.account;
                Linking.canOpenURL(url).then(supported=>{
                    if (!supported){
                        console.log('Can not handle url:' + url);
                        alert('Can not handle url:' + url);
                    }else {
                        return Linking.openURL(url);
                    }
                })
                break;

            case FLAG.QQ.items.MD:
            case FLAG.QQ.items.RN:
                Clipboard.setString(tab.account);
                this.toast.show('群号:' + tab.account + '已复制到剪切板。');
                break;

            case FLAG.BLOG.items.GITHUB:
            case FLAG.BLOG.items.JIANSHU:
            case FLAG.BLOG.items.PERSONAL_BLOG:
            case FLAG.BLOG.items.JUEJIN:
                TargetComponent = WebViewPage;
                params.url = tab.url;
                params.title = tab.title;
                break;

        }

        if(TargetComponent){
            this.props.navigator.push({
                component:TargetComponent,
                params:params
            })
        }
    }

    //获取item右侧图标
    getClickIcon(isShow){
        return isShow?require('../../res/images/ic_tiaozhuan_up.png'):require('../../res/images/ic_tiaozhuan_down.png');
    }
    
    //显示列表数据
    renderItems(dict,isShowAccount){
        if (!dict)return null;
        let views = [];
        for(let i in dict){
            let title = isShowAccount? dict[i].title + ' : ' + dict[i].account:dict[i].title;
            views.push(
                <View key = {i}>
                    {ViewUtils.createSettingItem(()=>this.onClick(dict[i]),'',title,this.props.theme.styles.tabBarSelectedIcon)}
                    <View style={GlobalStyles.cellBottomLineStyle}></View>
                </View>
            )
        }
        return views;
    }

    render(){
        let contentView = <View>
            {ViewUtils.createSettingItem(()=>this.onClick(FLAG.BLOG),require('../../res/images/ic_computer.png'),FLAG.BLOG.name,this.props.theme.styles.tabBarSelectedIcon,this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyles.cellBottomLineStyle}></View>
            {this.state.showBlog?this.renderItems(FLAG.BLOG.items,false):null}

            {ViewUtils.createSettingItem(()=>this.onClick(FLAG.REPOSITORY),require('../../res/images/ic_code.png'),FLAG.REPOSITORY,this.props.theme.styles.tabBarSelectedIcon,this.getClickIcon(this.state.showRepository))}
            <View style={GlobalStyles.cellBottomLineStyle}></View>
            {this.state.showRepository?this.aboutComponent.renderRepository(this.state.projectModels):null}

            {ViewUtils.createSettingItem(()=>this.onClick(FLAG.QQ),require('../../res/images/ic_computer.png'),FLAG.QQ.name,this.props.theme.styles.tabBarSelectedIcon,this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyles.cellBottomLineStyle}></View>
            {this.state.showQQ?this.renderItems(FLAG.QQ.items,true):null}

            <View style={GlobalStyles.cellBottomLineStyle}></View>
            {ViewUtils.createSettingItem(()=>this.onClick(FLAG.CONTACT),require('../../res/images/ic_contacts.png'),FLAG.CONTACT.name,this.props.theme.styles.tabBarSelectedIcon,this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyles.cellBottomLineStyle}></View>
            {this.state.showContact?this.renderItems(FLAG.CONTACT.items,true):null}
        </View>

        return (
            <View style={styles.container}>
                {this.aboutComponent.render(contentView, this.state.author)}
                <Toast ref={e=>this.toast = e}/>
            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
