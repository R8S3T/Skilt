import React, { useState } from 'react';
import { Text, Animated, PanResponder, StyleSheet } from 'react-native';

interface DraggableOptionProps {
    optionText: string;
    dropZoneLayouts: { x: number; y: number; width: number; height: number }[];
}

const DraggableOption: React.FC<DraggableOptionProps> = ({ optionText, dropZoneLayouts }) => {
    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (evt, gestureState) => {
            // Calculate final position based on movement delta
            const finalX = gestureState.dx;
            const finalY = gestureState.dy;

            const droppedOverZone = dropZoneLayouts.some(layout => {
                return finalX >= layout.x && finalX <= layout.x + layout.width &&
                       finalY >= layout.y && finalY <= layout.y + layout.height;
            });

            if (!droppedOverZone) {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            }

            // Reset pan for next drag
            pan.setValue({ x: 0, y: 0 });
        },
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
