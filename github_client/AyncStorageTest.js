
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
import Toast,{DURATION} from 'react-native-easy-toast'
const KEY ='test';

export default class AyncStorageTest extends Component {

    saveData(){

        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if(!error){

                this.toast.show('保存成功',DURATION.LENGTH_LONG)
            }else {

                this.toast.show('保存失败',DURATION.LENGTH_LONG)
            }
        })
    }

    removeData(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){

                this.toast.show('移除成功',DURATION.LENGTH_LONG)
            }else {

                this.toast.show('移除失败',DURATION.LENGTH_LONG)
            }
        })
    }

    fetchData(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error){

                if (result!=='' && result!==null){
                    this.toast.show('取出的内容为:'+result)
                }else {
                    this.toast.show('取出的内容不存在')
                }


            }else {

                this.toast.show('提取失败',DURATION.LENGTH_LONG)
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'AsyncStorage的使用'}
                    style={{backgroundColor:'#2196F3'}}
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text=>this.text=text}
                ></TextInput>
                <View style={{flexDirection:'row'}}>

                        <Text style={styles.tips} onPress={()=>this.saveData()}>保存</Text>
                        <Text style={styles.tips} onPress={()=>this.removeData()}>移除</Text>
                        <Text style={styles.tips} onPress={()=>this.fetchData()}>取出</Text>
                </View>
                <Toast ref={toast=>this.toast=toast}/>


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