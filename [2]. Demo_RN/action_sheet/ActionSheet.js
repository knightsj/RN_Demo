
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
const cancelSeperateLineHeight = 2.5;
const seperateLineColor='#e3e3e3';
const titleHeight = 46;


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
    }

    constructor(props) {
        super(props);
        this.state = {

            //About Text ,Color and Fonts
            mainTitleFont:this.props.mainTitleFont?this.props.mainTitleFont:13,
            mainTitleColor:this.props.mainTitleColor?this.props.mainTitleColor:'gray',

            itemTitles:this.props.itemTitles,
            itemTitleFont:this.props.itemTitleFont?this.props.itemTitleFont:14,
            itemTitleColor:this.props.itemTitleColor?this.props.itemTitleColor:'black',

            cancelTitle:this.props.cancelTitle?this.props.cancelTitle:'Cancel',
            cancelTitleColor:this.props.cancelTitleColor?this.props.cancelTitleColor:'red',
            cancelTitleFont:this.props.cancelTitleFont?this.props.cancelTitleFont:15,

            //About Heights
            itemsPartHeight:(itemHeight + itemSeperateLineHeight) * this.props.itemTitles.length,
            cancelPartHeight:this.props.hideCancel?0:(itemHeight + cancelSeperateLineHeight),

            //About About Animations
            hide: true,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),

        };

    }



    render() {

        //Calculate Title Height
        if (!this.props.mainTitle){
            this.real_titleHeight = 0
        }else {
            this.real_titleHeight = titleHeight;
        }
        let totalHeight = this.real_titleHeight +  this.state.itemsPartHeight + this.state.cancelPartHeight;

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
                        height: totalHeight,
                        left: 0,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, (height - totalHeight)]
                            }),
                        }]
                    }]}>
                        <View>
                            {this.renderTitleItem()}
                            {this.state.itemTitles.map((item, i) => this.renderMiddleItems(item, i))}
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
                <TouchableWithoutFeedback
                >
                    <View style={[styles.titleContentViewStyle,{height:this.real_titleHeight}]}>
                        <Text style={{color: this.state.mainTitleColor, fontSize: this.state.mainTitleFont}}>{this.props.mainTitle}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    //绘制选项
    renderMiddleItems(item, i) {

        return (
            <View style={styles.itemContentViewStyle} key={i}>

                {/*分割线*/}
                <View style={{height: itemSeperateLineHeight, backgroundColor: seperateLineColor}}/>

                {/*中间的选项*/}
                <TouchableOpacity
                    onPress={this.choose.bind(this, i)}
                >
                    <View style={styles.itemStyle}>
                        <Text style={[styles.textStyle,{color: this.state.itemTitleColor, fontSize: this.state.itemTitleFont}]}>{item}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //绘制取消按钮
    renderCancelItem(){
        return (
            <View style={styles.cancelContentViewStyle}>
                <TouchableOpacity
                    onPress={this.cancel.bind(this)}
                >
                    {/* Seperate Line */}
                    <View style={{height: cancelSeperateLineHeight, backgroundColor: seperateLineColor}}/>

                    {/* Cancel Item */}
                    <View style={styles.itemStyle}>
                        <Text style={[styles.textStyle,{color:this.state.cancelTitleColor,fontSize:this.state.cancelTitleFont}]}>{this.state.cancelTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        this.chooseTimer && clearTimeout(this.chooseTimer);
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
                {callback()}
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

    // Title Content Background View
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

    // Item Content Background View
    itemContentViewStyle: {
        width: width,
        height: itemHeight + itemSeperateLineHeight,
        backgroundColor:'#fff',
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
    },

    itemStyle:{
        width: width,
        height: itemHeight,
        justifyContent: 'center',
        alignItems:'center'
        // borderRadius: 5,
    },

    textStyle:{
        textAlign: "center",
        justifyContent: 'center',
    },

    cancelContentViewStyle:{
        width: width,
        height: itemHeight + cancelSeperateLineHeight,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'
    },
});