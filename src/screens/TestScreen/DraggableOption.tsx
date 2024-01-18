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
            // Calculate the final position of the draggable item
            const finalX = gestureState.moveX - gestureState.x0 + gestureState.dx;
            const finalY = gestureState.moveY - gestureState.y0 + gestureState.dy;

            // Determine if the item was dropped over any of the drop zones
            const droppedOverZone = dropZoneLayouts.some(layout => {
                return finalX >= layout.x && finalX <= layout.x + layout.width &&
                       finalY >= layout.y && finalY <= layout.y + layout.height;
            });

            if (!droppedOverZone) {
                // Snap back to original position if not dropped over a zone
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            } else {
                // Handle successful drop (e.g., update state, call callback)
                // You might want to implement additional logic here
            }

            // Reset pan for the next drag
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
