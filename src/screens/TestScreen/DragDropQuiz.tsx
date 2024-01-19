import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, PanResponderInstance } from 'react-native';

interface DraggableItemProps {
    label: string;
    onDrop: (label: string, droppedPosition: { x: number; y: number }) => void;
    dropZones: DropZone[];
  }

interface DropZone {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ label, onDrop, dropZones }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        const droppedPosition = {
          x: gestureState.moveX,
          y: gestureState.moveY,
        };
        console.log('Dropped Position:', droppedPosition);
        
        // Check if the item is dropped on any drop zone
        const isDroppedOnDropZone = dropZones.some(dropZone => 
          droppedPosition.x >= dropZone.x && droppedPosition.x <= dropZone.x + dropZone.width &&
          droppedPosition.y >= dropZone.y && droppedPosition.y <= dropZone.y + dropZone.height
        );

        if (isDroppedOnDropZone) {
          onDrop(label, droppedPosition);
        } else {
          // Reset position if not dropped on a drop zone
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View style={[pan.getLayout(), styles.draggableItem]} {...panResponder.panHandlers}>
      <Text>{label}</Text>
    </Animated.View>
  );
};


const DragDropQuiz: React.FC = () => {
    const [answers, setAnswers] = useState({ firstBlank: '', secondBlank: '' });
    const [dropZones, setDropZones] = useState<DropZone[]>([
      { x: 100, y: 200, width: 150, height: 50 }, // Example drop zone for the first blank
      { x: 300, y: 200, width: 150, height: 50 }, // Example drop zone for the second blank
    ]);
  
    const words = ['Jupiter', 'Mercury', 'Mars', 'Venus'];
  
    const handleDrop = (word: string, droppedPosition: { x: number; y: number }) => {
      let droppedOnFirstBlank = false;
      let droppedOnSecondBlank = false;
    
      // Check if dropped on the first drop zone
      if (droppedPosition.x >= dropZones[0].x && 
          droppedPosition.x <= dropZones[0].x + dropZones[0].width &&
          droppedPosition.y >= dropZones[0].y && 
          droppedPosition.y <= dropZones[0].y + dropZones[0].height) {
        droppedOnFirstBlank = true;
      }
    
      // Check if dropped on the second drop zone
      if (droppedPosition.x >= dropZones[1].x && 
          droppedPosition.x <= dropZones[1].x + dropZones[1].width &&
          droppedPosition.y >= dropZones[1].y && 
          droppedPosition.y <= dropZones[1].y + dropZones[1].height) {
        droppedOnSecondBlank = true;
      }
    
      // Update the answers based on which drop zone the word was dropped on
      if (droppedOnFirstBlank) {
        setAnswers(prev => ({ ...prev, firstBlank: word }));
      } else if (droppedOnSecondBlank) {
        setAnswers(prev => ({ ...prev, secondBlank: word }));
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>
          The largest planet in our solar system is {answers.firstBlank || '_____'} 
          and the smallest is {answers.secondBlank || '_____'}.
        </Text>
        <View style={styles.wordBank}>
          {words.map((word) => (
            <DraggableItem key={word} label={word} onDrop={handleDrop} dropZones={dropZones} />
          ))}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  wordBank: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  draggableItem: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginBottom: 10,
    borderRadius: 4,
  },
  // Additional styles as needed
});

export default DragDropQuiz;



