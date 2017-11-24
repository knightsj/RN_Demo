import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TextInput,
    Platform,
    NativeModules,
    BackHandler,
    ListView,
    Image,
    TouchableWithoutFeedback,

} from 'react-native';

const RNBridgeManager = NativeModules.IWWRNBridgeManager;

import NavigationBar from '../../common/element/NavigationBar'
import WebViewPage from '../../common/element/WebViewPage'
import ViewUtil, {FlAG_SETTINGITEMTYPE} from '../../utils/ViewUtil'
import BaseComponent from "../../common/BaseComponent"
import Progress from "../../common/element/Progress"

const window = Dimensions.get('window');
const MyServiceModule = NativeModules.MyServiceModule;
// const SkinModule = NativeModules.SkinModule;
const {width, height} = Dimensions.get('window');

export default class MyServicePage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            colorPrimary: props.colorPrimary,
            navbar:"navbar",
            dataSource: [],
            searchBottomShow:true
        };
    }

    componentWillMount() {
        super.componentWillMount();
        this.updateSkin("");
    }

    componentDidMount() {

        this.progress1.show();

        RNBridgeManager.userToken((token)=>{
            this.userToken = token;
        })



        RNBridgeManager.myServiceHotIssue((err, data)=>{
            if(data){
                this.originalDataSource = data;
                this.setState({
                    dataSource:this.originalDataSource
                })
                this.progress1.finish();
            }
        });

    }



    updateSkin(params) {
        var imageList = new Array();
        imageList.push('navbar');
        RNBridgeManager.getImages(imageList,(result)=>{
            this.setState(result)
        })
    }

    onBackPress() {
        // BackHandler.exitApp();
        // RNBridgeManager.showTabBar((err, data)=>{
        //
        // });
        this.props.navigator.pop();
        RNBridgeManager.hideTabBarState("1",(err, data)=>{});
    }


    textChanged(text){

        if(text.length === 0){

            this.setState({
                searchBottomShow:true
            })
        }
        this.filterDataSourceWithInputText(text)
    }

    filterDataSourceWithInputText(text){
        var newDataSource = new Array();
        for(var index =0; index< this.originalDataSource.length;index++){
            let rowData = this.originalDataSource[index];
            let title = rowData.title;
            if(title.indexOf(text) >= 0 ){
                newDataSource.push(rowData);
            }
        }
        this.setState({
            dataSource:newDataSource
        })
    }

    showInputText(){
        this.setState({
            searchBottomShow:false
        })
    }



    lostFocus(){
        class MyServicePage extends BaseComponent {

            constructor(props) {
                super(props);
                this.state = {
                    colorPrimary: props.colorPrimary,
                    navbar:"navbar",
                    dataSource: [],
                    searchBottomShow:true
                };
            }

            componentWillMount() {
                super.componentWillMount();
                this.updateSkin("");
            }

            componentDidMount() {

                this.progress1.show();

                RNBridgeManager.userToken((token)=>{
                    this.userToken = token;
                })



                RNBridgeManager.myServiceHotIssue((err, data)=>{
                    if(data){
                        this.originalDataSource = data;
                        this.setState({
                            dataSource:this.originalDataSource
                        })
                        this.progress1.finish();
                    }
                });

            }



            updateSkin(params) {
                var imageList = new Array();
                imageList.push('navbar');
                RNBridgeManager.getImages(imageList,(result)=>{
                    this.setState(result)
                })
            }

            onBackPress() {
                // BackHandler.exitApp();
                // RNBridgeManager.showTabBar((err, data)=>{
                //
                // });
                this.props.navigator.pop();
                RNBridgeManager.hideTabBarState("1",(err, data)=>{});
            }


            textChanged(text){

                if(text.length === 0){

                    this.setState({
                        searchBottomShow:true
                    })
                }
                this.filterDataSourceWithInputText(text)
            }

            filterDataSourceWithInputText(text){
                var newDataSource = new Array();
                for(var index =0; index< this.originalDataSource.length;index++){
                    let rowData = this.originalDataSource[index];
                    let title = rowData.title;
                    if(title.indexOf(text) >= 0 ){
                        newDataSource.push(rowData);
                    }
                }
                this.setState({
                    dataSource:newDataSource
                })
            }

            showInputText(){
                this.setState({
                    searchBottomShow:false
                })
            }



            lostFocus(){
                this.setState({
                    searchBottomShow:true
                })
            }

            render() {


                var searchBar = null;

                if (this.state.searchBottomShow){
                    searchBar =
                        <TouchableWithoutFeedback onPress={()=>this.showInputText()}>
                            <View style={styles.inputBottomStyle}>
                                <Image
                                    source={{uri:'service_icon_search'}}
                                    style={{width:14,height:14,marginRight:4}}
                                />
                                <Text style={{color:'gray',fontSize:15}}>搜索</Text>

                            </View>
                        </TouchableWithoutFeedback>
                }else{

                    searchBar = <TextInput
                        ref="input"
                        style={styles.textInputStyle}
                        underlineColorAndroid='white'
                        autoFocus={true}
                        onChangeText={(text) => this.textChanged(text)}
                        onBlur={()=>this.lostFocus()}
                    >
                        <Image
                            source={{uri:"nav_back"}}
                            style={{width:20,height:20}}
                        />
                    </TextInput>
                }




                return (
                    <View style={styles.container}>
                        <NavigationBar
                            backgroundImageUri={this.state.navbar}
                            title={'我的客服'}
                            leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}
                        />
                        <ScrollView style={{marginTop: 10}}>
                            <View style={styles.searchBarBgView}>
                                {searchBar}
                                <View style={styles.settingItemFullLineStyle}></View>
                            </View>
                            <View style={{width:width,height:1,backgroundColor:'lightgray'}}></View>
                            <Text style={styles.groupTitleStyle}>热点问题</Text>
                            {this._renderRows(this.state.dataSource)}
                        </ScrollView>
                        <Progress
                            type = "original"
                            ref={(progress1)=>{this.progress1 = progress1}}
                        />

                    </View>
                );
            }

            _renderRows(dataSource){

                let count = dataSource.length;
                if(count == 0){
                    return null;
                }else {

                    var rows = new Array();

                    for (var index = 0; index < count; index++){

                        let rowData = dataSource[index];
                        let flag = null;
                        if (index == 0 ){
                            if (count == 1){
                                flag = FlAG_SETTINGITEMTYPE.flag_single;
                            }else {
                                flag = FlAG_SETTINGITEMTYPE.flag_top;
                            }

                        }else if (index == 1) {
                            if (count == 2) {
                                flag = FlAG_SETTINGITEMTYPE.flag_bottom;
                            } else {
                                flag = FlAG_SETTINGITEMTYPE.flag_middle;
                            }
                        }else if (index < count-1){
                            flag = FlAG_SETTINGITEMTYPE.flag_middle;
                        }else{
                            flag = FlAG_SETTINGITEMTYPE.flag_bottom;
                        }

                        var rowView = ViewUtil.createSettingItemWithIndex(index,flag, () => this.pressEvent(rowData),null, rowData.title, null,{backgroundColor: this.state.colorPrimary}, "my_icon_back", null)

                        rows.push(rowView);
                    }
                }
                return rows;
            }


            pressEvent(rowData) {

                let TargetComponent = WebViewPage;
                let params = {...this.props}
                params.title = rowData.title;
                params.url = rowData.url + '&token=' + this.userToken;

                this.props.navigator.push({
                    component: TargetComponent,
                    params: params
                })

            }

        }

    }

    render() {


        var searchBar = null;

        if (this.state.searchBottomShow){
            searchBar =
                <TouchableWithoutFeedback onPress={()=>this.showInputText()}>
                <View style={styles.inputBottomStyle}>
                <Image
                    source={{uri:'service_icon_search'}}
                    style={{width:14,height:14,marginRight:4}}
                />
                    <Text style={{color:'gray',fontSize:15}}>搜索</Text>

            </View>
        </TouchableWithoutFeedback>
        }else{

            searchBar = <TextInput
                ref="input"
                style={styles.textInputStyle}
                underlineColorAndroid='white'
                autoFocus={true}
                onChangeText={(text) => this.textChanged(text)}
            >
                <Image
                    source={{uri:"nav_back"}}
                    style={{width:20,height:20}}
                />
            </TextInput>
        }




        return (
            <View style={styles.container}>
                <NavigationBar
                    backgroundImageUri={this.state.navbar}
                    title={'我的客服'}
                    leftButton={ViewUtil.getLeftButton(() => this.onBackPress())}
                />
                <ScrollView style={{marginTop: 10}}>
                    <View style={styles.searchBarBgView}>
                        {searchBar}
                        <View style={styles.settingItemFullLineStyle}></View>
                    </View>
                    <View style={{width:width,height:1,backgroundColor:'lightgray'}}></View>
                    <Text style={styles.groupTitleStyle}>热点问题</Text>
                    {this._renderRows(this.state.dataSource)}
                </ScrollView>
                <Progress
                    type = "original"
                    ref={(progress1)=>{this.progress1 = progress1}}
                />

            </View>
        );
    }

    _renderRows(dataSource){

        let count = dataSource.length;
        if(count == 0){
            return null;
        }else {

            var rows = new Array();

            for (var index = 0; index < count; index++){

                let rowData = dataSource[index];
                let flag = null;
                if (index == 0 ){
                    if (count == 1){
                        flag = FlAG_SETTINGITEMTYPE.flag_single;
                    }else {
                        flag = FlAG_SETTINGITEMTYPE.flag_top;
                    }

                }else if (index == 1) {
                    if (count == 2) {
                        flag = FlAG_SETTINGITEMTYPE.flag_bottom;
                    } else {
                        flag = FlAG_SETTINGITEMTYPE.flag_middle;
                    }
                }else if (index < count-1){
                    flag = FlAG_SETTINGITEMTYPE.flag_middle;
                }else{
                    flag = FlAG_SETTINGITEMTYPE.flag_bottom;
                }

                var rowView = ViewUtil.createSettingItemWithIndex(index,flag, () => this.pressEvent(rowData),null, rowData.title, null,{backgroundColor: this.state.colorPrimary}, "my_icon_back", null)

                rows.push(rowView);
            }
        }
        return rows;
    }


    pressEvent(rowData) {

        let TargetComponent = WebViewPage;
        let params = {...this.props}
        params.title = rowData.title;
        params.url = rowData.url + '&token=' + this.userToken;

        this.props.navigator.push({
            component: TargetComponent,
            params: params
        })

    }

}

const styles = StyleSheet.create({
    listViewStyle: {
        /*flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5,*/
    },
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3',
    },

    searchBarBgView: {
        alignItems: 'center',
        height: 50,
        backgroundColor: '#E3E3E3',
    },

    groupTitleStyle: {
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 6,
        color: 'gray'
    },

    settingItemFullLineStyle: {
        backgroundColor: '#E3E3E3',
        height: 0.5,
        position: 'absolute',
        width: window.width,
        bottom: 0,
    },

    textInputStyle: {
        width: window.width - 40,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: 'white',
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingLeft: 5,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 4,
        opacity: 0.7,
    },

    inputBottomStyle:{
        flexDirection: 'row',
        backgroundColor: 'white',
        width: window.width - 40,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: 'white',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center',
    }

});

