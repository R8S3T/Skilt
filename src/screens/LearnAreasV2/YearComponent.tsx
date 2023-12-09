import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface YearComponentProps {
    year: number;
    isActive: boolean;
    onPress: () => void;
    children: ReactNode;
}

const YearComponent: React.FC<YearComponentProps> = ({ year, isActive, onPress, children }) => {
    return (
        <View style={styles.yearContainer}>
            <TouchableOpacity onPress={onPress} style={styles.yearTitleContainer}>
                <Text style={styles.yearTitle}>{`Lehrjahr ${year}`}</Text>
            </TouchableOpacity>
            {isActive && children}
        </View>
    );
};

const styles = StyleSheet.create({
    yearContainer: {
        width: '80%',
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    yearTitleContainer: {
        height: 80,
        padding: 15,
        backgroundColor: '#e7e7e7',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    yearTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default YearComponent;
