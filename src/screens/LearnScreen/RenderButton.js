import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const RenderButton = ({ title, onPress, buttonStyle, imageSource }) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            {imageSource && <Image source={imageSource} style={styles.buttonImage} />}
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
})

export default RenderButton;