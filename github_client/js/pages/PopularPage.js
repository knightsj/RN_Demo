
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';


import DataRepository,{FlAG_STORAGE} from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'
import DetailPage from './RepositoryDetailPage'
import ProjectModel from '../model/ProjectModel'
import ScrollableTableView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCell from '../common/RespositoryCell'
import FavoriteDao from '../expand/dao/FavoriteDao'
import LanguageDao ,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import Utils from '../Util/FavoriteUtils'
import TimeUtil from '../Util/TimeUtil'
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

var favoriteDao = new FavoriteDao(FlAG_STORAGE.flag_popular)


export default class PopularPage extends Component {

    constructor(props){
        super(props);

        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state ={
            languages:[]
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result
                })
            })
            .catch(error=>{
                console.log(error);
            });
    }


    render() {
        let content = this.state.languages.length>0?
            <ScrollableTableView
            tabBarBackgroundColor="#2196F3"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
                {this.state.languages.map((result,i,arr)=>{
                    let item = arr[i];
                return item.checked? <PopularTabPage key={i} tabLabel={item.name} {...this.props} />:null;
                })}
            </ScrollableTableView>:null;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor:'#2196F3'}}
                    statusBar={{backgroundColor:'red'}}
                />
                {content}
            </View>
        );
    }
}


class PopularTabPage extends Component{

    constructor(props){
        super(props);
        this.isFavoriteChanged = false;
        this.dataRepository1 = new DataRepository(FlAG_STORAGE.flag_popular);
        this.state={

            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
            isLoading:false,
            favoriteKeys:[],
            projectModelsArr:[]
        }
    }

    componentDidMount() {
        this.loadData();

        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular',()=> {
            this.isFavoriteChanged = true;
        })
    }

    componentWillReceiveProps(){

        if(this.isFavoriteChanged){
            this.getFavoriteKeys1();
            this.isFavoriteChanged = false
        }
    }

    componentWillUnmount() {
        if(this.listener){
            this.listener.remove();
        }
    }



    renderRow(projectModel){
        return <RespositoryCell
            key = {projectModel.item.id}
            projectModel={projectModel}
            onSelect = {()=>this.onSelectRepository(projectModel)}
            onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}/>
     }

     //收藏按钮的回调函数
    onFavorite(item,isFavorite){
        //写进数据库，使用string
        if(isFavorite){
            favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item));
        }else {
            favoriteDao.removeFavoriteItem(item.id.toString());
        }

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

    render(){
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                       refreshing={this.state.isLoading}
                       onRefresh={()=>this.loadData()}
                       colors={['#2196F3']}
                       tintColor={['#2196F3']}
                       titleColor={['#2196F3']}
                       title={'Loading'}
                    />}
            />
        </View>
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
        })
    }

    getDataSource(projectModels) {
        return this.state.dataSource.cloneWithRows(projectModels);
    }



    getFavoriteKeys1(){
        favoriteDao.getFavoriteKeys()
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

    updateState(dict){
        if(!this)return;
        this.setState(dict)
    }

    loadData(){
        this.setState({
            isLoading:true
        })
        let url = URL + this.props.tabLabel + QUERY_STR;

        this.dataRepository1.fetchRespository(url)

            .then((result)=>{
                this.items = result&&result.items?result.items:result?result:[];
                this.getFavoriteKeys1();
                if(result && result.update_date && !TimeUtil.checkDate(result.update_date)) {
                    return this.dataRepository1.fetchNetRepository(url);
                }
            })

            .then( (items) => {
                if(!items || items.length === 0)return;
                this.items = items;
                this.getFavoriteKeys1();

            })

            .catch(error=>{
                console.log(error);
                this.updateState({
                    isLoading:false
                })
            })
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tips:{
        color:'black'
    }
});