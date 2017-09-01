/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

var NewsDetail = require('./SJNewsDetail');


var Home = React.createClass({

    getDefaultProps(){
       return {
          url_api: "http://v.juhe.cn/toutiao/index?type=top&key=0c604536ac4f8c45fb4b90178bab9285",
       }
    },

    getInitialState(){

      return{
          //cell的数据源
          dataSource:new ListView.DataSource({
              rowHasChanged:(r1,r2)=>r1!=r2
          })
            
          
      }

    },

    render() {
        return (
         <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow}
         />
        );
    },

    //单独的一个cell
    renderRow(rowData){
       return(
           <TouchableOpacity activeOpacity={0.5} onPress={()=>this.pushToNewDetail(rowData)}>
               <View style={styles.cellStyle}> 
                  {/* 左侧 */}
                  <Image 
                      style={styles.iconImageStyle}
                      source={{uri:rowData.thumbnail_pic_s}}
                  />
                  {/* 右侧 */}
                  <View style={styles.rightViewStyle}>
                      <Text style={styles.titleStyle}>{rowData.title}</Text>
                       <Text style={styles.subTitleStyle}>{rowData.author_name}</Text>
                      <Text style={styles.infoStyle}>{rowData.date}</Text> 
                  </View>
               </View>              
           </TouchableOpacity>
       );
    },

    componentDidMount(){
        //请求网络数据
        this.loadDataFromNet();
    },

    loadDataFromNet(){

        fetch(this.props.url_api)

            .then((response)=>response.json())
            .then((responseData)=>{
               
                // 拿到模型数组               
                var jsonData = responseData['result']['data'];

                console.log(jsonData);
                // 处理网络数据
                this.dealWithData(jsonData);
            })
            .catch((error)=>{
                if(error){
                    // // 拿到所有的数据
                    // var jsonData = LocalData[this.props.key_word];
                    // // 特殊处理
                    // this.dealWithData(jsonData)
                }
            })

    },

    // 处理网络数据
    dealWithData(jsonData){

        // 定义临时变量
        listDataArr = [];

        // 遍历拿到的json数据
        for(var i=0; i<jsonData.length; i++){
            // 取出单独的对象
            var data = jsonData[i];
            // 判断
            listDataArr.push(data);
        }

        // 更新状态机
        this.setState({
            // cell的数据源
            dataSource: this.state.dataSource.cloneWithRows(listDataArr)
        });
    },

    pushToNewDetail(rowData){
        this.props.navigator.push({   
            component:NewsDetail,
            title:rowData.title,
            passProps:{rowData}  
        })
    },

});


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  cellStyle:{

    flexDirection:'row',
    // alignItems:'center',
    padding:10,
    borderBottomColor:'#e8e8e8',
    borderBottomWidth:0.5,
  },

  rightViewStyle:{
     width:260,
     marginLeft:8,
  },

  iconImageStyle:{
      width:90,
      height:90,
  },

  titleStyle:{
      fontSize:17,
      marginBottom:5,
  },

  subTitleStyle:{
      color:'gray',
      // 绝对定位
       position:'absolute',
       left:0,
       bottom:0,
  },

  infoStyle:{
      // 绝对定位
       position:'absolute',
       right:10,
       bottom:0,
  },


});

module.exports = Home;