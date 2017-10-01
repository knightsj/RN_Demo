
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
    TouchableWithoutFeedback
} from 'react-native';

const [left, top] = [0, 0];
const {width, height} = Dimensions.get('window');

const itemHeight = 44;
const itemSeperateLineHeight = 1;
const cancelSeperateLineHeight = 2;
const seperateLineColor='#e3e3e3';
const titleHeight = 45;


export default class AlertSelected extends Component {

    static propTypes = {

        mainTitle:PropTypes.string,
        mainTitleFont:PropTypes.number,
        mainTitleColor:PropTypes.string,

        itemTitleFont:PropTypes.number,
        itemTitleColor:PropTypes.string,

        cancelTitle:PropTypes.string,
        cancelTitleFont:PropTypes.number,
        cancelTitleColor:PropTypes.string,
        hideCancel:PropTypes.bool,

        cornerRadius:PropTypes.number,
    }

    constructor(props) {

        super(props);
        this.state = {

            //About Text ,Color and Fonts
            mainTitleFont:this.props.mainTitleFont?this.props.mainTitleFont:13,
            mainTitleColor:this.props.mainTitleColor?this.props.mainTitleColor:'gray',

            itemTitles:this.props.itemTitles?this.props.itemTitles:[],
            itemTitleFont:this.props.itemTitleFont?this.props.itemTitleFont:14,
            itemTitleColor:this.props.itemTitleColor?this.props.itemTitleColor:'black',

            cancelTitle:this.props.cancelTitle?this.props.cancelTitle:'Cancel',
            cancelTitleColor:this.props.cancelTitleColor?this.props.cancelTitleColor:'red',
            cancelTitleFont:this.props.cancelTitleFont?this.props.cancelTitleFont:15,

            //About Heights
            cancelPartHeight:this.props.hideCancel?0:(itemHeight + cancelSeperateLineHeight),


            borderRadius:this.props.borderRadius?this.props.borderRadius:0,

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
            this.real_itemsPartHeight = (itemHeight + itemSeperateLineHeight) * this.props.itemTitles.length;
        }

        //Calculate Title Height
        if (!this.props.mainTitle){
            this.real_titleHeight = 0
        }else {
            this.real_titleHeight = titleHeight;
        }

        this.totalHeight = this.real_titleHeight +  this.real_itemsPartHeight + this.state.cancelPartHeight;


        //verticalSpaceColor
        if(this.props.verticalSpaceColor){
            this.verticalSpaceColor = this.props.verticalSpaceColor;
        }else if (this.props.borderRadius > 0){
            this.verticalSpaceColor = 'transparent';
        }else {
            this.verticalSpaceColor = '#e3e3e3';
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
                    onPress={()=>this.out()}
                    underlayColor={'transparent'}
                    style={styles.container}
                >
                <View style={styles.container}>
                    <Animated.View style={styles.maskViewStyle}></Animated.View>
                    <Animated.View style={[{
                        width: width,
                        height: this.totalHeight,
                        left: 0,
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
                    <View style={[styles.titleContentViewStyle,{height:this.real_titleHeight,borderRadius:this.state.borderRadius}]}>
                        <Text style={{color: this.state.mainTitleColor, fontSize: this.state.mainTitleFont}}>{this.props.mainTitle}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderItemsPart(){

        var itemsArr = new Array();

            for (var i = 0; i< this.state.itemTitles.length;i++) {
                let title = this.state.itemTitles[i];
                let itemView =
                    <TouchableOpacity onPress={this.choose.bind(this, i)} key={i}>
                        {/*分割线*/}
                        <View style={{width:width,height: itemSeperateLineHeight, backgroundColor: this.verticalSpaceColor}}/>
                        {/*中间的选项*/}
                        <View style={[styles.itemContentViewStyle,{borderRadius:this.state.borderRadius}]} key={i}>
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
            <View style={[styles.cancelContentViewStyle]}>
                <TouchableOpacity onPress={this.cancel.bind(this)}>
                    {/* Seperate Line */}
                    <View style={{height: cancelSeperateLineHeight, backgroundColor: this.verticalSpaceColor}}/>

                    {/* Cancel Item */}
                    <View style={[styles.itemStyle,{borderRadius:this.state.borderRadius}]}>
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
        left: left,
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

    itemStyle:{
        width: width,
        height: itemHeight,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center',
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
        height: itemHeight,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center'

    },

    // Cancel content background View
    cancelContentViewStyle:{
        width: width,
        height: itemHeight + cancelSeperateLineHeight,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center'
    },

});