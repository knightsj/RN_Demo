
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window');
const [aWidth] = [width];
const [left, top] = [0, 0];
const [middleLeft] = [(width - aWidth) / 2];
const itemHeight = 44;
const itemSeperateLineHeight = 1;
const cancelSeperateLineHeight = 2;
const seperateLineColor='#e3e3e3';


export default class AlertSelected extends Component {

    static propTypes = {

        title:PropTypes.string,
        titleFont:PropTypes.number,
        titleColor:PropTypes.string,

        itemColor:PropTypes.string,

        cancelTitle:PropTypes.string,
        cancelTitleFont:PropTypes.number,
        cancelTitleColor:PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {

            titleColor:this.props.titleColor?this.props.titleColor:'black',
            titleFont:this.props.titleFont?this.props.titleFont:16,

            itemColor:this.props.itemColor?this.props.itemColor:'black',
            itemFont:this.props.itemFont?this.props.itemFont:15,
            itemTitles:this.props.itemTitles,

            cancelTitle:this.props.cancelTitle?this.props.cancelTitle:'取消',
            cancelTitleColor:this.props.cancelTitleColor?this.props.cancelTitleColor:'red',
            cancelTitleFont:this.props.cancelTitleFont?this.props.cancelTitleFont:16,



            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            choose0: "",
            choose1: "",

            hide: true,
            aHeight: 100,
        };
        this.entityList = [];//数据源
        this.callback = function () {
        };//回调方法
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
                        width: aWidth,
                        height: this.state.aHeight,
                        left: middleLeft,
                        ...Platform.select({
                            ios:{
                                bottom: - 40,
                            },
                        }),
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, (height - this.state.aHeight - 34)]
                            }),
                        }]
                    }]}>
                            <View style={styles.content}>
                                {this.renderTitleItem(this.props.title)}
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
    renderTitleItem(title){
        if(title === null){
            return null;
        }else {
            return (
                <View style={styles.tipTitleView}>
                    <Text style={{color: this.state.titleColor, fontSize: this.state.titleFont}}>{this.props.title}</Text>
                </View>
            )
        }
    }

    //绘制选项
    renderMiddleItems(item, i) {

        return (
            <View style={styles.itemContentViewStyle}>
                <View style={{height: itemSeperateLineHeight, backgroundColor: seperateLineColor, width: aWidth}}/>
                <TouchableOpacity
                    key={i}
                    onPress={this.props.itemCallbacks[i]}
                >
                    <View style={styles.item}>
                        <Text style={{
                            color: this.state.itemColor,
                            fontSize: this.state.itemFont,
                            textAlign: "center",
                        }}>{item}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //绘制取消
    renderCancelItem(){
        return (
            <TouchableOpacity
                style={styles.cancelItemViewStyle}
                onPress={this.cancel.bind(this)}
            >
                <View >
                    <View style={{height: cancelSeperateLineHeight, backgroundColor: seperateLineColor, width: aWidth}}/>
                    <Text style={[styles.textStyle,{color:this.state.cancelTitleColor},{fontSize:this.state.cancelTitleFont}]}>{this.state.cancelTitle}</Text>
                </View>
            </TouchableOpacity>
            )
    }

    componentDidMount() {
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
    cancel(event) {
        if (!this.state.hide) {
            this.out();
        }

    }

    //选择
    choose(i) {
        if (!this.state.hide) {
            this.out();
            this.chooseTimer = setTimeout(()=>{
                this.callback(i);
            }, 200);
        }
    }

    /**
     * 弹出控件，最多支持3个选项(包括取消)
     * titile: 标题
     * entityList：选择项数据  数组
     * tipTextColor: 字体颜色
     * callback：回调方法
     */
    show(entityList, callback) {
        // alert(this.state.itemTitles);
        this.entityList = entityList;
        this.callback = callback;

        if (this.state.hide) {
            if (entityList && entityList.length > 0) {
                let len = entityList.length;
                if (len === 1) {
                    this.setState({choose0: this.state.itemTitles[0], hide: false, titleColor: this.state.titleColor, aHeight: 180}, this.in);
                } else if (len === 2) {
                    this.setState({choose0: this.state.itemTitles[0], choose1: this.state.itemTitles[1], hide: false, titleColor: this.state.titleColor, aHeight: 236}, this.in);
                }
            }
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
    // 提示标题
    tipTitleView: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // marginLeft: 10,
        // marginRight: 10
    },

    // 分割线
    itemContentViewStyle: {
        width: aWidth,
        height: itemHeight + itemSeperateLineHeight,
        backgroundColor:'#fff',
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
    },

    item:{
        width: aWidth,
        height: itemHeight,
        backgroundColor:'#fff',
        justifyContent: 'center',
        // borderRadius: 5,
    },

    button: {
        height: itemHeight + itemSeperateLineHeight,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        // borderRadius: 5,
    },

    // 取消按钮
    buttonText: {
        fontSize: 17,
        color: "black",
        textAlign: "center",
    },

    textStyle:{
        textAlign: "center",
        justifyContent: 'center',
    },

    cancelTitleStyle:{
        fontSize: 17,
        textAlign: "center",
    },

    cancelItemViewStyle:{
        height: itemHeight + cancelSeperateLineHeight,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'
    },

    content: {
        backgroundColor: 'red',
        // borderRadius: 5,
    }
});