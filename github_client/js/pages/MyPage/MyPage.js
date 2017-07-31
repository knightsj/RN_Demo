
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortPage from '../SortKeyPage'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class MyPage extends Component {

    constructor(props) {
        super(props);
    }
    

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{backgroundColor:'#6495ED'}}
                />
                <Text
                    style={styles.tips}
                    onPress={()=>this.jump1()}
                >自定义标签</Text>

                <Text
                style={styles.tips}
                onPress={()=>this.jump2()}
                >标签排序</Text>

                <Text
                    style={styles.tips}
                    onPress={()=>this.jump5()}
                >语言排序</Text>

                <Text
                    style={styles.tips}
                    onPress={()=>this.jump3()}
                >删除排序</Text>

                <Text
                    style={styles.tips}
                    onPress={()=>this.jump4()}
                >自定义语言</Text>
            </View>)
    }
    
    jump1(){
        this.props.navigator.push({
            component:CustomKeyPage,
            params:{
                ...this.props,
                flag:FLAG_LANGUAGE.flag_key
            }

        })
    }

    jump2(){
        this.props.navigator.push({
            component:SortPage,
            params:{
                ...this.props,
                flag:FLAG_LANGUAGE.flag_key
            }
        })
    }

    jump3(){
        this.props.navigator.push({
            component:CustomKeyPage,
            params:{
                ...this.props,
                isRemoveKeyPage:true
            }
        })
    }

    jump4(){
        this.props.navigator.push({
            component:CustomKeyPage,
            params:{
                ...this.props,
                flag:FLAG_LANGUAGE.flag_language
            }
        })
    }

    jump5(){
        this.props.navigator.push({
            component:SortPage,
            params:{
                ...this.props,
                flag:FLAG_LANGUAGE.flag_language
            }
        })
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tips:{
        fontSize:29
    }
});