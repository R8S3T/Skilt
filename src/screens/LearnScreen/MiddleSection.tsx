import React from 'react';
import { View, StyleSheet } from 'react-native';
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
                imageSource={require('../../../assets/Images/book.png')}
            />
            <RenderButton
                title='Werkzeugkunde'
                onPress={() => onButtonPress('Werkzeugkunde')}
                buttonStyle={styles.imageButton}
                imageSource={require('../../../assets/Images/wrench.png')}
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
        width: 160,
        height: 70,
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
    },
    buttonImage: {
        width: 20,
        height: 20,
    },
})
export default MiddleSection;
