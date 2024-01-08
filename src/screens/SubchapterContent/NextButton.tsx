import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NextButtonProps {
    onPress: () => void;
    isActive: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, isActive }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, isActive ? styles.active : styles.inactive]}
            disabled={!isActive}
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
        borderRadius: 5,
    },
    active: {
        backgroundColor: '#ff8f00',  // Active color
    },
    inactive: {
        backgroundColor: 'gray',  // Inactive color
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default NextButton;