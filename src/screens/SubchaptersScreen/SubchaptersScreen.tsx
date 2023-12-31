// SubchaptersScreen.tsx
import React from "react";
import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import SubchapterRows from "./SubchapterRows";
import { subchapters } from "./subchaptersTitle";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

export interface Subchapter {
  id: number;
  title: string;
  isLocked: boolean;
}

type SubchaptersScreenRouteProp = RouteProp<{ SubchaptersScreen: { chapterId: number, chapterTitle: string } }, 'SubchaptersScreen'>;

const SubchaptersScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubchaptersScreenRouteProp>();
  const { chapterTitle } = route.params;

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.heading}>{chapterTitle}</Text>
      <SubchapterRows subchapters={subchapters} navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(43, 67, 83, 0.8)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginTop: 25,
    color: '#FFF',
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});

export default SubchaptersScreen;

