import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DragDropAnswer from './DragDropAnswer';

const DragDropTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DragDropAnswer Test</Text>
      <DragDropAnswer />
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

