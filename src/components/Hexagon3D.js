import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, LinearGradient, Stop, Defs } from 'react-native-svg';

const Hexagon3D = ({ size = 100, color = 'red', children }) => {
    const depth = 5;

    const darkenColor = (color, percent) => {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };

    const darkerColor = darkenColor(color, -20); // darken by 20%

    return (
        <View style={[styles.container, { width: size, height: size * 1.15 }]}>
            <Svg width={size} height={size * 1.15} viewBox="0 0 100 115" style={styles.shadowHexagon}>
                <Polygon points="50,57.5 100,86.60 50,115 0,86.60" fill={darkerColor} />
            </Svg>
            <Svg width={size} height={size * 1.15} viewBox="0 0 100 115" style={styles.mainHexagon}>
                <Defs>
                    <LinearGradient id="topGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                        <Stop offset="0%" stopColor={color} />
                        <Stop offset="100%" stopColor={darkerColor} />
                    </LinearGradient>
                    <LinearGradient id="leftGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <Stop offset="0%" stopColor={color} />
                        <Stop offset="100%" stopColor={darkerColor} />
                    </LinearGradient>
                    <LinearGradient id="rightGradient" x1="100%" y1="50%" x2="0%" y2="50%">
                        <Stop offset="0%" stopColor={color} />
                        <Stop offset="100%" stopColor={darkerColor} />
                    </LinearGradient>
                    <LinearGradient id="bottomGradient" x1="50%" y1="100%" x2="50%" y2="0%">
                        <Stop offset="0%" stopColor={darkerColor} />
                        <Stop offset="100%" stopColor={color} />
                    </LinearGradient>
                </Defs>
                <Polygon points="50,0 100,28.87 50,57.5 0,28.87" fill="url(#topGradient)" />
                <Polygon points="0,28.87 50,57.5 0,86.6" fill="url(#leftGradient)" />
                <Polygon points="100,28.87 50,57.5 100,86.6" fill="url(#rightGradient)" />
                <Polygon points="50,57.5 100,86.60 50,115 0,86.60" fill="url(#bottomGradient)" />
            </Svg>
            <View style={styles.textContainer}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadowHexagon: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    mainHexagon: {
        position: 'absolute',
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
});

export default Hexagon3D;




