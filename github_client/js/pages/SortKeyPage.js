
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert
} from 'react-native';

import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
import ArrayUtils from '../Util/ArrayUtls'
import SortableListView from 'react-native-sortable-listview'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../Util/ViewUtils'

export default class NewPage extends Component {

    constructor(props){
        super(props);
        this.dataArray = [];
        this.sortResultArray=[];
        this.originalCheckedArray =[];
        this.state={
            checkedArray:[]
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(this.props.flag);
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    getCheckedItems(result){
        this.dataArray = result;
        let checkedArray = [];
        for(let i = 0,len=result.length;i<len;i++){
            let data = result[i];
            if(data.checked)checkedArray.push(data);
        }

        this.setState({
            checkedArray:checkedArray,
        })

        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    goBack(){

        if(!ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            this.props.navigator.pop();
            return;
        }else {
            Alert.alert(
                '提示',
                '是否保存修改？',
                [
                    {text:'不保存',onPress:()=>{
                        this.props.navigator.pop();
                    },style:'cancel'},

                    {text:'保存',onPress:()=>{
                        this.onSave(true);
                    }}
                ]
            )
        }
    }

    onSave(isChecked){
        if(!isChecked && ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }

    getSortResult(){
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for(let i =0,l=this.originalCheckedArray.length;i<l;i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
    }

    render(){

        let title = this.props.flag === FLAG_LANGUAGE.flag_language?'语言排序':'标签排序';
        let rightButton = {
            title: 'Save',
            handler:()=>this.onSave(),
            tintColor:'white',
        };

        return <View style={styles.container}>
            <NavigationBar
                title={title}
                style={{backgroundColor:'#6495ED'}}
                leftButton={ViewUtils.getLeftButton(()=>this.goBack())}
                rightButton={rightButton}
            />
            <SortableListView
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={(e) => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <SortCell data={row} {...this.props}/>}
            />
        </View>
    }
}

class SortCell extends Component{
    render(){
        return <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={500}
            style={styles.item}
            {...this.props.sortHandlers}
        >
        <View style={styles.row}>
            <Image style={styles.imageStyle} source={require('../../res/images/ic_sort.png')}></Image>
            <Text>{this.props.data.name}</Text>
        </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    item:{
        padding:15,
        backgroundColor:'#F8F8F8',
        borderBottomWidth:1,
        borderColor:'#eee'
    },

    row:{
        flexDirection:'row',
        alignItems:'center'
    },

    imageStyle:{
        tintColor:'#2196F3',
        width:18,
        height:18,
        marginRight:10
    },

    title:{
        fontSize:20,
        color:'white'
    },
});