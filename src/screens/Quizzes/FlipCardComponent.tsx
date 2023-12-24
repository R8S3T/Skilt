import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import FlipCard from 'react-native-flip-card';
import LearnAreaComponent from './LearnAreaComponent';
import { LearnArea } from '../LearnAreasV2/EducationDataComponent';

interface FlipCardComponentProps {
    year: number;
    learnAreas: LearnArea[];
    isActive: boolean;
    backgroundColor?: string;
    backgroundImg: any;
}

export default class FlipCardComponent extends Component<FlipCardComponentProps> {

    private _renderFront = (): JSX.Element => {
        const { year, backgroundImg } = this.props;
        return (
            <ImageBackground
                source={backgroundImg}
                style={styles.cardFrontBackground} // Separate style for image
                resizeMode="cover" // or "contain"
            >
                <Text style={styles.textStyle}>{`Lehrjahr ${year}`}</Text>
            </ImageBackground>
        );
    };

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
    cardFrontBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
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
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#dbd8e3',
        textAlign: 'center',
    },
})
