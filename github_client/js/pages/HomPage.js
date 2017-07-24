
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator
} from 'react-native';


import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './MyPage/MyPage'
import CustomKeyPage from './MyPage/CustomKeyPage'

import AyncStoryageTest from '../../AyncStorageTest'

export default class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'tb_popular',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#6495ED'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#6495ED'}]} source={require('../../res/images/ic_polular.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_popular',component:PopularPage}}
                            configureScene={()=>{
                                return Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.passProps} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_profile'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'yellow'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_profile' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_profile',component:AyncStoryageTest}}
                            configureScene={()=>{
                                return Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.passProps} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'blue'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'blue'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_favorite',component:MyPage}}
                            configureScene={()=>{
                                return Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.passProps} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'green'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'green'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_my',component:MyPage}}
                            configureScene={()=>{
                                return Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return<Component {...route.passProps} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>
                </TabNavigator>
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