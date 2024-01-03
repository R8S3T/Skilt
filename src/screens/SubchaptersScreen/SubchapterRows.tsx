import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubchapterNode from "./SubchapterNode";
import { Subchapter } from './SubchaptersScreen';

interface SubchapterRowsProps {
  subchapters: Subchapter[];
}

const SubchapterRows: React.FC<SubchapterRowsProps> = ({ subchapters }) => {
  return (
    <View style={styles.container}>
      {subchapters.map((subchapter, index) => (
        <View
          key={subchapter.id}
          style={[styles.row, index % 2 === 0 ? styles.leftAlign : styles.rightAlign]}
        >
          <SubchapterNode
            isLocked={subchapter.isLocked}
            onPress={() => console.log('Subchapter pressed', subchapter.id)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    width: '100%',
    marginBottom: 5,
  },
  leftAlign: {
    alignItems: 'flex-start',
    marginLeft: 150,
  },
  rightAlign: {
    alignItems: 'flex-end',
    marginRight: 150,
  },
});

export default SubchapterRows;



