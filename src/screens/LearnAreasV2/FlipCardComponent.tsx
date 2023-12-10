import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';

export default class FlipCardComponent extends Component {
    // method to render front side of the flip card
    private _renderFront = (): JSX.Element => {
        return (
            <View style={styles.cardFront}>
                <Text>Hello front page</Text>
            </View>
        );
    };

    // method to render back of the card
    private _renderBack = (): JSX.Element => {
        return (
            <View style={styles.cardBack}>
                <Text>Hello back page</Text>
            </View>
        );
    };

    render() {
        return (
            <FlipCard
                style={styles.cardStyle}
                velocity={2} //This makes it move
                tension={5} // This defines speed of movement
                friction={1} // Oscillate a lot
                renderFront={this._renderFront}
                renderBack={this._renderBack}
            />
        );
    };
};


const styles = StyleSheet.create({
    cardFront: {
        backgroundColor: 'red',
        flex: 1,
        height: 100,
    },
    cardBack: {
        backgroundColor: 'blue',
        flex: 1,
        height: 100,
    },
    cardStyle: {
        flex: 1,
    },
})
