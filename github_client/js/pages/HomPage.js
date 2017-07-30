
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import TempPage from '../../temp'
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './MyPage/MyPage'
import Navigator from 'react-native-deprecated-custom-components';
import Toast, {DURATION} from 'react-native-easy-toast'

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
                                return Navigator.Navigator.SceneConfigs.PushFromRight;
                            }}

                            renderScene={(route,navigator)=>{
                                let Component = route.component;
                                return <Component {...route.params} navigator={navigator}/>;
                            }}
                        />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_profile'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'yellow'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_proile' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_profile',component:AyncStoryageTest}}
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
                        selectedTitleStyle={{color:'blue'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'blue'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_favorite',component:TempPage}}
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
                        selectedTitleStyle={{color:'green'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'green'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>

                        <Navigator.Navigator
                            initialRoute={{name:'tb_my',component:MyPage}}
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