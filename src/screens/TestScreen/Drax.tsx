import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxProvider, DraxView, DraxDragEndEventData } from 'react-native-drax';

const DraxComponent: React.FC = () => {
    const answerOptions = ["Jupiter", "Mercury", "Mars", "Venus"];
    const [dragPositions, setDragPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

    return (
        <DraxProvider>
            <View style={styles.container}>
                {/* Drop Zone */}
                <DraxView
                    style={styles.dropZone}
                    receivingStyle={styles.receiving}
                    renderContent={() => <Text style={styles.text}>Drop here</Text>}
                    onReceiveDragDrop={({ dragged: { payload } }) => {
                        console.log(`Dropped: ${payload}`);
                        // Additional logic for handling drop
                    }}
                />
                
                {/* Draggable Items */}
                <View style={styles.draggablesContainer}>
                    {answerOptions.map((option, index) => (
                        <DraxView
                            key={index}
                            style={[styles.draggable, { transform: [{ translateX: dragPositions[option]?.x || 0 }, { translateY: dragPositions[option]?.y || 0 }] }]}
                            draggable
                            payload={option}
                            renderContent={() => <Text style={styles.text}>{option}</Text>}
                            onDragStart={() => {
                                setDragPositions(prev => ({ ...prev, [option]: { x: 0, y: 0 } }));
                            }}
                            onDragEnd={({ dragged, over }: DraxDragEndEventData & { over?: any }) => {
                                if (!over) {
                                    console.log(`Returned: ${dragged.payload}`);
                                    // Logic for snapping back
                                    setDragPositions(prev => ({ ...prev, [option]: { x: 0, y: 0 } }));
                                }
                            }}
                        />
                    ))}
                </View>
            </View>
        </DraxProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropZoneContainer: {
        height: 100, // Set the height as needed
    },
    dropZone: {
        backgroundColor: 'gray',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    receiving: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    draggablesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    draggable: {
        backgroundColor: 'lightblue',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default DraxComponent;

