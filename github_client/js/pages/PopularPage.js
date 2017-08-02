
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


import DataRepository,{Flag_STORAGE} from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'
import DetailPage from './RepositoryDetailPage'
import ProjectModel from '../model/ProjectModel'
import ScrollableTableView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCell from '../common/RespositoryCell'
import FavoriteDao from '../expand/dao/FavoriteDao'
import LanguageDao ,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import Utils from '../Util/FavoriteUtils'
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'
var favoriteDao = new FavoriteDao(Flag_STORAGE.flag_popular)



export default class PopularPage extends Component {

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state ={
            languages:[]
        }
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

    componentDidMount() {
        this.loadData();
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
        this.dataRepository = new DataRepository(Flag_STORAGE.flag_popular);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
            isLoading:false,
            favoriteKeys:[]
        }
    }

    componentDidMount() {
        this.loadData();
    }

    onSelectRepository(projectModel){
        alert(projectModel.isFavorite);
        this.props.navigator.push({
             title:projectModel.item.full_name,
             component:DetailPage,
             params:{
                 projectModel:projectModel,
                 ...this.props
             }
        })
    }

    renderRow(projectModel){
        return <RespositoryCell
            onSelect = {()=>this.onSelectRepository(projectModel)}
            key = {projectModel.item.id}
            projectModel={projectModel}
            onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}/>
     }

    onFavorite(item,isFavorite){
        if(isFavorite){
            alert(isFavorite)
            favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item));
        }else {
            alert(isFavorite)
            favoriteDao.removeFavoriteItem(item.id.toString());
        }
        //替换当前的数组呀


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

    //跟新project item的 favorite状态
    flushFavoriteState(){
        let projectModels = [];
        let items = this.items;
        for (var i=0,len=items.length;i<len;i++){
            projectModels.push(new ProjectModel(items[i],Utils.checkFavoriteItemExistance(items[i],this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading:false,
            dataSource:this.getDataSource(projectModels)
        })
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    getFavoriteKeys(){
        favoriteDao.getFavoriteKeys()
            .then(keys=>{
                if (keys){
                    this.updateState({favoriteKeys:keys})
                }
                this.flushFavoriteState();
            })
            .catch(e=>{
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

        this.dataRepository.fetchRespository(url)

            .then((wrapData)=>{
                this.items = wrapData&&wrapData.items?wrapData.items:wrapData?wrapData:[];
                this.getFavoriteKeys();
                if(result && result.update_date && this.dataRepository.checkData(result.update_date)) {
                    return this.dataRepository.fetchNetRepository(url);
                }
            })

            .then(items => {
                if(!items || items.length===0)return;
                this.items = items;
                this.getFavoriteKeys();

            })

            .catch(error=>{
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