import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';


interface BottomSectionProps {
    onPress: () => void;
    imageSource: ImageSourcePropType;
}

const BottomSection: React.FC<BottomSectionProps> = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
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
        margin: 5,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',

        // Shadow properties for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Elevation for Android
        elevation: 5,
    },
    imageContainer: {
        backgroundColor: '#f6f5f5',
        padding: 10,
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        padding: 10,
        width: 250,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    buttonText: {
        color: '#2b4353',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default BottomSection;