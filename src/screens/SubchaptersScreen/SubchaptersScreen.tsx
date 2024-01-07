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
  console.log("route.params in SubchaptersCreen:", route.params);
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.heading}>{chapterTitle}</Text>
      <View style={styles.separator} />
      <SubchapterRows subchapters={subchapters} navigation={navigation} />
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

