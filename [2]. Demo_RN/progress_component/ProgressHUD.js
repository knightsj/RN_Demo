/**
 * Created by SunShijie on 2017/10/17.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];



export default class ProgressHUD extends Component {

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

            // finishDuration:this.props.finishDuration?this.props.finishDuration * 1000:500,
            // finishImagePath:this.props.finishImage?require(this.props.finishImage):require(''),
            endState:null,

            // favoriteIcon:this.props.finishImage?require('./img/timg.jpg'):require('./img/timg.jpg')

        };

    }



    render(){

            return (
                <Text>sdfsdfsd</Text>
            );
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
});