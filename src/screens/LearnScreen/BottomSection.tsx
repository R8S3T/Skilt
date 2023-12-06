import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';


interface BottomSectionProps {
    onPress: () => void;
    imageSource: ImageSourcePropType;
}

const BottomSection: React.FC<BottomSectionProps> = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress} style={StyleSheet.buttonContainer}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={StyleSheet.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Prüfungsaufgaben</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    imageContainer: {
        backgroundColor: '#f6f5f5',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: '#9cd3d380',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    buttonText: {
        fontSize: 15,
        color: '#2b4353',
    },
});

export default BottomSection;