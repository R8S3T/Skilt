import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType, TextStyle, ImageStyle } from 'react-native';

interface RenderButtonProps {
    title: string;
    onPress: () => void;
    buttonStyle: StyleProp<ViewStyle>;
    imageSource?: ImageSourcePropType;
}

const RenderButton: React.FC<RenderButtonProps> = ({ title, onPress, buttonStyle, imageSource }) => {
    return (
        <TouchableOpacity style={[styles.buttonImage, buttonStyle]} onPress={onPress}>
            {imageSource && <Image source={imageSource} style={styles.buttonImage} />}
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        borderRadius: 5,
    } as TextStyle,
    buttonImage: {
        width: 30,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain',
    } as ImageStyle,
});

export default RenderButton;