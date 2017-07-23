
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    TextInput
} from 'react-native';


import TabNavigator from 'react-native-tab-navigator';
import DataRepository from '../expand/dao/DataRepository'


import NavigationBar from '../common/NavigationBar'


const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

export default class HomePage extends Component {

    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.state={
            result:''
        }
    }

    onLoad(){
        let url = this.getUrl(this.text)
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }

    getUrl(key){
        return URL + key + QUERY_STR;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor:'#6495ED'}}
                />
                <Text
                  onPress={()=>{
                      this.onLoad()
                  }}
                  style={styles.tips}
                >获取数据</Text>
                <TextInput
                   style={{height:20}}
                   onChangeText={text=>this.text=text}
                />
                <Text style={{height:300}}>{this.state.result}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tips:{
        color:'black'
    }
});