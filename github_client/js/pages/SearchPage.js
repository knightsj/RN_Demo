
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TextInput,
    TouchableOpacity
} from 'react-native';

import ViewUtils from '../Util/ViewUtils'
import GlobalStyle from '../../res/styles/GlobalStyles'

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state={
            rightButtonText:'搜索'
        }
    }

    componentDidMount() {

    }

    onRightButtonClick(){
        if (this.state.rightButtonText ==='搜索'){
            this.updateState({rightButtonText:'取消'})
        }else if (this.state.rightButtonText ==='取消'){
            this.updateState({rightButtonText:'搜索'})
        }else {

        }
    }

    onBackPress(){
        this.refs.input.blur();//隐藏键盘,失去焦点
        this.props.navigator.pop();
    }

    updateState(dict){
        if(!this)return;
        this.setState(dict)
    }

    renderNavigationBar(){
        let backButton = ViewUtils.getLeftButton(()=>this.onBackPress());
        let inputView = <TextInput
            ref = "input"
            style={styles.textInputStyle}
        >

        </TextInput>
        let rightButton = <TouchableOpacity
            onPress={()=>{
                this.refs.input.blur();//隐藏键盘,失去焦点
                this.onRightButtonClick();
            }}
        >
            <View style={{marginRight:10,marginLeft:10}}>
                <Text style={styles.navRightButtonTextStyle}>{this.state.rightButtonText}</Text>
            </View>

        </TouchableOpacity>
        return <View style={styles.navBarStyle}>
            {backButton}
            {inputView}
            {rightButton}
        </View>
    }

    render(){
        let statusBar = null;
        if (Platform.OS === 'ios'){
            statusBar = <View style={styles.statusBarStyle}/>
        }
        return <View style={styles.container}>
            {statusBar}
            {this.renderNavigationBar()}
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'stretch'
    },

    statusBarStyle:{
       backgroundColor:'#2196F3',
        height:20
    },

    navBarStyle:{
        height:(Platform.OS === 'ios')?GlobalStyle.nav_bar_height_ios:GlobalStyle.nav_bar_height_android,
        backgroundColor:'#2196F3',
        alignItems:'center',
        flexDirection:'row'
    },

    textInputStyle:{
        flex:1,
        height:(Platform.OS === 'ios')?30:40,
        borderWidth:(Platform.OS === 'ios')?1:0,
        borderColor:'white',
        alignSelf:'center',
        paddingLeft:5,
        marginRight:10,
        marginLeft:5,
        borderRadius:4,
        opacity:0.7,
        color:'white'
    },

    navRightButtonTextStyle:{

        fontSize:17,
        fontWeight:'500',
        color:'white'
    }
});