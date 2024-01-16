import React, { useState } from 'react';
import { Text, Animated, PanResponder, StyleSheet } from 'react-native';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

interface DraggableOptionProps {
    optionText: string;
}

const DraggableOption: React.FC<DraggableOptionProps> = ({ optionText }) => {
    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
            dx: pan.x,
            dy: pan.y,
        }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            // Logic to snap back to original position or place in drop zone
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false
            }).start();
        }
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.option]}>
            <Text>{optionText}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    option: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
});

export default DraggableOption;