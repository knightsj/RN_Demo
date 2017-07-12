import React, { Component } from 'react';  
import {  
    AppRegistry,  
    StyleSheet,  
    Text,  
    View,  
    ListView,  
    Image,  
    TouchableOpacity, // 不透明触摸  
    AlertIOS  
} from 'react-native';  
  
// 获取屏幕宽度  
var Dimensions = require('Dimensions');  
const screenW = Dimensions.get('window').width;  
  
// 导入json数据  
var shareData = require('./shareData.json');  
  
// 一些常亮设置  
const cols = 3;  
const cellWH = 100;  
const vMargin = (screenW - cellWH * cols) / (cols + 1);  
const hMargin = 25;  
  
// ES5  
var ListViewDemo = React.createClass({  
    // 初始化状态值(可以变化)  
    getInitialState(){  
        // 创建数据源  
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});  
       return{  
           dataSource:ds.cloneWithRows(shareData.data)  
       }  
    },  
  
    render(){  
        return(  
            <ListView  
                dataSource={this.state.dataSource}  
                renderRow={this.renderRow}  
                contentContainerStyle={styles.listViewStyle}  
            />  
        );  
    },  
  
    // 返回cell  
    renderRow(rowData,rowID){  
        return(  
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{AlertIOS.alert('点击了')}} >  
                <View style={styles.innerViewStyle}>  
                    <Image source={{uri:rowData.icon}} style={styles.iconStyle} />  
                    <Text>{rowData.title}</Text>  
                </View>  
            </TouchableOpacity>  
        );  
    },  
});  
  
const styles = StyleSheet.create({  
    listViewStyle:{  
        // 主轴方向  
        flexDirection:'row',  
        // 一行显示不下,换一行  
        flexWrap:'wrap',  
        // 侧轴方向  
        alignItems:'center', // 必须设置,否则换行不起作用  
    },  
  
    innerViewStyle:{  
        width:cellWH,  
        height:cellWH,  
        marginLeft:vMargin,  
        marginTop:hMargin,  
        // 文字内容居中对齐  
        alignItems:'center'  
    },  
  
    iconStyle:{  
        width:80,  
        height:80,  
    },  
  
});  
  
AppRegistry.registerComponent('component_demo', () => ListViewDemo); 
