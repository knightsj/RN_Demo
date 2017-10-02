
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
    TouchableWithoutFeedback
} from 'react-native';


const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];

const itemHeight = 44;
const itemSeperateLineHeight = 1;
const cancelSeperateLineHeight = 2;
const titleHeight = 46;


export default class AlertSelected extends Component {

    static propTypes = {

        //title
        mainTitle:PropTypes.string,
        mainTitleFont:PropTypes.number,
        mainTitleColor:PropTypes.string,
        mainTitleHeight:PropTypes.number,
        mainTitleTextAlign:PropTypes.string,
        mainTitlePadding:PropTypes.number,

        //items
        itemTitleFont:PropTypes.number,
        itemTitleColor:PropTypes.string,
        itemHeight:PropTypes.number,

        //cancel
        cancelTitle:PropTypes.string,
        cancelTitleFont:PropTypes.number,
        cancelTitleColor:PropTypes.string,
        cancelHeight:PropTypes.number,
        hideCancel:PropTypes.bool,


        //space color
        itemSpaceColor:PropTypes.string,
        cancelSpaceColor:PropTypes.string,


        //space distance
        cancelVerticalSpace:PropTypes.number,
        bottomSpace:PropTypes.number,
        leftSpace:PropTypes.number,

        //radius
        borderRadius:PropTypes.number,
        edgeRadius:PropTypes.number,

        //opacity
        maskOpacity:PropTypes.number,


    }

    constructor(props) {

        super(props);
        this.state = {

            mainTitleFont:this.props.mainTitleFont?this.props.mainTitleFont:13,
            mainTitleColor:this.props.mainTitleColor?this.props.mainTitleColor:'gray',
            mainTitleHeight:this.props.mainTitleHeight?this.props.mainTitleHeight:titleHeight,
            mainTitleTextAlign:this.props.mainTitleTextAlign?this.props.mainTitleTextAlign:'left',
            mainTitlePadding:this.props.mainTitlePadding?this.props.mainTitlePadding:10,

            itemTitles:this.props.itemTitles?this.props.itemTitles:[],
            itemTitleFont:this.props.itemTitleFont?this.props.itemTitleFont:14,
            itemTitleColor:this.props.itemTitleColor?this.props.itemTitleColor:'black',
            itemHeight:this.props.itemHeight?this.props.itemHeight:itemHeight,

            cancelTitle:this.props.cancelTitle?this.props.cancelTitle:'Cancel',
            cancelTitleColor:this.props.cancelTitleColor?this.props.cancelTitleColor:'red',
            cancelTitleFont:this.props.cancelTitleFont?this.props.cancelTitleFont:15,
            cancelHeight:this.props.cancelHeight?this.props.cancelHeight:itemHeight,

            leftSpace:this.props.leftSpace?this.props.leftSpace:0,

            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),

            borderRadius:this.props.borderRadius?this.props.borderRadius:0,

            maskOpacity:this.props.maskOpacity?this.props.maskOpacity:0.3

        };

    }

    componentWillMount() {

        //Calculate Items height
        if (!this.props.itemTitles){
            this.real_itemsPartHeight = 0;
        }else {
            this.real_itemsPartHeight = (this.state.itemHeight + itemSeperateLineHeight) * this.props.itemTitles.length;
        }

        //Calculate Title Height
        if (!this.props.mainTitle){
            this.real_titleHeight = 0
        }else {
            this.real_titleHeight = this.state.mainTitleHeight;
        }

        //Calculate bottom space and cancel vertical space
        if (this.props.bottomSpace){

            this.bottomSpace = this.props.bottomSpace;
            this.cancelVerticalSpace =  this.props.bottomSpace;

        }else {

            this.bottomSpace = 0;

            if (this.props.cancelVerticalSpace){
                this.cancelVerticalSpace = this.props.cancelVerticalSpace;
            }else {
                this.cancelVerticalSpace = cancelSeperateLineHeight;
            }
        }

        //Calculate Cancel part height
        if (this.props.hideCancel){
            this.real_cancelPartHeight = 0;
        }else {
            this.real_cancelPartHeight = this.cancelVerticalSpace + this.state.itemHeight ;
        }

        // total content height
        this.totalHeight = this.real_titleHeight +  this.real_itemsPartHeight + this.real_cancelPartHeight + this.bottomSpace;


        //verticalSpaceColor
        if(this.props.itemSpaceColor) {
            this.itemSpaceColor = this.props.itemSpaceColor;
        }else {
            this.itemSpaceColor = '#e3e3e3';
        }

        // cancel space color
        if(this.props.cancelSpaceColor){
            this.cancelSpaceColor =  this.props.cancelSpaceColor;
        }else if(this.props.borderRadius){
            this.cancelSpaceColor = 'transparent';
        }else {
            this.cancelSpaceColor = '#e3e3e3';
        }

    }



    componentWillUnmount() {
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }



    render() {

        if (this.state.hide) {

            return (<View/>)

        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={()=>this._fade()}
                    underlayColor={'transparent'}
                >
                <View style={[styles.container]}>
                    <Animated.View style={[styles.maskViewStyle,{opacity: this.state.maskOpacity}]}></Animated.View>
                    <Animated.View style={[{
                        width: width,
                        height: this.totalHeight,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, (height - this.totalHeight)]
                            }),
                        }]
                    }]}>
                        <View>
                            {this._renderTitleItem()}
                            {this._renderItemsPart()}
                            {this._renderCancelItem()}
                        </View>
                    </Animated.View>
                </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    //render title part
    _renderTitleItem(){
        if(!this.props.mainTitle){
            return null;
        }else {
            return (
                <TouchableWithoutFeedback>
                    <View style={[styles.titleContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.real_titleHeight,borderTopLeftRadius:this.state.borderRadius,borderTopRightRadius:this.state.borderRadius,padding:this.state.mainTitlePadding}]}>
                        <Text style={ {color: this.state.mainTitleColor, fontSize: this.state.mainTitleFont,textAlign: this.state.mainTitleTextAlign,}}>{this.props.mainTitle}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    //render selection items part
    _renderItemsPart(){

        var itemsArr = new Array();

        var topRadius = 0;
        var bottomRadius = 0;
        var showItemSeperateLine = true;

        for (var i = 0; i< this.state.itemTitles.length;i++) {

            if (!this.props.mainTitle && i === 0){
                topRadius = this.state.borderRadius;
                showItemSeperateLine = false;
            }else {
                topRadius = 0;
                showItemSeperateLine = true;
            }

            if ( i === this.state.itemTitles.length - 1){
                bottomRadius = this.state.borderRadius;
            }else {
                bottomRadius = 0;
            }


            let title = this.state.itemTitles[i];
            let itemView =
                <TouchableOpacity onPress={this._select.bind(this, i)} key={i} activeOpacity = {1}>
                    {/* Seperate Line */}
                    {this._renderItemSeperateLine(showItemSeperateLine)}
                    {/* item for selection*/}
                    <View style={[styles.itemContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.state.itemHeight,borderTopLeftRadius:topRadius,borderTopRightRadius:topRadius,borderBottomLeftRadius:bottomRadius,borderBottomRightRadius:bottomRadius}]} key={i}>
                        <Text style={[styles.textStyle, {color: this.state.itemTitleColor, fontSize: this.state.itemTitleFont}]}>{title}</Text>
                    </View>
                </TouchableOpacity>
            itemsArr.push(itemView);
        }
        return itemsArr;
    }

    //render selection seperate line
    _renderItemSeperateLine(show){
        if (show){
            return ( <View style={{width:width - 2*this.state.leftSpace,height: itemSeperateLineHeight, backgroundColor: this.itemSpaceColor}}/>);
        }else {
            return null;
        }
    }


    //render cancel part
    _renderCancelItem(){
        return (
            <View style={[styles.cancelContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.real_cancelPartHeight}]}>
                <TouchableOpacity onPress={this._dismiss.bind(this)} activeOpacity = {1}>
                    {/* Seperate Line */}
                    <View style={{width:width - 2*this.state.leftSpace,height: this.cancelVerticalSpace, backgroundColor: this.cancelSpaceColor}}/>

                    {/* Cancel Item */}
                    <View style={[styles.itemContentViewStyle,{borderRadius:this.state.borderRadius,width:width - 2*this.state.leftSpace,height:this.state.itemHeight}]}>
                        <Text style={[styles.textStyle,{color:this.state.cancelTitleColor,fontSize:this.state.cancelTitleFont}]}>{this.state.cancelTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }




    //animation of showing
    _appear() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0.7,
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

    //dismiss ActionSheet
    _dismiss() {
        if (!this.state.hide) {
            this._fade();
        }

    }

    //select item
    _select(i) {
        if (!this.state.hide) {
            this._fade();
            let callback = this.props.itemCallbacks[i];
            this.chooseTimer = setTimeout(()=>{
                if(callback){
                    {callback()}
                }
            }, 200);
        }
    }

    /*
     show ActionSheet
     */
    show() {
        if (this.state.hide) {
            this.setState({hide: false}, this._appear);
        }
    }
}

const styles = StyleSheet.create({

    //whole container
    container: {
        position: "absolute",
        width: width,
        height: height,
        top: top,
    },

    //mask
    maskViewStyle: {
        justifyContent: "center",
        backgroundColor: "#000000",
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },

    //style of text
    textStyle:{
        textAlign: "center",
        justifyContent: 'center',
    },

    //title content background view style
    titleContentViewStyle: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',

    },

    // item content background view style
    itemContentViewStyle: {
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center'

    },

    // cancel content background view style
    cancelContentViewStyle:{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center'
    },

});