
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


import DataRepository from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'
import DetailPage from './RepositoryDetailPage'

import ScrollableTableView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCell from '../common/RespositoryCell'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

import LanguageDao ,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

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
        this.dataRepository = new DataRepository();
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
            isLoading:false

        }
    }

    componentDidMount() {
        this.loadData();
    }

    onSelect(item){
        this.props.navigator.push({
             component:DetailPage,
             params:{
                 item:item,
                 ...this.props
             }
        })
    }



    renderRow(data){
        return <RespositoryCell
            onSelect = {()=>this.onSelect(data)}
            key = {data.id}
            data={data}
        />
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

    loadData(){
        this.setState({
            isLoading:true
        })
        let url = URL + this.props.tabLabel + QUERY_STR;

        this.dataRepository.fetchRespository(url)

            .then((wrapData)=>{
                let items = wrapData&&wrapData.items?wrapData.items:wrapData?wrapData:[];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    isLoading:false
                })

                if(result && result.update_date && this.dataRepository.checkData(result.update_date)){
                    // DeviceEventEmitter.emit('showToast','缓存数据过时');
                    return this.dataRepository.fetchNetRepository(url);
                }else {
                    DeviceEventEmitter.emit('showToast','显示缓存数据');
                }
            })

            .then(items => {
                if(!items || items.length===0)return;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    isLoading:false
                })
                DeviceEventEmitter.emit('showToast','显示网络数据');

            })

            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
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