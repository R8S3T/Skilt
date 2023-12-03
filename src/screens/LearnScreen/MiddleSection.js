import React from 'react';
import { View, StyleSheet } from 'react-native';
import RenderButton from './RenderButton';

const MiddleSection = ({ onButtonPress }) => {
    return (
        <View style={styles.buttonContainer}>
            <RenderButton
                title='Übungen'
                onPress={() => onButtonPress('Übungen')}
                buttonStyle={styles.imageButton}
                imageSource={require('../../../assets/Images/book.png')} // Update the path as needed
            />
            <RenderButton
                title='Werkzeugkunde'
                onPress={() => onButtonPress('Werkzeugkunde')}
                buttonStyle={styles.imageButton}
                imageSource={require('../../../assets/Images/wrench.png')} // Update the path as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9cd3d3',
        width: 120,
        height: 70,
        justifyContent: 'center',
        margin: 5,
    },
    buttonImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
})
export default MiddleSection;
