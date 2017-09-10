'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class Scores extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text style={styles.highScoresTitle}>
                2048 High Scores!
            </Text>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    highScoresTitle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    scores: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

// 整体js模块的名称
AppRegistry.registerComponent('add_rn_into_ios_demo', () => Scores);

