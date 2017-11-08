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
        this.state = {
            title: '',
            popEnabled: true,
            hide: false
        };
    }
    leftView() {
        var leftView = this.props.leftButtonTitle ?
            <Text style={styles.title}>{this.props.leftButtonTitle}</Text> : null;
        return (
            <TouchableOpacity
                onPress={()=>this.onLeftButtonClick()}>
                <View style={{width: 50, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    {this.props.leftView ? this.props.leftView : leftView}
                </View>
            </TouchableOpacity>
        )
    }

    onLeftButtonClick() {
        if (this.props.navigator && this.props.popEnabled)this.props.navigator.pop();
        if (this.props.onLeftButtonClick)this.props.onLeftButtonClick();
    }


    getButtonElement(data = {}, style) {
        return (
            <View style={[styles.navBarButton,{paddingTop:22}]}>
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

        if(this.props.backgroundImageUri){

            //状态栏
            this.statusBar = null;
            //背景图片
            this.titleView = <View>
                <Image
                    source={{uri:this.props.backgroundImageUri}}
                    style={{width:width,height:64,flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',}}
                >
                    {this.getButtonElement(this.props.leftButton)}
                    <Text style={[styles.title,{paddingTop:22,backgroundColor:'transparent'}]} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>
                    {this.getButtonElement(this.props.rightButton, {marginRight: 8,})}
                </Image>
            </View>

            this.content = this.props.hide ? null :
                <View style={styles.navBar}>
                    <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                        {this.titleView}
                    </View>
                </View>;

        }else {

            this.statusBar = (!this.props.statusBar.hidden)?
                <View style={styles.statusBar}>
                    <StatusBar {...this.props.statusBar} barStyle="light-content" style={[styles.statusBar,{backgroundColor:this.props.style.backgroundColor}]}/>
                </View>: null;

            this.titleView = this.props.titleView ? this.props.titleView :
                <Text style={styles.title} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>;

            this.content = this.props.hide ? null :
                <View style={styles.navBar}>
                    {this.getButtonElement(this.props.leftButton)}
                    <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                        {this.titleView}
                    </View>
                    {this.getButtonElement(this.props.rightButton, {marginRight: 8,})}
                </View>;
        }



        return (
            <View style={[styles.container, this.props.style]}>
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
