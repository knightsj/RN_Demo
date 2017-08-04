
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../Util/ViewUtils'
import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtls from '../Util/ArrayUtls'

export default class NewPage extends Component {

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(this.props.flag);
        this.changeValues = [];
        this.isRemoveKeyPage = this.props.isRemoveKeyPage?true:false;
        this.state={
            changed:false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                })
            })
            .catch(error=>{
                console.log(error);
            });
    }

    onSave(){

        if(this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }

        if (this.props.isRemoveKeyPage){
            for(let i=0,l=this.changeValues.length;i<l;i++){
                ArrayUtls.remove(this.state.dataArray,this.changeValues[i]);
            }
        }else {
            this.languageDao.save(this.state.dataArray);
        }

        this.props.navigator.pop();
    }

    goBack(){

        if(this.changeValues.length===0){
            this.props.navigator.pop();

        }else{
            Alert.alert(
                '提示',
                '要保存修改吗？',
                [
                  {text:'不保存',onPress:()=>{
                      this.props.navigator.pop();
                  },style:'cancel'},
                  {text:'保存',onPress:()=>{this.onSave()}}
                  ]
            )
        }


    }

    renderCheckBox(data){

        let leftText = data.name;

        return(
            <CheckBox
                style={styles.checkBoxStyle}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                unCheckedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../res/images/img_my_page/ic_check_box_outline_blank.png')}/>}
                checkedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../res/images/img_my_page/ic_check_box.png')}/>}
            />
        )
    }


    onClick(data){
        if(!this.isRemoveKeyPage)data.checked =!data.checked;
        ArrayUtls.updateArray(this.changeValues,data);
        this.setState({
            changed:true
        })
    }

    renderView(){
        if(!this.state.dataArray || this.state.dataArray.length === 0)return;
        let len = this.state.dataArray.length;
        let rowViews = [];
        for (let i=0,l= len-2; i<l; i+=2){
            rowViews.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }

        rowViews.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2 ===0? this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return rowViews;

    }

    render(){
        let title = this.isRemoveKeyPage?'标签移除':'自定义标签'
        title=this.props.flag === FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButtonTitle = this.isRemoveKeyPage?'移除':'保存'
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>

        return <View style={styles.container}>
            <NavigationBar
                title={title}
                style={{backgroundColor:'#6495ED'}}
                leftButton={ViewUtils.getLeftButton(()=>this.goBack())}
                rightButton={rightButton}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>

        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    tips:{
        fontSize:29
    },

    title:{
        fontSize:20,
        color:'white'
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray'
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    },

    checkBoxStyle:{
        flex:1,
        padding:10,

    },

    checkBoxImageStyle:{
        tintColor:'#6495ED',
        width:22,
        height:22,
    }
});