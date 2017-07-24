
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


export default class NewPage extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {

    }

    render(){
        return <View style={styles.container}>
            <Text>New Page</Text>
        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});