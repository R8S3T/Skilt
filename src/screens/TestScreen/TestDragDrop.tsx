import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
/* import DragDropAnswer from './DragDropAnswer'; */
/* import DraxComponent from './Drax'; */
import DragDrop2 from './DragDrop2';

const DragDropTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DragDropAnswer Test</Text>
      <DragDrop2 />
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
  }
});

export default DragDropTest;

