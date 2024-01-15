import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface DragDropLogicProps {
    itemText: string;
    dropZoneValues: DropZoneValues;
    onDrop: (isDropped: boolean) => void;
}

export interface DropZoneValues {
    x: number;
    y: number;
    width: number;
    height: number;
}

const DragDropLogic: React.FC<DragDropLogicProps> = ({ itemText, dropZoneValues, onDrop }) => {
    const dragItemPosition = new Animated.ValueXY();

    const isDropZone = (gesture: any) => {
        const dz = dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    };

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            if (isDropZone(event.nativeEvent)) {
                onDrop(true);
            } else {
                Animated.spring(dragItemPosition, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start(() => onDrop(false));
            }
        }
    };

    const onDragEvent = Animated.event([
        {
            nativeEvent: {
                translationX: dragItemPosition.x,
                translationY: dragItemPosition.y
            }
        }
    ], { useNativeDriver: false });

    return (
        <PanGestureHandler
            onGestureEvent={onDragEvent}
            onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View
                style={[
                    styles.draggable,
                    {
                        transform: [
                            { translateX: dragItemPosition.x },
                            { translateY: dragItemPosition.y }
                        ]
                    }
                ]}
            >
                <Text style={styles.text}>{itemText}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    draggable: {
        // styles for your draggable item
    },
    text: {
        // styles for the text inside your draggable item
    },
});

export default DragDropLogic;