import React from "react";
import { View, Text, StyleSheet } from 'react-native';

interface YearCircleProps {
    year: number;
    backgroundColor: string;
}

const YearCircle: React.FC<YearCircleProps> = ({ year, backgroundColor }) => {
    return (
        <View style={[styles.outerCircle, { backgroundColor }]}>
            <View style={styles.innerCircle}>
                <Text style={styles.yearText}>{year}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    outerCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 80, // Slightly smaller to create the white border effect
        height: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        borderColor: '#ffffff', // White border
        borderWidth: 2, // Adjust the border width as necessary
        justifyContent: 'center',
        alignItems: 'center',
    },
    yearText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default YearCircle;