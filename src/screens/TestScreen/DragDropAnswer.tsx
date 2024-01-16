import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';


const DragDropAnswer: React.FC = () => {
  // Hardcoded values
  const questionTextParts = ["The largest planet in our solar system is ", "", ", and the smallest is ", ""];
  const answerOptions = ["Jupiter", "Mercury", "Mars", "Venus"];

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
          {/* Render the question parts */}
          {questionTextParts.map((part, index) => (
              <Text key={index} style={styles.textPart}>{part}</Text>
          ))}

          {/* Render the draggable options */}
          <View style={styles.optionsContainer}>
              {answerOptions.map((option, index) => (
                  <Animated.View
                      {...panResponder.panHandlers}
                      key={index}
                      style={[pan.getLayout(), styles.option]}>
                      <Text>{option}</Text>
                  </Animated.View>
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
});

export default DragDropAnswer;
