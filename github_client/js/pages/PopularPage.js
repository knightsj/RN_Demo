
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView,
    RefreshControl
} from 'react-native';


import DataRepository from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'

import ScrollableTableView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RespositoryCell from '../common/RespositoryCell'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

export default class HomePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor:'#2196F3'}}
                />
                <ScrollableTableView
                    tabBarBackgroundColor="#2196F3"
                    tabBarInactiveTextColor="mintcream"
                    tabBarActiveTextColor="white"
                    tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                    renderTabBar={()=><ScrollableTabBar/>}

                >
                    <PopularTabPage tabLabel="Java">Java</PopularTabPage>
                    <PopularTabPage tabLabel="iOS">iOS</PopularTabPage>
                    <PopularTabPage tabLabel="Android">iOS</PopularTabPage>
                    <PopularTabPage tabLabel="JavaScript">JavaScript</PopularTabPage>
                    <PopularTabPage tabLabel="Golang">Go</PopularTabPage>
                </ScrollableTableView>
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

    renderRow(data){
        return <RespositoryCell data={data}/>
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
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
                })
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