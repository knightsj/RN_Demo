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
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';


const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];



export default class Progress extends Component {

    static propTypes = {
        //title
        loadingText:PropTypes.string,

        finishText:PropTypes.string,
        finishImage:PropTypes.string,
        finishDuration:PropTypes.number,

        failedText:PropTypes.string,
        failedImage:PropTypes.string,

    }

    constructor(props) {

        super(props);
        this.state = {

            maskOpacity:this.props.maskOpacity?this.props.maskOpacity:0.1,
            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            animating:true,

            finishDuration:this.props.finishDuration?this.props.finishDuration * 1000:500,
            // finishImagePath:this.props.finishImage?require('../res/img/pp.png'):require('../res/img/pp.png')

        };



    }

    componentWillMount() {

        this.progressState = 0;

        // let path = this.props.finishImage;
        // if (this.props.finishImage){
        //     this.finishImagePath = require(path);
        // }else {
        //     this.finishImagePath = '';
        // }

        // this.icon = this.props.finishImage?require('./img/progress@2x.png'):require('./img/progress@2x.png');
    }


    componentWillUnmount() {
        this.finishTimer && clearTimeout(this.finishTimer);
    }


    _indicatorText(){

        if( this.progressState === 0){

            return this.props.loadingText;

        }else if (this.progressState === 1) {

            return this.props.finishText;

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

            var icon = this.props.finishImage?{uri:'progress'}:{uri:'progress'};
            return <Image source={icon}
                          style={{width: 40, height: 40, marginTop: 10, marginBottom: 26}}/>

        } else if (this.progressState === 2) {

            return null;
            // return <Image source={require('../img/progress@2x.png')}
            //               style={{width: 40, height: 40, marginTop: 10, marginBottom: 26}}/>

        } else {

            return null;

        }

    }


    render(){

        if (this.state.hide) {

            return (<View/>)

        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={()=>this.finish()}
                >
                    <View style={[styles.container]}>
                        <Animated.View style={[styles.maskViewStyle,{opacity: this.state.maskOpacity}]}></Animated.View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.bottomViewStyle}>
                                {this._indicatorView()}
                                <Text style={styles.loadingTextStyle}>{this._indicatorText()}</Text>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
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

    /*
     show ActionSheet
     */
    show() {
        if (this.state.hide) {
            this.setState({hide: false}, this._appear);
        }
    }

    finish(){
        if (!this.state.hide) {

            this.progressState = 1;
            this.setState({animating:false});

            this.finishTimer = setTimeout(
                () => {
                    this._fade();
                    this.progressState = 0;
                },
                this.state.finishDuration
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
                this.state.finishDuration
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