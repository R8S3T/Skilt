import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';
import LearnAreaComponent from './LearnAreaComponent';
import { LearnArea } from './EducationDataComponent';

interface FlipCardComponentProps {
    year: number;
    learnAreas: LearnArea[];
    isActive: boolean;
    backgroundColor: string;
}

export default class FlipCardComponent extends Component<FlipCardComponentProps> {
    // method to render front side of the flip card
    private _renderFront = (): JSX.Element => {
        const { year } = this.props;
        return (
            <View style={styles.cardFront}>
                <Text>{`Lehrjahr ${year}`}</Text>
            </View>
        );
    };

    // method to render back of the card
    private _renderBack = (): JSX.Element => {
        const { learnAreas } = this.props;
        return (
            <View style={styles.cardBack}>
                {learnAreas.map((learnArea: LearnArea) => (
                    <LearnAreaComponent
                        key={learnArea.id}
                        id={learnArea.id}
                        title={learnArea.title}
                        onPress={() => console.log('Learnarea ${learnArea.id} pressed')}
                    />
                ))}
            </View>
        );
    };

    render() {
        const { year, learnAreas, isActive } = this.props;
        const { backgroundColor } = this.props;
        return (
            <FlipCard
                style={[styles.cardStyle, { backgroundColor }]}
                flip={isActive}
                flipHorizontal={true}
                flipVertical={false}
            >
                <View style={styles.cardFront}>
                    {this._renderFront()}
                </View>
                <View style={styles.cardBack}>
                    {this._renderBack()}
                </View>
            </FlipCard>
        );
    };
};


const styles = StyleSheet.create({
    cardFront: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardBack: {
        backgroundColor: '#e8630a',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardStyle: {
        flex: 1,
    },
})
