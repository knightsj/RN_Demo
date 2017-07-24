
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
            style={styles.container}
        >
            <View style={styles.cell_container}>

                <Text style={styles.title}>{this.props.data.full_name}</Text>

                <Text style={styles.description}>{this.props.data.description}</Text>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{width:18,height:18}}
                            source={{uri:this.props.data.owner.avatar_url}}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>Starts:</Text>
                        <Text>{this.props.data.stargazers_count}</Text>
                    </View>

                    <Image style={{width:18,height:18}} source={require('../../res/images/ic_star.png')}/>
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
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },

    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    },

    cell_container:{
        margin:10,
        backgroundColor:'white',
        padding:10,
        marginLeft:4,
        marginRight:4,
        marginVertical:2,
        borderWidth:1,
        borderColor:'#dddddd',
        borderRadius:1,
        shadowColor:'#b5b5b5',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    },

})