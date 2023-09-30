import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const Hexagon = ({ size = 100, color = 'red', children }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: size, height: size * 1.15 }}>
            <Svg width={size} height={size * 1.15} viewBox="0 0 100 115">
                <Polygon
                    points="50,0 100,28.87 100,86.60 50,115 0,86.60 0,28.87"
                    fill={color}
                    stroke={color}
                    strokeWidth='1.5'
                    strokeLinejoin='round'
                />
            </Svg>
            <View style={styles.textContainer}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
});

export default Hexagon;










