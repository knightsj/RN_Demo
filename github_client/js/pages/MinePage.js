
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import {MORE_MENU} from '../common/MoreMenu'
import GlobalStyles from '../../res/styles/GlobalStyles'
import ViewUtil from '../Util/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import AboutPage from './AboutPage'

import CustomKeyPage from './CustomKeyPage'
import SortPage from './SortKeyPage'

export default class MinePage extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {

    }

    onClick(tab){

        let TargetComponent,params = {...this.props,menuType:tab}
        switch (tab){

            case MORE_MENU.Custom_Language:
                TargetComponent = CustomKeyPage;
                params.flag=FLAG_LANGUAGE.flag_language;
                break;

            case MORE_MENU.Custom_Key:
                TargetComponent = CustomKeyPage;
                params.flag=FLAG_LANGUAGE.flag_key;
                break;

            case MORE_MENU.Remove_Key:
                TargetComponent = CustomKeyPage;
                params.flag=FLAG_LANGUAGE.flag_key;
                params.isRemoveKeyPage = true;
                break;

            case MORE_MENU.Sort_Key:
                TargetComponent = SortPage;
                params.flag=FLAG_LANGUAGE.flag_key;
                break;

            case MORE_MENU.Sort_Language:
                TargetComponent = SortPage;
                params.flag=FLAG_LANGUAGE.flag_language;
                break;

            case MORE_MENU.Custom_Theme:

                break;

            case MORE_MENU.About_Author:

                break;

            case MORE_MENU.About:
                TargetComponent = AboutPage;
                break;

        }

        if(TargetComponent){
            this.props.navigator.push({
                component:TargetComponent,
                params:params
            })
        }
    }

    createSettingItem(tag,icon,text){
        return ViewUtil.createSettingItem(()=>this.onClick(tag),icon,text,{tintColor:'#2196F3'},null);
    }

    render(){
        return <View style={GlobalStyles.listViewContainerStyle}>
            <NavigationBar
                title={'我的'}
                style={{backgroundColor:'#2196F3'}}
            />
            <ScrollView>
                <TouchableHighlight
                    onPress={()=>this.onClick(MORE_MENU.About)}
                >
                    <View style={styles.item}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../res/images/ic_trending.png')}
                                   style={[{width:40,height:40,marginRight:10},{tintColor:'#2196F3'}]}
                            />
                            <Text>GitHub Popular</Text>
                        </View>
                        <Image source={require('../../res/images/ic_tiaozhuan.png')}
                            style={[{height:22,width:22},{tintColor:'#2196F3'}]}
                        />
                    </View>

                </TouchableHighlight>
                <View style={GlobalStyles.cellBottomLineStyle}></View>


                <Text style={styles.groupTitleStyle}>趋势管理</Text>
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Custom_Language,require('../../res/images/ic_custom_language.png'),'自定义语言')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Sort_Language,require('../../res/images/ic_swap_vert.png'),'语言排序')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>

                <Text style={styles.groupTitleStyle}>标签管理</Text>
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Custom_Key,require('../../res/images/ic_custom_language.png'),'自定义标签')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Sort_Key,require('../../res/images/ic_swap_vert.png'),'标签排序')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Remove_Key,require('../../res/images/ic_remove.png'),'标签移除')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>

                <Text style={styles.groupTitleStyle}>设置</Text>

                {/*自定义主题*/}
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {this.createSettingItem(MORE_MENU.Custom_Theme,require('../../res/images/ic_view_quilt.png'),'自定义主题')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>
                {/*关于作者*/}
                {this.createSettingItem(MORE_MENU.About_Author,require('../../res/images/ic_insert_emoticon.png'),'关于作者')}
                <View style={GlobalStyles.cellBottomLineStyle}></View>

            </ScrollView>
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        height:76,
        backgroundColor:'white'
    },

    groupTitleStyle:{
        marginLeft:10,
        marginTop:15,
        marginBottom:6,
        color:'gray'
    }
});