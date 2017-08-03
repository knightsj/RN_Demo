
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RespositoryCell extends Component{

    constructor(props){
        super(props);
        this.state={
            isFavorite:this.props.projectModel.isFavorite,
            favoriteIcon:this.props.projectModel.isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.isFavorite);
    }

    render(){
        let item = this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        let favoriteButton = <TouchableOpacity
            onPress={()=>this.onPressFavorite()}
        >
            <Image
                style={[{width:18,height:18} ,{tintColor:'#2196F3'}]}
                source={this.state.favoriteIcon}
            />
        </TouchableOpacity>

        return<TouchableOpacity
            onPress={this.props.onSelect}
            style={styles.container}
        >
            <View style={styles.cell_container}>

                <Text style={styles.title}>{item.full_name}</Text>

                <Text style={styles.description}>{item.description}</Text>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.bottomTextStyle}>Author:</Text>
                        <Image
                            style={styles.avatarImageStyle}
                            source={{uri:item.owner.avatar_url}}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.bottomTextStyle}>Starts:</Text>
                        <Text style={styles.bottomTextStyle}>{item.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>
        </TouchableOpacity>

    }

    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite);
        //回传给页面，记录状态
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }


    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        })
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