import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';

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
{/*             <FontAwesomeIcon icon={ faMugSaucer } /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: 349,
        height: 110,
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
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    description: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});

export default BottomSection;