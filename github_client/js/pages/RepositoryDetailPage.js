
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../Util/ViewUtils'

export default class RepositoryDetailPage extends Component {

    constructor(props){
        super(props);
        let url = this.props.item.html_url;
        let title = this.props.item.full_name;
        this.state={
            url:url,
            title:title,
            canGoBack:false
        }
    }

    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            this.props.navigator.pop();
        }

    }
    go(){
        this.setState({
            url:this.text
        })
    }

    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
        })

    }
    componentDidMount() {

    }


    render(){
        return <View style={styles.container}>
            <NavigationBar
                title={this.state.title}
                style={{backgroundColor:'#6495ED'}}
                leftButton={ViewUtils.getLeftButton(()=>this.goBack())}
            />
            <WebView
                ref = {webView=>this.webView=webView}
                source={{uri:this.state.url}}
                onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                startInLoadingState={true}
            />
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    tips:{
        fontSize:20
    },

    row:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },

    input:{
        height:40,
        flex:1,
        borderWidth:1,
        margin:2
    }
});