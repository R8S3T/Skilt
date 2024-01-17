import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, LayoutChangeEvent } from 'react-native';
import DraggableOption from './DraggableOption';

const DragDropAnswer: React.FC = () => {
  // Hardcoded values
    const questionTextParts = ["The largest planet in our solar system is ", "", ", and the smallest is ", ""];
    const answerOptions = ["Jupiter", "Mercury", "Mars", "Venus"];
    const [dropZoneLayouts, setDropZoneLayouts] = useState<Array<{ x: number; y: number; width: number; height: number }>>([]);

    const onDropZoneLayout = (event: LayoutChangeEvent, index: number) => {
        const layout = event.nativeEvent.layout;
        const newLayouts = [...dropZoneLayouts];
        newLayouts[index] = layout;
        setDropZoneLayouts(newLayouts);
    };

    const [zoneLayout, setZoneLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
            dx: pan.x, // drag x
            dy: pan.y, // drag y
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
        <View style={styles.container}>
            {questionTextParts.map((part, index) => (
                <View key={index} style={styles.textPartContainer}>
                    <Text style={styles.textPart}>{part}</Text>
                    {index < questionTextParts.length - 1 && (
                        <View
                            onLayout={(event) => onDropZoneLayout(event, index)}
                            style={styles.dropZone}
                        />
                    )}
                </View>
            ))}

            {/* Render the draggable options */}
            <View style={styles.optionsContainer}>
                {answerOptions.map((option, index) => (
                    <DraggableOption 
                        key={index} 
                        optionText={option} 
                        dropZoneLayouts={dropZoneLayouts}
                    />
                ))}
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPart: {
        fontSize: 16,
        color: 'black',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    option: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    textPartContainer: {
        // Define your styles here
    },
    dropZone: {
        // Define your styles here
    },
});

export default DragDropAnswer;
