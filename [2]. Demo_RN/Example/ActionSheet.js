
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
    BackHandler,
    ActivityIndicator
} from 'react-native';


const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];



export default class ActionSheet extends Component {

    static propTypes = {
        //title
        loadingText:PropTypes.string,
        finishText:PropTypes.string,
        finishImage:PropTypes.string,
    }

    constructor(props) {

        super(props);
        this.state = {

            maskOpacity:this.props.maskOpacity?this.props.maskOpacity:0.1,
            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            animating:true,

        };

    }

    componentWillMount() {
        let path = this.props.finishImage;
        if (this.props.finishImage){
            this.finishImagePath = require(path);
        }else {
            this.finishImagePath = '';
        }
    }


    componentWillUnmount() {
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }


    _indicatorText(){

        if(this.state.animating){
            return this.props.loadingText;
        }else {
            return this.props.finishText;
        }
    }

    _indicatorView(){
        if (this.state.animating){
            return <ActivityIndicator
                animating={this.state.animating}
                style={[styles.centering, {height: 80}]}
                size="large" />
        }else {

            let icon = require('./image/progress_check.png');

            return <Image
                style={{width:30,height:30}}
                source={{icon}}>
            </Image>

        }
    }

    render() {

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
            this.setState({animating:false});
            this._fade();
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
        fontSize:15
    }
});