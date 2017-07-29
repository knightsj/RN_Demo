
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RespositoryCell extends Component{
    render(){
        return<TouchableOpacity
            onPress={this.props.onSelect}
            style={styles.container}
        >
            <View style={styles.cell_container}>

                <Text style={styles.title}>{this.props.data.full_name}</Text>

                <Text style={styles.description}>{this.props.data.description}</Text>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.bottomTextStyle}>Author:</Text>
                        <Image
                            style={styles.avatarImageStyle}
                            source={{uri:this.props.data.owner.avatar_url}}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.bottomTextStyle}>Starts:</Text>
                        <Text style={styles.bottomTextStyle}>{this.props.data.stargazers_count}</Text>
                    </View>

                    <Image style={styles.starImageStyle} source={require('../../res/images/ic_star.png')}/>
                </View>
            </View>
        </TouchableOpacity>

    }
}

const styles =StyleSheet.create({
    container:{
        flex:1
    },

    title:{
        fontSize:15,
        marginBottom:2,
        color:'#212121',

    },

    bottomTextStyle:{
       fontSize:11,
    },

    description:{
        fontSize:12,
        marginBottom:2,
        color:'#757575'
    },

    cell_container:{

        backgroundColor:'white',
        padding:10,
        marginTop:4,
        marginLeft:6,
        marginRight:6,
        marginVertical:2,
        borderWidth:0.3,
        borderColor:'#dddddd',
        borderRadius:1,
        shadowColor:'#b5b5b5',
        shadowOffset:{width:3,height:2},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    },

    avatarImageStyle:{
        // borderRadius:8,
        width:16,
        height:16

    },

    starImageStyle:{

        width:16,
        height:16

    }

})