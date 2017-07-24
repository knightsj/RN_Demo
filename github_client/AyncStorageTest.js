
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import NavigationBar from './js/common/NavigationBar'
const KEY ='test'

export default class AyncStorageTest extends Component {

    saveData(){
        AsyncStorage.setItem('KEY',this.text,(error)=>{
            if(!error){
                
            }
        })
    }

    removeData(){

    }

    fetchData(){

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'AsyncStorage的使用'}
                    style={{backgroundColor:'#2196F3'}}
                />
                <TextInput style={styles.inputStyle}></TextInput>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                        <Text style={styles.tips} onPress={()=>this.saveData()}>保存</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.tips} onPress={()=>this.removeData()}>移除</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.tips} onPress={()=>this.fetchData()}>取出</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}


class PopularTabPage extends Component{
    constructor(props){
        super(props);
        this.state={


        }
    }

    componentDidMount() {

    }

    render(){
        return <View style={{flex:1}}>

        </View>
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    inputStyle:{
        padding:10,
        margin:6,
        height:40,
        borderColor:'black',
        borderWidth:1,
    },
    tips:{
        color:'black',
        marginRight:10
    }
});