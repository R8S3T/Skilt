import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
/* import DragDropAnswer from './DragDropAnswer'; */
/* import DraxComponent from './Drax'; */
/* import DragDrop2 from './DragDrop2'; */
/* import DragDropQuiz from './DragDropQuiz'; */
import ClozeTest from '../Quizzes/ClozeTest/ClozeTest';

const DragDropTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DragDropAnswer Test</Text>
      <Image source={require('../../../assets/Images/Strichlinie.png')} style={styles.image} />
      <Image source={require('../../../assets/Images/Volllinie.png')} style={styles.image} />
      <Image source={require('../../../assets/Images/Strichpunktlinie.png')} style={styles.image} />
      <Image source={require('../../../assets/Images/Strichpunktpunktlinie.png')} style={styles.image} />
      <Image source={require('../../../assets/Images/DINA1_4.png')} style={styles.image} />
      <ClozeTest
        sentenceParts={["The largest planet is ", " and the smallest is ", "."]}
        options={["Jupiter", "Mercury", "Mars", "Venus"]}
        correctAnswers={["Jupiter", "Mercury"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: { // Step 3: Define the style for your image (optional)
    width: 380, // Set the width of your image
    height: 80, // Set the height of your image
    marginBottom: 20, // Add some margin if needed
  }
});

export default DragDropTest;

