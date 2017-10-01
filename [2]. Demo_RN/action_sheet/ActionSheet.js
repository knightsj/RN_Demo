
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

const [left, top] = [0, 0];
const {width, height} = Dimensions.get('window');

const itemHeight = 44;
const itemSeperateLineHeight = 1;
const cancelSeperateLineHeight = 2;
const titleHeight = 46;


export default class AlertSelected extends Component {

    static propTypes = {

        mainTitle:PropTypes.string,
        mainTitleFont:PropTypes.number,
        mainTitleColor:PropTypes.string,
        mainTitleHeight:PropTypes.number,

        itemTitleFont:PropTypes.number,
        itemTitleColor:PropTypes.string,
        itemHeight:PropTypes.number,

        cancelTitle:PropTypes.string,
        cancelTitleFont:PropTypes.number,
        cancelTitleColor:PropTypes.string,
        cancelHeight:PropTypes.number,
        hideCancel:PropTypes.bool,

        borderRadius:PropTypes.number,
        edgeRadius:PropTypes.number,
        itemSpaceColor:PropTypes.string,
        cancelSpaceColor:PropTypes.string,


        cancelVerticalSpace:PropTypes.number,
        bottomSpace:PropTypes.number,
        leftSpace:PropTypes.number,


    }

    constructor(props) {

        super(props);
        this.state = {

            //About Text ,Color and Fonts
            mainTitleFont:this.props.mainTitleFont?this.props.mainTitleFont:13,
            mainTitleColor:this.props.mainTitleColor?this.props.mainTitleColor:'gray',
            mainTitleHeight:this.props.mainTitleHeight?this.props.mainTitleHeight:titleHeight,

            itemTitles:this.props.itemTitles?this.props.itemTitles:[],
            itemTitleFont:this.props.itemTitleFont?this.props.itemTitleFont:14,
            itemTitleColor:this.props.itemTitleColor?this.props.itemTitleColor:'black',

            cancelTitle:this.props.cancelTitle?this.props.cancelTitle:'Cancel',
            cancelTitleColor:this.props.cancelTitleColor?this.props.cancelTitleColor:'red',
            cancelTitleFont:this.props.cancelTitleFont?this.props.cancelTitleFont:15,



            leftSpace:this.props.leftSpace?this.props.leftSpace:0,
            borderRadius:this.props.borderRadius?this.props.borderRadius:0,

            mainTitleHeight:this.props.mainTitleHeight?this.props.mainTitleHeight:titleHeight,
            itemHeight:this.props.itemHeight?this.props.itemHeight:itemHeight,
            cancelHeight:this.props.cancelHeight?this.props.cancelHeight:itemHeight,

            //About About Animations
            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),

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

        this.totalHeight = this.real_titleHeight +  this.real_itemsPartHeight + this.real_cancelPartHeight + this.bottomSpace;


        //verticalSpaceColor
        if(this.props.itemSpaceColor) {
            this.itemSpaceColor = this.props.itemSpaceColor;
        }else {
            this.itemSpaceColor = '#e3e3e3';
        }

        if(this.props.cancelSpaceColor){
            this.cancelSpaceColor =  this.props.cancelSpaceColor;
        }else if(this.props.borderRadius){
            this.cancelSpaceColor = 'transparent';
        }else {
            this.cancelSpaceColor = '#e3e3e3';
        }}



    componentWillUnmount() {
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }



    render() {

        if (this.state.hide) {

            return (<View/>)

        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={()=>this.out()}
                    underlayColor={'transparent'}
                >
                <View style={[styles.container]}>
                    <Animated.View style={[styles.maskViewStyle]}></Animated.View>
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
                            {this.renderTitleItem()}
                            {this.renderItemsPart()}
                            {this.renderCancelItem()}
                        </View>
                    </Animated.View>
                </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    //绘制标题
    renderTitleItem(){
        if(!this.props.mainTitle){
            return null;
        }else {
            return (
                <TouchableWithoutFeedback>
                    <View style={[styles.titleContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.real_titleHeight,borderTopLeftRadius:this.state.borderRadius,borderTopRightRadius:this.state.borderRadius}]}>
                        <Text style={{color: this.state.mainTitleColor, fontSize: this.state.mainTitleFont}}>{this.props.mainTitle}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderItemsPart(){

        var itemsArr = new Array();

        var topRadius = 0;
        var bottomRadius = 0;

        for (var i = 0; i< this.state.itemTitles.length;i++) {

            if (!this.props.mainTitle && i === 0){
                topRadius = this.state.borderRadius;
            }else {
                topRadius = 0;
            }

            if ( i === this.state.itemTitles.length - 1){
                bottomRadius = this.state.borderRadius;
            }else {
                bottomRadius = 0;
            }


            let title = this.state.itemTitles[i];
            let itemView =
                <TouchableOpacity onPress={this.choose.bind(this, i)} key={i} activeOpacity = {1}>
                    {/*分割线*/}
                    <View style={{width:width - 2*this.state.leftSpace,height: itemSeperateLineHeight, backgroundColor: this.itemSpaceColor}}/>
                    {/*中间的选项*/}
                    <View style={[styles.itemContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.state.itemHeight,borderTopLeftRadius:topRadius,borderTopRightRadius:topRadius,borderBottomLeftRadius:bottomRadius,borderBottomRightRadius:bottomRadius}]} key={i}>
                        <Text style={[styles.textStyle, {color: this.state.itemTitleColor, fontSize: this.state.itemTitleFont}]}>{title}</Text>
                    </View>
                </TouchableOpacity>
            itemsArr.push(itemView);
        }
        return itemsArr;
    }


    //绘制取消按钮
    renderCancelItem(){
        return (
            <View style={[styles.cancelContentViewStyle,{width:width - 2*this.state.leftSpace,height:this.real_cancelPartHeight}]}>
                <TouchableOpacity onPress={this.cancel.bind(this)} activeOpacity = {1}>
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




    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 200,//动画持续的时间（单位是毫秒），默认为200。
                    toValue: 0.7,//动画的最终值
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

    out() {
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

    //取消
    cancel() {
        if (!this.state.hide) {
            this.out();
        }

    }

    //选择
    choose(i) {
        if (!this.state.hide) {
            this.out();
            let callback = this.props.itemCallbacks[i];
            this.chooseTimer = setTimeout(()=>{
                if(callback){
                    {callback()}
                }else {
                    alert('there is no callback in item line'+i);
                }
            }, 200);
        }
    }

    /**
     * 弹出控件，最多支持3个选项(包括取消)
     */
    show() {
        if (this.state.hide) {
            this.setState({hide: false}, this.in);
        }
    }
}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        width: width,
        height: height,
        top: top,
    },

    maskViewStyle: {
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.3,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },


    textStyle:{
        textAlign: "center",
        justifyContent: 'center',
    },

    // Title content background view
    titleContentViewStyle: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding:10,
        // marginLeft: 10,
        // marginRight: 10
    },

    // Item content background View
    itemContentViewStyle: {
        width: width,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center'

    },

    // Cancel content background View
    cancelContentViewStyle:{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center'
    },

});