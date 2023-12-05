import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import RenderButton from './RenderButton';


interface MiddleSectionProps {
    onButtonPress: (title: string) => void;
}
const MiddleSection: React.FC<MiddleSectionProps> = ({ onButtonPress }) => {
    return (
        <View style={styles.buttonContainer}>
            <RenderButton
                title='Übungen'
                onPress={() => onButtonPress('Übungen')}
                buttonStyle={styles.imageButton}
                textStyle={styles.middleButtonText}
                imageSource={require('../../../assets/Images/book.png')}
            />
            <RenderButton
                title='Werkzeugkunde'
                onPress={() => onButtonPress('Werkzeugkunde')}
                buttonStyle={styles.imageButton}
                textStyle={styles.middleButtonText}
                imageSource={require('../../../assets/Images/wrench.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageButton: {
        alignItems: 'center',
        backgroundColor: '#9cd3d395',
        width: 160,
        height: 140,
        justifyContent: 'center',
        margin: 10,
        borderRadius: 5,
    },
    middleButtonText: {
        color: '#2b4353',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    } as TextStyle,
})
export default MiddleSection;
