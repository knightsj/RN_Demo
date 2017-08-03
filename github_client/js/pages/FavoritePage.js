
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


import ProjectModel from '../model/ProjectModel'
import {FlAG_STORAGE} from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'
import DetailPage from './RepositoryDetailPage'
import ScrollableTableView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCell from '../common/RespositoryCell'
import TrendingCell from '../common/TrendingCell'
import FavoriteDao from '../expand/dao/FavoriteDao'
import ArrayUtils from '../Util/ArrayUtls'


export default class FavoritePage extends Component {

    constructor(props){
        super(props);
        this.state ={
        }
    }

    render() {

           let content = <ScrollableTableView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                renderTabBar={()=><ScrollableTabBar/>}
            >

                <FavoriteTabPage  {...this.props} tabLabel='最热' flag={FlAG_STORAGE.flag_popular}/>
                <FavoriteTabPage  {...this.props} tabLabel='趋势' flag={FlAG_STORAGE.flag_trending}/>

            </ScrollableTableView>;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'收藏'}
                    style={{backgroundColor:'#2196F3'}}
                />
                {content}
            </View>
        );
    }
}


class FavoriteTabPage extends Component{

    constructor(props){

        super(props);
        this.favoriteDao1 = new FavoriteDao(this.props.flag);
        this.unFavoriteItems = [];
        this.state={
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
            isLoading:false,
        }
    }

    componentDidMount() {

        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(false);
    }

    onSelectRepository(projectModel){
        this.props.navigator.push({
            title:projectModel.item.full_name,
            component:DetailPage,
            params:{
                projectModel:projectModel,
                ...this.props
            }
        })
    }

    loadData(shouldShowLoading){

        if(shouldShowLoading){
            this.setState({
                isLoading:true
            });
        }

        this.favoriteDao1.getAllItems().then((items)=> {

            var resultData = [];
            for (var i = 0, len = items.length; i < len; i++) {
                resultData.push(new ProjectModel(items[i], true));
            }
            this.setState({
                isLoading: false,
                dataSource: this.getDataSource(resultData),
            });
        }).catch((error)=> {
            this.setState({
                isLoading: false,
                // isLodingFail: true,
            });
        });

    }


    renderRow(projectModel){
        // alert(this.props.flag);
        let CellComponent=this.props.flag===FlAG_STORAGE.flag_popular? RespositoryCell:TrendingCell;
        return <CellComponent
            onSelect = {()=>this.onSelectRepository(projectModel)}
            key = {this.props.flag === FlAG_STORAGE.flag_popular?projectModel.item.id :projectModel.item.fullName}
            projectModel={projectModel}
            onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}/>
    }

    onFavorite(item,isFavorite){
        var key = this.props.flag === FlAG_STORAGE.flag_popular?item.id.toString():item.fullName;
        if(isFavorite){
            this.favoriteDao1.saveFavoriteItem(key,JSON.stringify(item));
        }else {
            this.favoriteDao1.removeFavoriteItem(key);
        }

        ArrayUtils.updateArray(this.unFavoriteItems,item);

        // this.loadData();
        if(this.unFavoriteItems.length>0){

            if(this.props.flag === FlAG_STORAGE.flag_popular){
                DeviceEventEmitter.emit('favoriteChanged_popular');
            }else if (this.props.flag === FlAG_STORAGE.trending){
                DeviceEventEmitter.emit('favoriteChanged_trending');
            }
        }

    }

    render(){
        return <View style={{flex:1}}>
            <ListView

                renderRow={(data)=>this.renderRow(data)}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
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


    getDataSource(projectModels) {
        return this.state.dataSource.cloneWithRows(projectModels);
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