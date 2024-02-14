// SubchaptersScreen.tsx
import React from "react";
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { subchapters } from "./subchaptersTitle";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useSubchapter } from "./SubchapterContext";

import SubchapterRows from "./SubchapterRows";

export interface Subchapter {
  id: number;
  title: string;
  isLocked: boolean;
}

type SubchaptersScreenRouteProp = RouteProp<{ SubchaptersScreen: { chapterId: number, chapterTitle: string } }, 'SubchaptersScreen'>;

const SubchaptersScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ SubchaptersScreen: { chapterId: number, chapterTitle: string } }, 'SubchaptersScreen'>>();
  const { chapterTitle } = route.params;
  const { unlockedSubchapters } = useSubchapter();

  const renderedSubchapters = subchapters.map(subchapter => ({
    ...subchapter,
    isLocked: !unlockedSubchapters.includes(subchapter.id),
  }));

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.heading}>{chapterTitle}</Text>
      <View style={styles.separator} />
      <SubchapterRows
        subchapters={renderedSubchapters}
        navigation={navigation}
        chapterTitle={chapterTitle}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heading: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginTop: 25,
    color: '#2b4353',
    padding: 20,
    backgroundColor: 'transparent',
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#2b4353',
    marginVertical: 5,
  },
});

export default SubchaptersScreen;

