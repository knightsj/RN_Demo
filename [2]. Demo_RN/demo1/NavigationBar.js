/**
 * NavigationBar
 * @flow
 */
import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Navigator,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View,
    Dimensions
} from 'react-native'


const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 44;
const STATUS_BAR_HEIGHT = 20;

const {width, height} = Dimensions.get('window');

const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: PropTypes.any,
    handler: PropTypes.func,
};

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    networkActivityIndicatorVisible: PropTypes.bool,
    showHideTransition:PropTypes.oneOf(['fade', 'slide']),
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    backgroundColor: PropTypes.string,
    animated:PropTypes.bool
};

export default class NavigationBar extends Component {

    static propTypes = {
        style: View.propTypes.style,
        titleLayoutStyle:View.propTypes.style,
        navigator: PropTypes.object,
        leftButtonTitle: PropTypes.string,
        popEnabled: PropTypes.bool,
        onLeftButtonClick: PropTypes.func,
        backgroundImageUri:PropTypes.string,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        leftButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),

    }

    static defaultProps = {
        statusBar: {
            barStyle: 'default',
            hidden: false,
            translucent:false,
            animated:false,
        },
    }

    constructor(props) {

        super(props);

        var isIPhoneX = false;
        var marginBottom = 0;
        var titlePaddingTop = 22;
        var navHeight = 76;
        var imageBgTextPaddingRight = 0;
        var isImageBg = false;
        if (this.props.backgroundImageUri){
            isImageBg = true;
        }else {
            isImageBg = false;
        }

        if(height === 812){

            isIPhoneX = true;

            if(isImageBg){
                navHeight = 132;
                titlePaddingTop = 74;
                marginBottom= 34;
            }else {
                navHeight = 300;
                titlePaddingTop = 54;
                marginBottom= 16;
            }


            if(this.props.leftButton){
                imageBgTextPaddingRight = 22;
            }else {
                imageBgTextPaddingRight = 0;
            }

        }else{
            isIPhoneX = false;
            marginBottom = 8;

            if(isImageBg){
                titlePaddingTop = 30;
            }else {
                titlePaddingTop = 26;
            }

            navHeight = 80;

            if(this.props.leftButton){
                imageBgTextPaddingRight = 28;
            }else {
                imageBgTextPaddingRight = 0;
            }

        }

        this.state = {
            popEnabled: true,
            hide: false,
            marginBottom:marginBottom,
            isIPhoneX:isIPhoneX,
            titlePaddingTop:titlePaddingTop,
            navHeight:navHeight,
            imageBgTextPaddingRight:imageBgTextPaddingRight
        };


    }


    getButtonElement(data = {}, style) {

        var paddingTop = null;
        var paddingBottom = null;
        if(this.props.backgroundImageUri){

            if (this.state.isIPhoneX){
                paddingTop = 74;
                paddingBottom = 0;

            }else {

                paddingTop = 30;
                paddingBottom = 0;
            }

        }else {
            paddingTop = 0;
            paddingBottom = 6;
        }

        return (
            <View style={[styles.navBarButton,{paddingTop:paddingTop,paddingBottom:paddingBottom}]}>
                {(!!data.props) ? data : (
                    <NavBarButton
                        title={data.title}
                        style={[data.style, style,]}
                        tintColor={data.tintColor}
                        handler={data.handler}/>
                )}
            </View>
        );
    }

    render() {


        //背景是个图片
        if(this.props.backgroundImageUri){


            //状态栏
            this.statusBar = null;
            //背景图片
            this.titleView = <View
                style={{height: Platform.OS === 'ios' ? this.state.navHeight : 44}}>
                <Image
                    source={{uri:this.props.backgroundImageUri}}
                    style={{width:width,
                            height: Platform.OS === 'ios' ? this.state.navHeight : 44,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'}}
                >
                    {this.getButtonElement(this.props.leftButton)}
                    <Text style={[styles.title,{paddingTop:this.state.titlePaddingTop,paddingRight:this.state.imageBgTextPaddingRight,backgroundColor:'transparent',marginLeft: 8}]} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>
                    {this.getButtonElement(this.props.rightButton, {marginRight: 8})}
                </Image>
            </View>

            this.content = this.props.hide ? null :
                <View style={styles.navBar}>
                    <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                        {this.titleView}
                    </View>
                </View>;

        }else {
            //背景没有图片，只有颜色
            let bgColor = this.props.style.backgroundColor?this.props.style.backgroundColor:'transparent'

            this.statusBar = (!this.props.statusBar.hidden)?
                <View style={styles.statusBar}>
                    <StatusBar {...this.props.statusBar} barStyle="light-content" style={[styles.statusBar,{backgroundColor:bgColor}]}/>
                </View>: null;

            this.titleView = this.props.titleView ? this.props.titleView :
                <Text style={[styles.title,{paddingBottom:10}]} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>;

            this.content = this.props.hide ? null :
                <View style={styles.navBar}>
                    {this.getButtonElement(this.props.leftButton)}
                    <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                        {this.titleView}
                    </View>
                    {this.getButtonElement(this.props.rightButton, {marginRight: 8})}
                </View>;
        }


        return (

            <View style={[styles.container, this.props.style,{marginBottom:this.state.marginBottom}]}>
                {this.statusBar}
                {this.content}
            </View>

        )
    }
}
class NavBarButton extends Component {
    render() {
        const {style, tintColor, margin, title, handler} = this.props;

        return (
            <TouchableOpacity style={styles.navBarButton} onPress={handler}>
                <View style={style}>
                    <Text style={[styles.title, {color: tintColor,},]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        tintColor: PropTypes.string,
        title: PropTypes.string,
        handler: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        title: '',
        tintColor: '#0076FF',
        onPress: () => ({}),
    };
}

const styles = StyleSheet.create({

    container: {

    },

    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily:'Helvetica',
        fontWeight:'100'
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,

    },
})
