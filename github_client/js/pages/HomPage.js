
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Image
} from 'react-native';


import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'

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
                        selectedTitleStyle={{color:'red'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_profile'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'yellow'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_profile' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'blue'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'blue'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'green'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.tabItemImageStyle} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.tabItemImageStyle,{tintColor:'green'}]}  source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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