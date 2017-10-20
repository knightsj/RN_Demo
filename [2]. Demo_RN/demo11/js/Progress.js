/**
 * Created by SunShijie on 2017/10/18.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    Easing,
    Dimensions,
    ActivityIndicator,
} from 'react-native';


const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];



export default class Progress extends Component {

    static propTypes = {

        //正在加载中的文字
        loadingText:PropTypes.string,

        //成功回调的文字
        succeedText:PropTypes.string,
        //成功回调的图片路径
        succeedImage:PropTypes.string,

        //失败回调的文字
        failedText:PropTypes.string,
        //失败回调的图片路径
        failedImage:PropTypes.string,

        //回调后距离progress消失的时间间隔，单位为秒
        dismissDuration:PropTypes.number,
    }

    constructor(props) {

        super(props);
        this.state = {

            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),

            animating:true,
            maskOpacity:this.props.maskOpacity?this.props.maskOpacity:0.1,
            dismissDuration:this.props.dismissDuration?this.props.dismissDuration * 1000:500,

        };
    }

    componentWillMount() {

        this.progressState = 0;

    }


    componentWillUnmount() {
        this.finishTimer && clearTimeout(this.finishTimer);
    }


    _indicatorText(){

        if( this.progressState === 0){

            return this.props.loadingText;

        }else if (this.progressState === 1) {

            return this.props.succeedText;

        } else if (this.progressState === 2) {

            return this.props.failedText;

        } else {

            return null;

        }
    }


    _indicatorView() {

        if( this.progressState === 0){

            return <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 76}]}
                size="large"/>

        }else if (this.progressState === 1) {

            if (this.props.succeedImage){
                return <Image source={{uri:this.props.succeedImage}}
                              style={{width: 40, height: 40, marginTop: 10, marginBottom: 26}}/>
            }else {
                return null;
            }


        } else if (this.progressState === 2) {


            if (this.props.failedImage){
                return <Image source={{uri:this.props.failedImage}}
                              style={{width: 40, height: 40, marginTop: 10, marginBottom: 26}}/>
            }else {
                return null;
            }

        } else {

            return null;

        }

    }


    render(){

        if (this.state.hide) {

            return (<View/>)

        } else {
            return (
                    <View style={[styles.container]}>
                        <Animated.View style={[styles.maskViewStyle,{opacity: this.state.maskOpacity}]}></Animated.View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.bottomViewStyle}>
                                {this._indicatorView()}
                                <Text style={styles.loadingTextStyle}>{this._indicatorText()}</Text>
                            </View>
                        </View>
                    </View>
            );
        }
    }




    //animation of showing
    _appear() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0.0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //animation of fading
    _fade() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true}));
    }

    //显示Progress
    show() {
        if (this.state.hide) {
            this.setState({hide: false}, this._appear);
        }
    }


    finish(){
        if (!this.state.hide) {

            this.setState({hide:true});
            this.progressState = 0;
        }
    }


    succeed(){
        if (!this.state.hide) {

            this.progressState = 1;
            this.setState({animating:false});

            this.finishTimer = setTimeout(
                () => {
                    this._fade();
                    this.progressState = 0;
                },
                this.state.dismissDuration
            );

        }


    }

    failed(){
        if (!this.state.hide) {

            this.progressState = 2;
            this.setState({animating:false});

            this.finishTimer = setTimeout(
                () => {
                    this._fade();
                    this.progressState = 0;
                },
                this.state.dismissDuration
            );

        }

    }
}

const styles = StyleSheet.create({

    //style of whole container
    container: {
        flex:1,
        position: "absolute",
        width: width,
        height: height,
        top: top,
        justifyContent:'center',
        alignItems:'center'
    },


    //style of mask
    maskViewStyle: {
        justifyContent: "center",
        backgroundColor: "#000000",
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },

    bottomViewStyle:{
        width:240,
        height:200,
        backgroundColor:'black',
        opacity:0.6,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },

    loadingTextStyle:{
        color:'white',
        fontSize:17
    }
});