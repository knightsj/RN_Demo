import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    StatusBar,
    Alert,
    TouchableOpacity,
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATE_BAR_HEIGHT = 20;
var Dimensions = require('Dimensions');
var Swidth = Dimensions.get('window').width;
const StatusBarShap = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool,
}
export default class NavigatorBar extends Component {
    //定义属性
    static proTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,
        titleStyle: View.propTypes.style,
        statusBarOutViewStyle: View.propTypes.style,
        titleView: PropTypes.element,
        hide: PropTypes.boolean,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShap),
        leftButtonOnPress: PropTypes.func,
        rightButtonOnPress: PropTypes.func,
    }
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let statusbar = <View
            style={[styles.statusBarStyle, this.props.statusBarOutViewStyle]}><StatusBar {...this.props.statusBar}/></View>
        let TitleView = this.props.titleView ? this.props.titleView :
            <Text style={[styles.titleStyle, this.props.titleStyle]}>{this.props.title}</Text>
        let content = <View style={styles.nabar}>
            <TouchableOpacity onPress={() => {
                if (this.props.leftButtonOnPress !== null) {
                    this.props.leftButtonOnPress();
                }
            }
            }>
                {this.props.leftButton}
            </TouchableOpacity>
            <View style={styles.titleViewStyle}>
                {TitleView}
            </View>
            <TouchableOpacity onPress={() => {
                if (this.props.rightButtonOnPress) {
                    this.props.rightButtonOnPress();
                }
            }}>
                {this.props.rightButton}
            </TouchableOpacity>
        </View>
        return (
            <View style={[styles.container, this.props.style]}>
                {statusbar}
                {content}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    nabar: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        width: Swidth,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    titleStyle: {
        color: "gray",
        fontSize: 20,
    },
    statusBarStyle: {
        height: Platform.OS === 'ios' ? STATE_BAR_HEIGHT : 0,
    }


});
module.exports = NavigatorBar;
