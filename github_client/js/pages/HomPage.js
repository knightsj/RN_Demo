
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MinePage from './MinePage'

import Navigator from 'react-native-deprecated-custom-components';
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoritePage from './FavoritePage'

import AyncStoryageTest from '../../AyncStorageTest'

export default class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'tb_popular',
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG);
        })
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove();
    }

    renderTabBarItem(Component,tabName,title,icon){
        return <TabNavigator.Item
            selected={this.state.selectedTab === tabName}
            selectedTitleStyle={{color:'#2196F3'}}
            title={title}
            renderIcon={() => <Image style={styles.tabItemImageStyle} source={icon} />}
            renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]} source={icon} />}
            onPress={() => this.setState({ selectedTab: tabName })}>

            <Navigator.Navigator
                initialRoute={{name:tabName,component:Component}}
                configureScene={()=>{
                    return Navigator.Navigator.SceneConfigs.PushFromRight;
                }}

                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>;
                }}
            />
        </TabNavigator.Item>;

    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {/*{this.renderTabBarItem(PopularPage,'tb_popular',"最热",require('../../res/images/ic_polular.png'))};*/}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_popular',component:PopularPage}}
                            configureScene={()=>{
                                return Navigator.Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return <Component {...route.params} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_trending',component:TrendingPage}}
                            configureScene={()=>{
                                return Navigator.Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.params} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_favorite.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_favorite.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_favorite',component:FavoritePage}}
                            configureScene={()=>{
                                return Navigator.Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.params} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_my.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_my.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_my',component:MinePage}}
                            configureScene={()=>{
                                return Navigator.Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.params} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    page1:{
        flex:1,
        backgroundColor:'red',
    },

    page2:{
        flex:1,
        backgroundColor:'yellow',
    },

    tabItemImageStyle:{
        width:22,
        height:22
    }
});