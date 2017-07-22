import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigationBar from './js/common/NavigationBar'
import HttpUtls from './HttpUtls'

export default class FetchTest extends Component{

    constructor(props){
        super(props);
        this.state = {
            result:''
        }
    }

    getRequest(url){
        //http://rap.taobao.org/mockjsdata/11793/test
        HttpUtls.get(url)
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

    postRequest(url,data){
        HttpUtls.post(url,data)
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

    clearResult() {
        this.setState({
            result:''
        })
    }


    render(){
        return(

            <View style={styles.container}>

                <NavigationBar
                    title='Fetch Test'
                    statusBar={{
                        backgroundColor:'gray'
                    }}
                />
                <Text
                    onPress={()=>this.getRequest('http://rapapi.org/mockjs/22968/rn/frinds')}
                >发送GET请求</Text>
                <Text
                    onPress={()=>this.postRequest('http://rapapi.org/mockjs/22968/rn/login',
                    {user_name:'jack',password:'123'})}
                >发送POST请求</Text>
                <Text>返回结果：{this.state.result}</Text>
                <Text
                    onPress={()=>this.clearResult()}
                >清空结果</Text>
            </View>


        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
    },

    text:{
        fontSize:22
    }
})