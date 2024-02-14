import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubchapterNode from "./SubchapterNode";
import { Subchapter } from './SubchaptersScreen';
import { useSubchapter } from './SubchapterContext';

interface SubchapterRowsProps {
  subchapters: Subchapter[];
  navigation: any;
  chapterTitle: string;
}

const SubchapterRows: React.FC<SubchapterRowsProps> = ({ subchapters, navigation, chapterTitle }) => {
  const { unlockedSubchapters } = useSubchapter();
  const { finishedSubchapters } = useSubchapter();

  // Function to create pairs of subchapters
  const createRows = (subchapters: Subchapter[]) => {
    let rows = [];
    for (let i = 0; i < subchapters.length; i += 2) {
      rows.push(subchapters.slice(i, i + 2));
    }
    return rows;
  };

  const rows = createRows(subchapters);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((subchapter) => (
            <SubchapterNode
              key={subchapter.id}
              isLocked={subchapter.isLocked}
              isFinished={finishedSubchapters.includes(subchapter.id)}
              onPress={() => {
                if (!subchapter.isLocked) {
                    navigation.navigate('SubchapterContent', {
                      chapterId: subchapter.id,
                      chapterTitle: chapterTitle,
                      hideTabs: true,
                    })
                }
            }}
            />
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
  },

});

export default SubchapterRows;



