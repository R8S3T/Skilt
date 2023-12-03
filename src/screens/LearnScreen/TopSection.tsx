import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import RenderButton from "./RenderButton";

const TopSection = ({ onButtonPress }) => {
    return (
        <View style={styles.newContainer}>
            <Text style={styles.heading}>Überschrift</Text>
            <Text style={styles.description}>Mehr Text der erklärt, worum es in den Lernfeldern geht</Text>
            <View style={styles.buttonContainer}>
                {['Lehrjahr 1', 'Lehrjahr 2', 'Lehrjahr 3'].map((title, index) => (
                    <RenderButton
                        key={index}
                        title={title}
                        onPress={() => onButtonPress(title)}
                        buttonStyle={styles.squareButton}
                    />
                ))}
            </View>
            <RenderButton
                title='Alle Lernfelder'
                onPress={() => onButtonPress('Alle Lernfelder')}
                buttonStyle={styles.ovalButton}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    newContainer: {
        backgroundColor: '#2b4353',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    description: {
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    squareButton: {
        backgroundColor: '#9cd3d3',
        width: 90,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    ovalButton: {
        width: 300,
        backgroundColor: '#e8630a',
        margin: 10,
    },
})
export default TopSection;