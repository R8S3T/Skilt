import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { scaleFontSize, dynamicCardHeight, getDynamicIconSize } from "../../../utilities/utils";

interface ControlButtonsProps {
  onClear: () => void;
  onSubmit: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onClear, onSubmit }) => {
    const iconSize = getDynamicIconSize(30, 30);
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClear}>
                <Image 
                    source={require('../../../../assets/Images/backspace.png')} style={{ width: iconSize, height: iconSize, tintColor: '#e8630a' }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                <Text style={styles.submitButtonText}>Bestätigen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
    },
    backspaceIcon: {
        width: 50,
        height: 50,
        margin: 10,
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ControlButtons;
