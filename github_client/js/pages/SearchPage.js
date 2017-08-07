
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TextInput,
    TouchableOpacity,
    ListView
} from 'react-native';

import ViewUtils from '../Util/ViewUtils'
import GlobalStyle from '../../res/styles/GlobalStyles'
import RespositoryCell from '../common/RespositoryCell'
import Toast,{DURATION} from 'react-native-easy-toast'
 import FavoriteDao  from '../expand/dao/FavoriteDao'
 import Utils from '../Util/FavoriteUtils'
 import {FlAG_STORAGE} from '../expand/dao/DataRepository'
 import DetailPage from './RepositoryDetailPage'
import ProjectModel from '../model/ProjectModel'
import ActionUtils from '../Util/ActionUtils'

const API_URL = 'https://api.github.com/search/repositories?q=' 
const QUERY_STR = '&sort=starts'

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.favoriteDao1 = new FavoriteDao(FlAG_STORAGE.flag_popular),
            this.favoriteKeys=[],
            this.state={
            isLoading:false,
            rightButtonText:'搜索',
                dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),

        }
    }

    componentDidMount() {

    }

    onRightButtonClick(){
        if (this.state.rightButtonText ==='搜索'){
            this.updateState({rightButtonText:'取消'})
            this.loadData();

        }else if (this.state.rightButtonText ==='取消'){
            this.updateState({
                rightButtonText:'搜索',
                isLoading:false
            })
        }else {

        }
    }

    onBackPress(){
        this.refs.input.blur();//隐藏键盘,失去焦点
        this.props.navigator.pop();
    }

    updateState(dict){
        if(!this)return;
        this.setState(dict)
    }

    renderNavigationBar(){
        let backButton = ViewUtils.getLeftButton(()=>this.onBackPress());
        let inputView = <TextInput
            ref = "input"
            style={styles.textInputStyle}
            onChangeText={text=>this.inputKey=text}
        >

        </TextInput>
        let rightButton = <TouchableOpacity
            onPress={()=>{
                this.refs.input.blur();//隐藏键盘,失去焦点
                this.onRightButtonClick();
            }}
        >
            <View style={{marginRight:10,marginLeft:10}}>
                <Text style={styles.navRightButtonTextStyle}>{this.state.rightButtonText}</Text>
            </View>

        </TouchableOpacity>
        return <View style={styles.navBarStyle}>
            {backButton}
            {inputView}
            {rightButton}
        </View>
    }

    getFetchUrl(key){ 
        return API_URL + key + QUERY_STR; 
    }

    getFavoriteKeys(){
        this.favoriteDao1.getFavoriteKeys()
            .then(keys=>{
                if (keys){
                    //更新当前保存的所有收藏项目的key的集合
                    this.updateState({favoriteKeys:keys});
                }
                this.flushFavoriteState();
            })
            .catch(e=>{
                console.log(e);
                this.flushFavoriteState();
            })
    }

    //更新里的items的收藏的状态并刷新列表
    flushFavoriteState(){
        let projectModels = [];
        let items = this.items;
        for (var i=0,len=items.length;i<len;i++){
            projectModels.push(new ProjectModel(items[i],Utils.checkFavorite(items[i],this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading:false,
            projectModelsArr:projectModels,
            dataSource:this.getDataSource(projectModels),
            rightButtonText:'搜索'
        })
    }

    getDataSource(projectModels) {
        return this.state.dataSource.cloneWithRows(projectModels);
    }

    loadData(){ 
        this.updateState({ 
            isLoading:true, 
        })  
        fetch(this.getFetchUrl(this.inputKey) )
            .then(response=>response.json())
            .then(responseData=>{ 
                if(!this||!responseData||!responseData.items||responseData.items.length===0){ 
                    this.toast.show(this.inputKey + '什么都没找到',DURATION.LENGTH_LONG); 
                    this.updateState({isLoading:false,rightButtonText:'搜搜'}) 
                } 
                this.items = responseData.items; 
                this.getFavoriteKeys(); 
            }) 
            .catch(e=>{ 
                this.updateState({ 
                    isLoading:false, 
                    rightButtonText:'搜索' 
                }) 
            }) 
    } 

    onSelectRepository(projectModel){
        this.props.navigator.push({
            title:projectModel.item.full_name,
            component:DetailPage,
            params:{
                projectModel:projectModel,
                flag:FlAG_STORAGE.flag_popular,
                ...this.props
            }
        })
    }

    renderRow(projectModel) {
        return <RespositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            onSelect={()=>this.onSelectRepository(projectModel)}
            onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(this.favoriteDao1, item, isFavorite)}/>
    }
    render(){

        let statusBar = null;
        if (Platform.OS === 'ios'){
            statusBar = <View style={styles.statusBarStyle}/>
        }

        let listView = <ListView
            dataSource = {this.state.dataSource}
            renderRow = {projectModel=>this.renderRow(projectModel)}
        />

        return <View style={styles.container}>
            {statusBar}
            {this.renderNavigationBar()}
            {listView}
            <Toast ref={toast=>this.toast=toast}/>
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'stretch'
    },

    statusBarStyle:{
       backgroundColor:'#2196F3',
        height:20
    },

    navBarStyle:{
        height:(Platform.OS === 'ios')?GlobalStyle.nav_bar_height_ios:GlobalStyle.nav_bar_height_android,
        backgroundColor:'#2196F3',
        alignItems:'center',
        flexDirection:'row'
    },

    textInputStyle:{
        flex:1,
        height:(Platform.OS === 'ios')?30:40,
        borderWidth:(Platform.OS === 'ios')?1:0,
        borderColor:'white',
        alignSelf:'center',
        paddingLeft:5,
        marginRight:10,
        marginLeft:5,
        borderRadius:4,
        opacity:0.7,
        color:'white'
    },

    navRightButtonTextStyle:{

        fontSize:17,
        fontWeight:'500',
        color:'white'
    }
});