import React from 'react';
import { View, StyleSheet } from 'react-native';

const Hexagon = ({ size = 100, color = 'red', children }) => {
    const styles = StyleSheet.create({
        hexagon: {
        width: size,
        height: (size * 55) / 100, // Hexagon height is approximately 55% of the width
        transform: [{ rotate: '90deg' }],
        alignItems: 'center',
        justifyContent: 'center',
        },
        hexagonInner: {
        width: '100%',
        height: '100%',
        backgroundColor: color,
        },
        hexagonAfter: {
        position: 'absolute',
        bottom: -(size * 25) / 100, // Position adjusted based on size
        left: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: (size * 50) / 100, // Adjusted based on size
        borderLeftColor: 'transparent',
        borderRightWidth: (size * 50) / 100, // Adjusted based on size
        borderRightColor: 'transparent',
        borderTopWidth: (size * 25.5) / 100, // Adjusted based on size
        borderTopColor: color,
        },
        hexagonBefore: {
        position: 'absolute',
        top: -(size * 25) / 100, // Position adjusted based on size
        left: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: (size * 50) / 100, // Adjusted based on size
        borderLeftColor: 'transparent',
        borderRightWidth: (size * 50) / 100, // Adjusted based on size
        borderRightColor: 'transparent',
        borderBottomWidth: (size * 25) / 100, // Adjusted based on size
        borderBottomColor: color,
        },
        textContainer: {
            transform: [{ rotate: '-90deg' }],
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }
    });

    return (
        <View style={styles.hexagon}>
            <View style={styles.hexagonInner} />
            <View style={styles.hexagonBefore} />
            <View style={styles.hexagonAfter} />
            <View style={styles.textContainer}>
                {children}
            </View>
        </View>
    );
};

export default Hexagon;









