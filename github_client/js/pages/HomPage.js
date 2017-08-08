
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
import {DURATION} from 'react-native-easy-toast'
import FavoritePage from './FavoritePage'
import BaseComponent from './BaseComponent'

export const ACTION_HOME = {A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};

export var FLAG_TAB = {
    flag_popularTab: 'flag_popularTab',
    flag_trendingTab: 'flag_trendingTab',
    flag_favoriteTab: 'flag_favoriteTab',
    flag_myTab: 'flag_myTab'
}

export default class HomePage extends BaseComponent {

    constructor(props){
        super(props);
        let selectedTab = this.props.selectedTab?this.props.selectedTab:'tb_popular'

        this.state = {
            selectedTab:selectedTab,
            theme:this.props.theme
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // this.listener = DeviceEventEmitter.addListener('ACTION_HOME',(action,params)=>this.onAction(action,params));
        this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG);
        })

    }

    onAction(action,params){
        if (action === ACTION_HOME.A_RESTART){
            // this.onRestart(FLAG_TAB.flag_popularTab);
        }else if (action === ACTION_HOME.A_SHOW_TOAST ){
            this.toast.show(params.text,DURATION.LENGTH_LONG);
        }
    }

    onReStart(jumpToTap){
        this.props.navigator.navigator.resetTo({
            component:HomePage,
            params:{
                ...this.props,
                selectedTab:jumpToTap
            }
        })
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if(this.listener){
            this.listener.remove();
        }
    }

    onSelected(object) {
        // if (this.updateFavorite && 'popularTab' === object)this.updateFavorite(object);

        this.setState({
            selectedTab: object,
        })

    }

    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                renderIcon={() => <Image style={styles.tabItemImageStyle}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image
                    style={[styles.tabItemImageStyle,this.state.theme.styles.tabBarSelectedIcon]}
                    source={renderIcon}/>}
                    onPress={() => this.onSelected(selectedTab)}>

                <Navigator.Navigator
                    initialRoute={{name:{selectedTab},component:Component}}
                    configureScene={()=>{
                        return Navigator.Navigator.SceneConfigs.PushFromRight;
                    }}

                    renderScene={(route,navigator)=>{
                        let Component = route.component;
                        return <Component {...route.params} theme={this.state.theme} navigator={navigator} homeComponent={this}/>;
                    }}/>
            </TabNavigator.Item>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}
                >
                    {this._renderTab(PopularPage, 'tb_popular', 'Popular', require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, 'tb_trending', 'Trending', require('../../res/images/ic_trending.png'))}
                    {this._renderTab(FavoritePage, 'tb_favorite', 'Favorite', require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MinePage, 'tb_my', 'My', require('../../res/images/ic_my.png'))}
                </TabNavigator>
            </View>
        )
    }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <TabNavigator>
    //                 {/*{this.renderTabBarItem(PopularPage,'tb_popular',"最热",require('../../res/images/ic_polular.png'))};*/}
    //                 <TabNavigator.Item
    //                     selected={this.state.selectedTab === 'tb_popular'}
    //                     selectedTitleStyle={{color:'#2196F3'}}
    //                     title="最热"
    //                     renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_polular.png')} />}
    //                     renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
    //                     onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
    //
    //                     <Navigator.Navigator
    //                         initialRoute={{name:'tb_popular',component:PopularPage}}
    //                         configureScene={()=>{
    //                             return Navigator.Navigator.SceneConfigs.PushFromRight;
    //                         }}
    //
    //                         renderScene={(route,navigator)=>{
    //                             let Component = route.component;
    //                             return <Component {...route.params} navigator={navigator}/>;
    //                         }}
    //                     />
    //                 </TabNavigator.Item>
    //
    //                 <TabNavigator.Item
    //                     selected={this.state.selectedTab === 'tb_trending'}
    //                     selectedTitleStyle={{color:'#2196F3'}}
    //                     title="趋势"
    //                     renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
    //                     renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_trending.png')} />}
    //                     onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
    //
    //                     <Navigator.Navigator
    //                         initialRoute={{name:'tb_trending',component:TrendingPage}}
    //                         configureScene={()=>{
    //                             return Navigator.Navigator.SceneConfigs.PushFromRight;
    //                         }}
    //
    //                         renderScene={(route,navigator)=>{
    //                             let Component = route.component;
    //                             return<Component {...route.params} navigator={navigator}/>;
    //                         }}
    //                     />
    //                 </TabNavigator.Item>
    //
    //                 <TabNavigator.Item
    //                     selected={this.state.selectedTab === 'tb_favorite'}
    //                     selectedTitleStyle={{color:'#2196F3'}}
    //                     title="收藏"
    //                     renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_favorite.png')} />}
    //                     renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_favorite.png')} />}
    //                     onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
    //
    //                     <Navigator.Navigator
    //                         initialRoute={{name:'tb_favorite',component:FavoritePage}}
    //                         configureScene={()=>{
    //                             return Navigator.Navigator.SceneConfigs.PushFromRight;
    //                         }}
    //
    //                         renderScene={(route,navigator)=>{
    //                             let Component = route.component;
    //                             return<Component {...route.params} navigator={navigator}/>;
    //                         }}
    //                     />
    //                 </TabNavigator.Item>
    //
    //                 <TabNavigator.Item
    //                     selected={this.state.selectedTab === 'tb_my'}
    //                     selectedTitleStyle={{color:'#2196F3'}}
    //                     title="我的"
    //                     renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_my.png')} />}
    //                     renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'#2196F3'}]}  source={require('../../res/images/ic_my.png')} />}
    //                     onPress={() => this.setState({ selectedTab: 'tb_my' })}>
    //
    //                     <Navigator.Navigator
    //                         initialRoute={{name:'tb_my',component:MinePage}}
    //                         configureScene={()=>{
    //                             return Navigator.Navigator.SceneConfigs.PushFromRight;
    //                         }}
    //
    //                         renderScene={(route,navigator)=>{
    //                             let Component = route.component;
    //                             return<Component {...route.params} navigator={navigator}/>;
    //                         }}
    //                     />
    //                 </TabNavigator.Item>
    //             </TabNavigator>
    //             <Toast ref={toast=>this.toast=toast}/>
    //         </View>
    //     );
    // }
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