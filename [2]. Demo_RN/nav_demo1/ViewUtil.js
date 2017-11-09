
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

export var FlAG_SETTINGITEMTYPE= {flag_top:'top',flag_middle:'middle',flag_bottom:'bottom',flag_single:'single'};

export default class ViewUtils{

    //
    static getNavBackButton(callBack){
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}>
            <Image
                style={{width:12,height:16,tintColor:'white'}}
                source={{uri:'nav_back'}}
            />

        </TouchableOpacity>
    }


    //用于for循环生成的cellItem
    static createSettingItemWithIndex(index,settingItemType,callBack,icon,title,detailText,tintColor, arrowIcon,expandableIcon){

        let topLineView = null;
        let bottomLineView = null;
        let topStyle = null;

        if (settingItemType === FlAG_SETTINGITEMTYPE.flag_top || settingItemType === FlAG_SETTINGITEMTYPE.flag_single){

            topStyle = {marginTop:10}

        }else{

            topStyle = {marginTop:0}

        }

        if (settingItemType === FlAG_SETTINGITEMTYPE.flag_top || settingItemType ===FlAG_SETTINGITEMTYPE.flag_single){

            topLineView = <View style={styles.settingItemFullLineStyle}></View>
        }

        if (settingItemType === FlAG_SETTINGITEMTYPE.flag_bottom ||settingItemType === FlAG_SETTINGITEMTYPE.flag_single){

            bottomLineView = <View style={styles.settingItemFullLineStyle}></View>

        }else if (settingItemType === FlAG_SETTINGITEMTYPE.flag_top || settingItemType === FlAG_SETTINGITEMTYPE.flag_middle){

            bottomLineView = <View style={styles.settingItemMiddleLineStyle}></View>
        }



        let image = null;
        if (icon) {
            image = <Image
                source={{uri: icon}}
                resizeMode='stretch'
                style={[{width: 22, height: 22}]}
            />
        }

        let content = <View>
            {topLineView}
            <TouchableHighlight
                onPress={callBack}
                underlayColor= 'transparent'
            >

                <View style={styles.settingItemContainerStyle}>
                    {/*左侧*/}
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {image}
                        <Text style={styles.settingItemTitleStyle}>{title}</Text>
                    </View>
                    {/*右侧*/}
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.settingItemDetailTitleStyle}>{detailText}</Text>
                        <Image source={{uri:expandableIcon?expandableIcon:arrowIcon}}
                               style={[{marginRight:6,height:12,width:8}]}
                        />
                    </View>
                </View>

            </TouchableHighlight>
            {bottomLineView}

        </View>

        if(index > 0 || index == 0){

            return (
                <View style={[{backgroundColor:'white'},topStyle]} key = {index}>
                    {content}
                </View>
            )
        }else{

            return (
                <View style={[{backgroundColor:'white'},topStyle]}>
                    {content}
                </View>
            )

        }

    }

    static createSettingItem(settingItemType,callBack,icon,title,detailText,tintColor, arrowIcon,expandableIcon){

        return this.createSettingItemWithIndex(null,settingItemType,callBack,icon,title,detailText,tintColor, arrowIcon,expandableIcon )
    }

    static createMiddleContentItem(callBack,text){
        return (
            <View style={[{backgroundColor:'white'},{marginTop:10}]}>
                <View style={styles.settingItemFullLineStyle}></View>
                <TouchableHighlight
                    onPress={callBack}
                    underlayColor= 'transparent'>
                    <View style={styles.settingItemMiddleContainerStyle}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.settingMiddleTittleStyle}>{text}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.settingItemFullLineStyle}/>
            </View>
        )
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    settingItemContainerStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        height:44,
    },

    settingItemTitleStyle:{
        marginLeft:12,
        fontSize:16,
        fontFamily:'Helvetica',
        fontWeight:'100'
    },

    settingItemDetailTitleStyle:{
        marginRight:12,
        color:'gray',
        fontSize:15,
        fontFamily:'Helvetica',
        fontWeight:'100'
    },

    settingItemMiddleContainerStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        height:44,
    },

    settingMiddleTittleStyle:{
        fontSize:17,
        justifyContent: 'center',
        fontFamily:'Helvetica',
        fontWeight:'100'
    },

    settingItemFullLineStyle:{
        backgroundColor: '#D5D5D5',
        height: 0.8,
    },

    settingItemMiddleLineStyle:{
        backgroundColor: '#D5D5D5',
        height: 0.8,
        marginLeft:14,
        marginRight:14
    },

});