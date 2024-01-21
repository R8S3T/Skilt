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
                    source={require('../../../../assets/Images/backspace.png')} style={styles.backspaceIcon}
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
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
    },
    backspaceIcon: {
        width: 30,
        height: 30,
        margin: 10,
        marginRight: 50,
        tintColor: '#e8630a',
    },
    submitButton: {
        backgroundColor: '#2b4353',
        borderWidth: 1,
        borderColor: '#e8630a',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ControlButtons;
