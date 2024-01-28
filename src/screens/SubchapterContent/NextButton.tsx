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
        alignSelf: 'center',
        marginVertical: 20,
    },
    active: {
        backgroundColor: '#ff8f00',
    },
    inactive: {
        backgroundColor: 'gray',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default NextButton;