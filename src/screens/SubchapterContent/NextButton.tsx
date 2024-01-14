import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface NextButtonProps {
    onPress: () => void;
    isActive: boolean;
    style?: StyleProp<ViewStyle>;
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
        minWidth: 100,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center', // Align button to the center horizontally
        marginVertical: 20,  // Add some margin at the top and bottom
    },
    active: {
        backgroundColor: '#ff8f00',  // Active color
    },
    inactive: {
        backgroundColor: 'gray',  // Inactive color
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default NextButton;