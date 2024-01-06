import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NextButtonProps {
    onPress: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.text}>Weiter</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 10,
        backgroundColor: '#ff8f00',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default NextButton;