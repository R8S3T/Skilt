import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { scaleFontSize, screenWidth } from "../../utilities/utils";

interface BottomSectionProps {
    onPress: () => void;
    imageSource: ImageSourcePropType;
}

const BottomSection: React.FC<BottomSectionProps> = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Prüfungsaufgaben</Text>
                <Text style={styles.description}>
                    Bereite dich optimal auf{'\n'}Deine Abschlussprüfung vor
                </Text>
            </View>
            <Image
                source={require('../../../assets/Images/modify-icon.png')}
                style={[styles.image, { tintColor: 'white' }]} 
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: screenWidth * 0.90,
        height: screenWidth * 0.35,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b4353',
        borderRadius: 5,
        margin: 5,
        overflow: 'hidden',
    },
    textContainer: {
        padding: 10,
        justifyContent: 'center',
    },
    heading: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        fontSize: scaleFontSize(16),
        marginBottom: 8,
    },
    description: {
        color: '#fff',
        fontFamily: 'Montserrat-Alternates-Medium',
        fontSize: scaleFontSize(12),
    },
    image: {
        width: screenWidth * 0.1, // Example: 10% of the screen width
        height: screenWidth * 0.1, // Keep the aspect ratio consistent
        marginRight: screenWidth * 0.06, // Example: 2% of the screen width
    },
});

export default BottomSection;