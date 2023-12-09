import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CIRCLE_DIAMETER = width * 0.5;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;

const CircleOverlay: React.FC = () => {
    return (
        <View style={styles.circleContainer}>
            {/* Empty View representing the circle */}
        </View>
    );
};


const styles = StyleSheet.create({
    circleContainer: {
        width: CIRCLE_DIAMETER,
        height: CIRCLE_DIAMETER,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: 'white', // Or your background color
        position: 'absolute',
        right: -CIRCLE_RADIUS / 1, // Adjust as needed
        top: '50%', // Adjust based on the layout
        marginTop: -CIRCLE_RADIUS / 2, // Center vertically
    },
    circleSegment: {
        width: CIRCLE_DIAMETER,
        height: CIRCLE_DIAMETER,
        position: 'absolute',
        borderRadius: CIRCLE_RADIUS,
        borderTopStartRadius: 0,
        borderBottomStartRadius: 0,
    },
});

export default CircleOverlay;
